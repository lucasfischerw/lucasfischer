var LOWER_COLOR = [0, 0, 0, 0];
var HIGHER_COLOR = [150, 150, 150, 255];
var LOWER_CNT_AREA = 1500;
var HIGHER_CNT_AREA = 10000;


const video = document.getElementById('hiddenVideo');
const canvas = document.getElementById('outputCanvas');
const context = canvas.getContext('2d');

function startStream() {
    navigator.mediaDevices.getUserMedia({video: true}).then(function (stream) {
        video.srcObject = stream;
        video.play();
    }).catch(function (error) {
        console.error('Error accessing media devices.', error);
    });
}


function onOpenCvReady() {
    console.log('OpenCV.js is ready');
    startStream();

    const processFrame = () => {
        if (!video.paused && !video.ended) {
            // Draw the video frame to the hidden canvas
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const src = cv.matFromImageData(imageData);
            const mask = new cv.Mat(src.rows, src.cols, cv.CV_8UC1);

            cv.cvtColor(src, mask, cv.COLOR_RGBA2GRAY);
            let ksize = new cv.Size(5, 5);
            let low = new cv.Mat(src.rows, src.cols, cv.CV_8UC1, LOWER_COLOR);
            let high = new cv.Mat(src.rows, src.cols, cv.CV_8UC1, HIGHER_COLOR);
            cv.inRange(mask, low, high, mask);
            cv.GaussianBlur(mask, mask, ksize, 0, 0, cv.BORDER_DEFAULT);
            cv.threshold(mask, mask, 50, 255, cv.THRESH_BINARY);

            let all_contours = new cv.MatVector();
            let hierarchy = new cv.Mat();
            cv.findContours(mask, all_contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_NONE);

            let color = new cv.Scalar(255, 0, 0, 255);
            //Find contours with area > 1000 and append it to new vector
            let contours = new cv.MatVector();
            for (let i = 0; i < all_contours.size(); ++i) {
                let cnt = all_contours.get(i);
                let area = cv.contourArea(cnt, false);
                if (area > LOWER_CNT_AREA && area < HIGHER_CNT_AREA) {
                    contours.push_back(cnt);
                }
            }

            for (let i = 0; i < contours.size(); ++i) {
                //Find aproximate shape
                let approx = new cv.Mat();
                cv.approxPolyDP(contours.get(i), approx, .02 * cv.arcLength(contours.get(i), true), true);
                //Draw lines between vertices
                for (let j = 0; j < approx.data32S.length / 2 - 1; ++j) {
                    let x = (approx.data32S[j * 2] + approx.data32S[(j + 1) * 2]) / 2
                    let y = (approx.data32S[j * 2 + 1] + approx.data32S[(j + 1) * 2 + 1]) / 2
                    let distance = Math.sqrt(Math.pow(approx.data32S[j * 2] - approx.data32S[(j + 1) * 2], 2) + Math.pow(approx.data32S[j * 2 + 1] - approx.data32S[(j + 1) * 2 + 1], 2))
                }

                //Calculate max distance difference between current side and next side
                let max_diff = 0
                for (let j = 0; j < approx.data32S.length / 2 - 1; ++j) {
                    let distance = Math.sqrt(Math.pow(approx.data32S[j * 2] - approx.data32S[(j + 1) * 2], 2) + Math.pow(approx.data32S[j * 2 + 1] - approx.data32S[(j + 1) * 2 + 1], 2))
                    let distance2 = Math.sqrt(Math.pow(approx.data32S[j * 2 + 2] - approx.data32S[(j + 1) * 2], 2) + Math.pow(approx.data32S[j * 2 + 3] - approx.data32S[(j + 1) * 2 + 1], 2))
                    let diff = Math.abs(distance - distance2)
                    if (diff > max_diff){
                        max_diff = diff
                    }
                }

                //Calculate max angle difference between current side and next side
                //And normalize to be between 0 and 180
                let max_angle_diff = 0
                for (let j = 0; j < approx.data32S.length / 2 - 1; ++j) {
                    let angle = Math.atan2(approx.data32S[j * 2 + 3] - approx.data32S[j * 2 + 1], approx.data32S[j * 2 + 2] - approx.data32S[j * 2]) * 180 / Math.PI
                    let angle2 = Math.atan2(approx.data32S[j * 2 + 5] - approx.data32S[j * 2 + 3], approx.data32S[j * 2 + 4] - approx.data32S[j * 2 + 2]) * 180 / Math.PI
                    let diff = Math.abs(angle - angle2)
                    if (diff > max_angle_diff){
                        max_angle_diff = diff
                    }
                }
                if (max_angle_diff > 180){
                    max_angle_diff = 360 - max_angle_diff
                }
                let x = (approx.data32S[0] + approx.data32S[2]) / 2
                let y = (approx.data32S[1] + approx.data32S[3]) / 2

                var vertices = approx.data32S.length / 2;
                
                if (vertices >= 7 && max_angle_diff < 100) {
                    let cnt = contours.get(i);
                    if (cv.isContourConvex(approx)) {
                        color = new cv.Scalar(0, 255, 0, 255);
                        //cv.drawContours(output, contours, i, color, 5, cv.LINE_8, hierarchy, 100);
                        //Show rectangle
                        let rotatedRect = cv.minAreaRect(cnt);
                        //let vertices = cv.RotatedRect.points(rotatedRect);
                        // let contoursColor = new cv.Scalar(255, 255, 255);
                        // for (let j = 0; j < 4; j++) {
                        //     cv.line(output2, vertices[j], vertices[(j + 1) % 4], contoursColor, 2, cv.LINE_AA, 0);
                        // }

                        let center = rotatedRect.center;
                        //Draw solid red circle to indicate center
                        cv.circle(src, center, 3, new cv.Scalar(255, 0, 0, 255), -1, cv.LINE_AA, 0);
                        //Write circle center coordinates
                        cv.putText(src, "(" + parseInt(center.x).toString() + ", " + parseInt(center.y).toString() + ")", new cv.Point(center.x, center.y),
                            cv.FONT_HERSHEY_SIMPLEX, 0.35, new cv.Scalar(255, 0, 0, 255), 1);


                        //Calculate minimum and max distance from point of contour to center
                        const points = {}
                        const ci = cnt;
                        points[i] = []
                        for (let j = 0; j < ci.data32S.length; j += 2){
                            let p = {}
                            p.x = ci.data32S[j]
                            p.y = ci.data32S[j+1]
                            points[i].push(p)
                        }

                        //Calculate min and max distance from center to point
                        let min = 1000000
                        let max = 0
                        let min_point = {}
                        let max_point = {}
                        for (let j = 0; j < points[i].length; j++){
                            let distance = Math.sqrt(Math.pow(points[i][j].x - center.x, 2) + Math.pow(points[i][j].y - center.y, 2))
                            if (distance < min){
                                min = distance.toFixed(2)
                                min_point = points[i][j]
                            }
                            if (distance > max){
                                max = distance.toFixed(2)
                                max_point = points[i][j]
                            }
                        }

                        //Draw pixel color acording to distance
                        //Max distance is red, min distance is green and anithing in between a gradient
                        //Max distance will be considered the min dimention of the rectangle that contains the shape
                        
                        for(let j = 0; j < points[i].length; j++){
                            let distance = Math.sqrt(Math.pow(points[i][j].x - center.x, 2) + Math.pow(points[i][j].y - center.y, 2))
                            let color = new cv.Scalar(0, 255, 0, 100)
                            if (distance > min && distance < max){
                                let ratio = (distance - min) / (max - min)
                                let r = 255 * ratio
                                let g = 255 * (1 - ratio)
                                color = new cv.Scalar(r, g, 0, 255)
                            } else if (distance == min){
                                color = new cv.Scalar(0, 255, 0, 255)
                            } else if (distance == max){
                                color = new cv.Scalar(255, 0, 0, 255)
                            }
                            cv.circle(src, new cv.Point(points[i][j].x, points[i][j].y), 2, color, -1, cv.LINE_AA, 0);
                        }


                        //Draw line between center and min and max distance
                        // cv.line(output2, center, new cv.Point(min_point.x, min_point.y), new cv.Scalar(0, 255, 0, 255), 2, cv.LINE_AA, 0);
                        // cv.line(output2, center, new cv.Point(max_point.x, max_point.y), new cv.Scalar(255, 0, 0, 255), 2, cv.LINE_AA, 0);

                        //Calculate circle accuracy
                        let rotatedRectPoints = cv.RotatedRect.points(rotatedRect);
                        //Get min Y value of the rectangle
                        let minY = 1000000
                        let maxY = 0
                        for (let j = 0; j < rotatedRectPoints.length; j++){
                            if (rotatedRectPoints[j].y < minY){
                                minY = rotatedRectPoints[j].y
                            }
                            if (rotatedRectPoints[j].y > maxY){
                                maxY = rotatedRectPoints[j].y
                            }
                        }

                        
                        let accuracy = (min/max * 100).toFixed(2).toString() + "%"
                        cv.putText(src, accuracy, new cv.Point((center.x - accuracy.length * 5), minY-10), cv.FONT_HERSHEY_SIMPLEX,  0.5, new cv.Scalar(0, 0, 0, 255), 1);

                        //color = new cv.Scalar(0, 255, 0, 255);
                        //cv.drawContours(output, contours, i, color, 5, cv.LINE_8, hierarchy, 100);
                    }
                    //cv.putText(contours_var, shape, new cv.Point(x, y),
                        //cv.FONT_HERSHEY_SIMPLEX, 0.5, color, 2);
                } else {
                    //color = new cv.Scalar(255, 0, 0, 255);
                    //cv.drawContours(output, contours, i, color, 5, cv.LINE_8, hierarchy, 100);
                }
                approx.delete();
            }


            cv.imshow('outputCanvas', src);
            cv.imshow('maskOutput', mask);


            src.delete();
            mask.delete();
            low.delete();
            high.delete();
            all_contours.delete();
            hierarchy.delete();
            contours.delete();

            requestAnimationFrame(processFrame);
        }
    };
    
    video.addEventListener('play', () => {
        processFrame();
    });
}

