const video = document.getElementById("video-input");
const canvas = document.getElementById("canvas-output");

async function initialize() {
    const socket = new WebSocket("ws://192.168.4.1/ws");

    socket.onopen = () => {
    console.log("WebSocket connected");
    };

    socket.onerror = (e) => {
    console.error("WebSocket error", e);
    };

    function sendFastData(errorPorcent) {
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(errorPorcent.toFixed(2));
        }
    }


    const stream = await navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: { exact: "environment" } // força a câmera traseira
        },
        audio: false,
    });

    if (!stream) {
        return;
    }

    video.srcObject = stream;
    await video.play();

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

    let height = 100;
    let y = src.rows - height; // começa 100 pixels antes de terminar a imagem
    let x = 0;
    let width = src.cols;

    var ultimoCentro = centerX;

    function processVideo() {
        let begin = Date.now();

        cap.read(src);
        let rect = new cv.Rect(x, y, width, height);
        let cropped = src.roi(rect);
        cv.cvtColor(cropped, gray, cv.COLOR_RGBA2GRAY);
        cv.threshold(gray, thresh, 0, 255, cv.THRESH_BINARY_INV + cv.THRESH_OTSU);

        cv.erode(thresh, thresh, kernel, new cv.Point(-1, -1), 5);
        cv.dilate(thresh, thresh, kernel, new cv.Point(-1, -1), 9);

        cv.findContours(thresh,contours,hierarchy,cv.RETR_CCOMP,cv.CHAIN_APPROX_SIMPLE);

        // Conversão para HSV
        let imgHSV = new cv.Mat();
        cv.cvtColor(cropped, imgHSV, cv.COLOR_BGR2HSV);
        // Definição dos limites HSV
        let lower = cv.matFromArray(1, 1, cv.CV_8UC3, [60, 125, 65]);
        let upper = cv.matFromArray(1, 1, cv.CV_8UC3, [90, 255, 255]);
        // Aplicação da máscara
        let masked_image = new cv.Mat();
        cv.inRange(imgHSV, lower, upper, masked_image);

        // Liberação de memória
        lower.delete();
        upper.delete();
        // NÃO delete `frame` nem `masked_image` antes do imshow

        var bestContourIndex = 0;
        var smallestCenterDistance = 1000000;
        let bestContour = null;

        // Draw contours on the original image
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

        // Draw the best contour
        if (bestContour) {
            const color = new cv.Scalar(0, 255, 0, 255);
            cv.drawContours(cropped, contours, bestContourIndex, color, 2, cv.LINE_8, hierarchy, 100);
        
            // Draw the center
            const M = cv.moments(bestContour);
            const cx = M.m10 / M.m00;
            const cy = M.m01 / M.m00;
            const center = new cv.Point(cx, cy);
            const radius = 5;
            const colorCenter = new cv.Scalar(0, 0, 255, 255); // Red color
            cv.circle(cropped, center, radius, colorCenter, -1);
            ultimoCentro = cx;
        
            // Compute the min area rect and get the angle
            const rotatedRect = cv.minAreaRect(bestContour); // returns {center, size, angle}
            let angle = rotatedRect.angle;
        
            // Normaliza o ângulo para que 0° seja horizontal
            if(angle > 45) {
                angle = 90 - angle;
            }
            if (angle < -45) {
                angle = 90 + angle;
            }

            const errorPorcent = (smallestCenterDistance) / (src.cols / 2) * 100;

            // Show error value as well
            document.getElementById("error").innerText = `Error: ${errorPorcent.toFixed(2)}%`;
            document.getElementById("angle").innerText = `Angle: ${angle.toFixed(2)}`;
            document.getElementById("width").innerText = `Width: ${rotatedRect.size.width.toFixed(2)}`;
            document.getElementById("teste").innerText = `Width: ${ultimoCentro}`;


            sendFastData(errorPorcent);
        }


        // Show the result
        cv.imshow("canvas-output", masked_image);

        // Schedule the next frame
        let delay = 1000 / FPS - (Date.now() - begin);
        setTimeout(processVideo, delay);
    }

  setTimeout(processVideo, 0);
}