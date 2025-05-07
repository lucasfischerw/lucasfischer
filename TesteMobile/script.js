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
    const encoder = new TextEncoder();
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

    // Inicializar OpenCV
    const FPS = 60;
    const cap = new cv.VideoCapture(video);
    const src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    const gray = new cv.Mat();
    const thresh = new cv.Mat();
    const kernel = cv.Mat.ones(3, 3, cv.CV_8U);
    const contours = new cv.MatVector();
    const hierarchy = new cv.Mat();
    const centerX = src.cols / 2;
    const centerY = src.rows / 2;

    console.log("Largura: " + src.cols);
    console.log("Altura: " + src.rows);
    console.log("Centro X: " + centerX);
    console.log("Centro Y: " + centerY);

    let height = 350;
    let y = src.rows - (height * 2);
    let x = 0;
    let width = src.cols;

    var ultimoCentro = centerX;

    async function Verde(imgHSV) {
        let masked_image = new cv.Mat();
        const lower = new cv.Scalar(40, 95, 50);
        const upper = new cv.Scalar(100, 225, 160);
        cv.inRange(imgHSV, lower, upper, masked_image);
        cv.erode(masked_image, masked_image, kernel, new cv.Point(-1, -1), 5);
        cv.dilate(masked_image, masked_image, kernel, new cv.Point(-1, -1), 9);

        let contours = new cv.MatVector();
        let hierarchy = new cv.Mat();
        cv.findContours(masked_image, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
        let maxArea = 0;
        let maxContour = null;
        for (let i = 0; i < contours.size(); ++i) {
            const contour = contours.get(i);
            const area = cv.contourArea(contour);
            if (area > maxArea) {
                maxArea = area;
                maxContour = contour;
            }
        }

        // if (maxContour) {
        //     const color = new cv.Scalar(0, 255, 0, 255);
        //     cv.drawContours(masked_image, contours, -1, color, 2, cv.LINE_8, hierarchy, 100);
        //     const M = cv.moments(maxContour);
        //     const cx = M.m10 / M.m00;
        //     const cy = M.m01 / M.m00;
        //     const center = new cv.Point(cx, cy);
        //     const radius = 5;
        //     const colorCenter = new cv.Scalar(0, 0, 255, 255);
        //     cv.circle(masked_image, center, radius, colorCenter, -1);
        // }
        cv.imshow("canvas-output-verde", masked_image);
        masked_image.delete();
        contours.delete();
        hierarchy.delete();
    }

    async function processVideo() {
        let begin = Date.now();
        cap.read(src);

        let rect = new cv.Rect(x, y, width, height);
        let rectVerde = new cv.Rect(x, y / 2, width, height * 2);
        let cropped = src.roi(rect);
        let croppedVerde = src.roi(rectVerde);
        cv.cvtColor(cropped, gray, cv.COLOR_RGBA2GRAY);
        const lowerGray = new cv.Mat(gray.rows, gray.cols, gray.type(), new cv.Scalar(0, 0, 0, 0));
        const upperGray = new cv.Mat(gray.rows, gray.cols, gray.type(),new cv.Scalar(80, 80, 80, 80));
        cv.inRange(gray, lowerGray, upperGray, thresh);
  
        cv.erode(thresh, thresh, kernel, new cv.Point(-1, -1), 5);
        cv.dilate(thresh, thresh, kernel, new cv.Point(-1, -1), 9);

        cv.findContours(thresh,contours,hierarchy,cv.RETR_CCOMP,cv.CHAIN_APPROX_SIMPLE);

        //Verde
        let rgb = new cv.Mat();
        cv.cvtColor(croppedVerde, rgb, cv.COLOR_RGBA2RGB);
        const imgHSV = new cv.Mat();
        cv.cvtColor(rgb, imgHSV, cv.COLOR_RGB2HSV);

        const masked_image = new cv.Mat();
        const lower = new cv.Mat(imgHSV.rows, imgHSV.cols, imgHSV.type(), new cv.Scalar(40, 95, 50));
        const upper = new cv.Mat(imgHSV.rows, imgHSV.cols, imgHSV.type(), new cv.Scalar(150, 255, 255));

        cv.inRange(imgHSV, lower, upper, masked_image);
        cv.erode(masked_image, masked_image, kernel, new cv.Point(-1, -1), 5);
        cv.dilate(masked_image, masked_image, kernel, new cv.Point(-1, -1), 9);

        let contours_Verde = new cv.MatVector();
        let hierarchy_Verde = new cv.Mat();
        cv.findContours(masked_image, contours_Verde, hierarchy_Verde, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);

        for (let i = 0; i < contours_Verde.size(); ++i) {
            const contour = contours_Verde.get(i);
            const area = cv.contourArea(contour);
            const M = cv.moments(contour);
            const cx = M.m10 / M.m00;
            const cy = M.m01 / M.m00;
            const center = new cv.Point(cx, cy);
            const radius = 5;
            const colorCenter = new cv.Scalar(0, 255, 0, 255);
            cv.circle(croppedVerde, center, radius, colorCenter, -1);
            const rotatedRect = cv.minAreaRect(contour);
            let angle = rotatedRect.angle;
            if (angle > 45) angle = 90 - angle;
            if (angle < -45) angle = 90 + angle;

            if(Math.abs(rotatedRect.size.width - rotatedRect.size.height) > 60)
                continue;

            const rect = cv.boundingRect(contour);
            // Definir margem para cima e para baixo a partir do centro vertical
            const margin = Math.floor(rect.height); // ou outro valor maior para ampliar a área
            const yTop = Math.max(0, cy - margin);
            const yBottom = Math.min(croppedVerde.rows, cy + margin);

            const verticalRect = new cv.Rect(
                rect.x,
                yTop,
                rect.width,
                yBottom - yTop
            );

            const verticalROI = croppedVerde.roi(verticalRect);
            // Converter para escala de cinza
            let gray = new cv.Mat();
            cv.cvtColor(verticalROI, gray, cv.COLOR_RGBA2GRAY);

            // // Dividir em parte superior e inferior
            const halfHeight = Math.floor(gray.rows / 2);
            const topHalf = gray.rowRange(0, halfHeight);
            const bottomHalf = gray.rowRange(halfHeight, gray.rows);

            let topThresh = new cv.Mat();
            let bottomThresh = new cv.Mat();

            cv.threshold(topHalf, topThresh, 90, 255, cv.THRESH_BINARY_INV);
            cv.threshold(bottomHalf, bottomThresh, 90, 255, cv.THRESH_BINARY_INV);

            let topBlack = cv.countNonZero(topThresh);
            let bottomBlack = cv.countNonZero(bottomThresh);

            // Comparar
            if (topBlack > bottomBlack) {
                const color = new cv.Scalar(0, 255, 0, 255);
                cv.drawContours(croppedVerde, contours_Verde, i, color, 10, cv.LINE_8, hierarchy_Verde, 100);
            } else {
                const color = new cv.Scalar(255, 0, 0, 255);
                cv.drawContours(croppedVerde, contours_Verde, i, color, 10, cv.LINE_8, hierarchy_Verde, 100);
            }
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

            const errorPorcent = (cx - (src.cols / 2)) / (src.cols / 2) * 100;
            document.getElementById("error").innerText = `Error: ${errorPorcent.toFixed(2)}%`;
            document.getElementById("angle").innerText = `Angle: ${angle.toFixed(2)}`;
            document.getElementById("width").innerText = `Width: ${rotatedRect.size.width.toFixed(2)}`;

            if(characteristic)
                await characteristic.writeValue(encoder.encode(Math.round(errorPorcent)));
        }

        // let canvas = document.getElementById("canvas-output");
        // canvas.width = window.innerWidth;
        // canvas.height = window.innerWidth * (src.rows / src.cols);
        cv.imshow("canvas-output", cropped);
        // cv.imshow("canvas-output-verde", masked_image);

        let delay = 1000 / FPS - (Date.now() - begin);
        setTimeout(processVideo, delay);
    }

    setTimeout(processVideo, 0);
}