document.getElementById('dark-mode-toggle').addEventListener('click', (e) => {
    if(e.target.checked) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
});

document.getElementById('config-button').addEventListener('click', () => {
    document.getElementById('website-popup').style.animation = 'popup-appear 0.5s ease forwards';
    document.getElementById('website-popup').style.display = 'block';
    document.getElementById('main-content-wrapper').style.filter = 'blur(5px)';
});

document.getElementById('close-popup-btn').addEventListener('click', () => {
    document.getElementById('website-popup').style.animation = 'popup-disappear 0.5s ease forwards';
    document.getElementById('main-content-wrapper').style.filter = 'none';
    setTimeout(() => {
        document.getElementById('website-popup').style.display = 'none';
    }, 500);
});

document.getElementById('minValue').addEventListener('input', (e) => {
    LOWER_COLOR[0] = parseInt(e.target.value);
    LOWER_COLOR[1] = parseInt(e.target.value);
    LOWER_COLOR[2] = parseInt(e.target.value);
    document.getElementById('minValueLabel').innerText = e.target.value;
    if(e.target.value > parseInt(document.getElementById('maxValue').value)) {
        document.getElementById('maxValue').value = e.target.value;
        document.getElementById('maxValueLabel').innerText = e.target.value;
        HIGHER_COLOR[0] = parseInt(e.target.value);
        HIGHER_COLOR[1] = parseInt(e.target.value);
        HIGHER_COLOR[2] = parseInt(e.target.value);
    }
});

