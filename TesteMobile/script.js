const video = document.getElementById("video-input");
const canvas = document.getElementById("canvas-output");
var characteristic;

async function conectBluetooth() {
    if (!navigator.bluetooth) {
        alert("Bluetooth não suportado neste navegador.");
        return;
    }

    const serviceUuid = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
    const characteristicUuid = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';

    const device = await navigator.bluetooth.requestDevice({
        filters: [{ name: 'ESP32_Robo' }],
            optionalServices: [serviceUuid]
        });

    const server = await device.gatt.connect();
    const service = await server.getPrimaryService(serviceUuid);
    characteristic = await service.getCharacteristic(characteristicUuid);
}

async function initialize() {
    // Iniciar a câmera
    if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Navegador não suporta getUserMedia.");
        return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: 'environment',
            width: { ideal: 1920 },
            height: { ideal: 1080 }
        },
        audio: false,
    });

    const track = stream.getVideoTracks()[0];
    const capabilities = track.getCapabilities();

    if (capabilities.torch) {
        await track.applyConstraints({
            advanced: [{ torch: true }]
        });
    } else {
        console.log("Torch not supported on this device.");
    }

    if (!stream) return;

    video.srcObject = stream;
    await video.play();

    await new Promise(resolve => {
        const checkDimensions = () => {
            if (video.videoWidth > 0 && video.videoHeight > 0) {
                resolve();
            } else {
                requestAnimationFrame(checkDimensions);
            }
        };
        checkDimensions();
    });

    const encoder = new TextEncoder();

    // Inicializar OpenCV
    const FPS = 60;
    const cap = new cv.VideoCapture(video);
    const src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    const gray = new cv.Mat();
    const thresh = new cv.Mat();
    const kernel = cv.Mat.ones(3, 3, cv.CV_8U);
    const contours = new cv.MatVector();
    const contours_Verde = new cv.MatVector();
    const hierarchy = new cv.Mat();
    const rgb = new cv.Mat();
    const imgHSV = new cv.Mat();
    const hierarchy_Verde = new cv.Mat();
    const masked_image = new cv.Mat();
    const centerX = src.cols / 2;
    const centerY = src.rows / 2;

    console.log("Largura: " + src.cols);
    console.log("Altura: " + src.rows);
    console.log("Centro X: " + centerX);
    console.log("Centro Y: " + centerY);

    let height = 300;
    let y = src.rows - (height * 2);
    let x = 0;
    let width = src.cols;

    var ultimoCentro = centerX;
    var ultimoErro = 0;

    async function processVideo() {
        let begin = Date.now();
        try {
            cap.read(src);

            let rect = new cv.Rect(x, y, width, height);
            let rectVerde = new cv.Rect(x, y / 2, width, height * 2);
            let cropped = src.roi(rect);
            let croppedVerde = src.roi(rectVerde);


            cv.cvtColor(cropped, gray, cv.COLOR_RGBA2GRAY);
            const lowerGray = new cv.Mat(gray.rows, gray.cols, gray.type(), new cv.Scalar(0, 0, 0, 0));
            const upperGray = new cv.Mat(gray.rows, gray.cols, gray.type(),new cv.Scalar(80, 80, 80, 80));
            cv.inRange(gray, lowerGray, upperGray, thresh);
            lowerGray.delete();
            upperGray.delete();
    
            cv.erode(thresh, thresh, kernel, new cv.Point(-1, -1), 3);
            cv.dilate(thresh, thresh, kernel, new cv.Point(-1, -1), 5);

            cv.findContours(thresh,contours,hierarchy,cv.RETR_CCOMP,cv.CHAIN_APPROX_SIMPLE);

            //Verde
            cv.cvtColor(croppedVerde, imgHSV, cv.COLOR_RGB2HSV);

            const lower = new cv.Mat(imgHSV.rows, imgHSV.cols, imgHSV.type(), new cv.Scalar(40, 95, 50));
            const upper = new cv.Mat(imgHSV.rows, imgHSV.cols, imgHSV.type(), new cv.Scalar(150, 255, 255));
            cv.inRange(imgHSV, lower, upper, masked_image);
            lower.delete();
            upper.delete();
            cv.erode(masked_image, masked_image, kernel, new cv.Point(-1, -1), 3);
            cv.dilate(masked_image, masked_image, kernel, new cv.Point(-1, -1), 5);
            cv.findContours(masked_image, contours_Verde, hierarchy_Verde, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);

            for (let i = 0; i < contours_Verde.size(); ++i) {
                const contour = contours_Verde.get(i);

                const M = cv.moments(contour);
                const cx = M.m10 / M.m00;
                const cy = M.m01 / M.m00;
                const center = new cv.Point(cx, cy);
                cv.circle(croppedVerde, center, 5, new cv.Scalar(0, 255, 0, 255), -1);

                const rotatedRect = cv.minAreaRect(contour);
                if(Math.abs(rotatedRect.size.width - rotatedRect.size.height) > 60) continue;

                const rect = cv.boundingRect(contour);
                const margin = Math.floor(rect.height);
                const yTop = Math.max(0, cy - margin);
                const yBottom = Math.min(croppedVerde.rows, cy + margin);
                const xLeft = Math.max(0, cx - margin);
                const xRight = Math.min(croppedVerde.cols, cx + margin);

                const verticalRect = new cv.Rect(rect.x, yTop, rect.width, yBottom - yTop);
                const horizontalRect = new cv.Rect(xLeft, rect.y, xRight - xLeft, rect.height);

                const verticalROI = croppedVerde.roi(verticalRect);
                const horizontalROI = croppedVerde.roi(horizontalRect);
                const gray = new cv.Mat();
                const grayHorizontal = new cv.Mat();
                cv.cvtColor(verticalROI, gray, cv.COLOR_RGBA2GRAY);
                cv.cvtColor(horizontalROI, grayHorizontal, cv.COLOR_RGBA2GRAY);

                const halfHeight = Math.floor(gray.rows / 2);
                const topHalf = gray.rowRange(0, halfHeight);
                const bottomHalf = gray.rowRange(halfHeight, gray.rows);
                const halfWidth = Math.floor(grayHorizontal.cols / 2);
                const leftHalf = grayHorizontal.colRange(0, halfWidth);
                const rightHalf = grayHorizontal.colRange(halfWidth, grayHorizontal.cols);

                const topThresh = new cv.Mat();
                const bottomThresh = new cv.Mat();
                const leftThresh = new cv.Mat();
                const rightThresh = new cv.Mat();

                cv.threshold(topHalf, topThresh, 90, 255, cv.THRESH_BINARY_INV);
                cv.threshold(bottomHalf, bottomThresh, 90, 255, cv.THRESH_BINARY_INV);
                cv.threshold(leftHalf, leftThresh, 90, 255, cv.THRESH_BINARY_INV);
                cv.threshold(rightHalf, rightThresh, 90, 255, cv.THRESH_BINARY_INV);


                const topBlack = cv.countNonZero(topThresh);
                const bottomBlack = cv.countNonZero(bottomThresh);
                const leftBlack = cv.countNonZero(leftThresh);
                const rightBlack = cv.countNonZero(rightThresh);

                if (topBlack > bottomBlack)
                    cv.drawContours(croppedVerde, contours_Verde, i, new cv.Scalar(0, 255, 0, 255), 10, cv.LINE_8, hierarchy_Verde, 100);
                else
                    cv.drawContours(croppedVerde, contours_Verde, i, new cv.Scalar(255, 0, 0, 255), 10, cv.LINE_8, hierarchy_Verde, 100);

                if(leftBlack > rightBlack)
                    cv.putText(croppedVerde, "Dir", center, cv.FONT_HERSHEY_SIMPLEX, 2, new cv.Scalar(0, 255, 0, 255), 5);
                else
                    cv.putText(croppedVerde, "Esq", center, cv.FONT_HERSHEY_SIMPLEX, 2, new cv.Scalar(0, 255, 0, 255), 5);


                gray.delete();
                topThresh.delete();
                bottomThresh.delete();
                leftThresh.delete();
                rightThresh.delete();
            }
            
            cv.imshow("canvas-output-verde", croppedVerde);

            var bestContourIndex = 0;
            var smallestCenterDistance = 1000000;
            let bestContour = null;

            for (let i = 0; i < contours.size(); ++i) {
                const contour = contours.get(i);
                const M = cv.moments(contour);
                const cx = M.m10 / M.m00;
                const cy = M.m01 / M.m00;

                const distance = cx - ultimoCentro;
                
                if (Math.abs(distance) < Math.abs(smallestCenterDistance)) {
                    smallestCenterDistance = distance;
                    bestContour = contour;
                    bestContourIndex = i;
                }
            }

            if (bestContour) {
                const color = new cv.Scalar(0, 0, 255, 255);
                cv.drawContours(cropped, contours, bestContourIndex, color, 5, cv.LINE_8, hierarchy, 100);
                const M = cv.moments(bestContour);
                const cx = M.m10 / M.m00;
                const cy = M.m01 / M.m00;
                const center = new cv.Point(cx, cy);
                const radius = 5;
                const colorCenter = new cv.Scalar(0, 0, 255, 255);
                cv.circle(cropped, center, radius, colorCenter, -1);
                ultimoCentro = cx;
            
                const rotatedRect = cv.minAreaRect(bestContour);
                let angle = rotatedRect.angle;
            
                if (angle > 45) angle = 90 - angle;
                if (angle < -45) angle = 90 + angle;

                var errorPorcent = (cx - (src.cols / 2)) / (src.cols / 2) * 100;
                var dX = Math.abs(errorPorcent) - Math.abs(ultimoErro);
                
                if(dX > 0)
                    errorPorcent += dX * 0.5;
                else
                    errorPorcent -= dX * 0.5;

                errorPorcent = errorPorcent * ((0.0045 * rotatedRect.size.width.toFixed(2)) + 0.3);

                document.getElementById("error").innerText = `Error: ${errorPorcent.toFixed(2)}%`;
                document.getElementById("angle").innerText = `Angle: ${angle.toFixed(2)}`;
                document.getElementById("width").innerText = `Width: ${rotatedRect.size.width.toFixed(2)}`;

                ultimoErro = (cx - (src.cols / 2)) / (src.cols / 2) * 100;

                if(characteristic) await characteristic.writeValue(encoder.encode(Math.round(errorPorcent)));

                // await characteristic.writeValue(encoder.encode(Math.round(errorPorcent)));
            }

            cv.imshow("canvas-output", cropped);
        } catch (err) {
            console.error(err);
        }

        document.getElementById("fps").innerText = `FPS: ${Math.round(1000 / (Date.now() - begin))}`;

        let delay = 1000 / FPS - (Date.now() - begin);
        setTimeout(processVideo, delay);
}

    setTimeout(processVideo, 0);
}