document.getElementById('maxValue').addEventListener('input', (e) => {
    HIGHER_COLOR[0] = parseInt(e.target.value);
    HIGHER_COLOR[1] = parseInt(e.target.value);
    HIGHER_COLOR[2] = parseInt(e.target.value);
    document.getElementById('maxValueLabel').innerText = e.target.value;
    if(e.target.value < parseInt(document.getElementById('minValue').value)) {
        document.getElementById('minValue').value = e.target.value;
        document.getElementById('minValueLabel').innerText = e.target.value;
        LOWER_COLOR[0] = parseInt(e.target.value);
        LOWER_COLOR[1] = parseInt(e.target.value);
        LOWER_COLOR[2] = parseInt(e.target.value);
    }
});

document.getElementById('minArea').addEventListener('input', (e) => {
    LOWER_CNT_AREA = parseInt(e.target.value);
    document.getElementById('minAreaLabel').innerText = e.target.value;
    if(e.target.value > parseInt(document.getElementById('maxArea').value)) {
        document.getElementById('maxArea').value = e.target.value;
        document.getElementById('maxAreaLabel').innerText = e.target.value;
        HIGHER_CNT_AREA = parseInt(e.target.value);
    }
});

document.getElementById('maxArea').addEventListener('input', (e) => {
    HIGHER_CNT_AREA = parseInt(e.target.value);
    document.getElementById('maxAreaLabel').innerText = e.target.value;
    if(e.target.value < parseInt(document.getElementById('minArea').value)) {
        document.getElementById('minArea').value = e.target.value;
        document.getElementById('minAreaLabel').innerText = e.target.value;
        LOWER_CNT_AREA = parseInt(e.target.value);
    }
});