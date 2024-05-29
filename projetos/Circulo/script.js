const FRAME_RATE = 60;
const VIDEO_WIDTH = 1280;
const VIDEO_HEIGHT = 720;
const VIDEO_INPUT = document.getElementById('video');
const constraints = {
    video: true
};

const LOWER_COLOR = [0, 0, 0, 0];
const HIGHER_COLOR = [150, 150, 150, 255];
const OUTPUT_CANVAS = document.getElementById('canvas');
const OUTPUT_CANVAS_ADITIONAL_INFO = document.getElementById('canvas2');
const MASK_OUTPUT = document.getElementById('mask');

function startStream() {
    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        VIDEO_INPUT.srcObject = stream;
    }).catch(function (error) {
        console.error('Error accessing media devices.', error);
    });
}

function stopStream() {
    let stream = VIDEO_INPUT.srcObject;
    let tracks = stream.getTracks();

    for (let i = 0; i < tracks.length; i++) {
        let track = tracks[i];
        track.stop();
    }

    VIDEO_INPUT.srcObject = null;
}

let hasContours = false;

function processVideo() {
    const cap = new cv.VideoCapture(VIDEO_INPUT);

    let src = new cv.Mat(VIDEO_INPUT.height, VIDEO_INPUT.width, cv.CV_8UC4);
    let mask = new cv.Mat(VIDEO_INPUT.height, VIDEO_INPUT.width, cv.CV_8UC1);
    //let inverse_mask = new cv.Mat(VIDEO_INPUT.height, VIDEO_INPUT.width, cv.CV_8UC1);
    let output = new cv.Mat(VIDEO_INPUT.height, VIDEO_INPUT.width, cv.CV_8UC4);
    let output2 = new cv.Mat(VIDEO_INPUT.height, VIDEO_INPUT.width, cv.CV_8UC4);
    cap.read(src);
    cap.read(output);
    cap.read(output2);

    cv.cvtColor(src, mask, cv.COLOR_BGR2GRAY, 0);

    let ksize = new cv.Size(5, 5);
    // You can try more different parameters
    // let M = cv.Mat.ones(5, 5, cv.CV_8U);
    // let anchor = new cv.Point(-1, -1);
    // cv.dilate(mask, mask, M, anchor, 1, cv.BORDER_DEFAULT, cv.morphologyDefaultBorderValue());

    let low = new cv.Mat(src.rows, src.cols, cv.CV_8UC1, LOWER_COLOR);
    let high = new cv.Mat(src.rows, src.cols, cv.CV_8UC1, HIGHER_COLOR);
    cv.inRange(mask, low, high, mask);
    cv.GaussianBlur(mask, mask, ksize, 0, 0, cv.BORDER_DEFAULT);
    cv.threshold(mask, mask, 50, 255, cv.THRESH_BINARY);
    

    // let M = cv.Mat.ones(5, 5, cv.CV_8U);
    // let anchor = new cv.Point(-1, -1);
    // cv.dilate(mask, mask, M, anchor, 1, cv.BORDER_DEFAULT, cv.morphologyDefaultBorderValue());

    
    //cv.bitwise_not(mask, inverse_mask);

    // You can try more different parameters

    //cv.GaussianBlur(mask, mask, ksize, 0, 0, cv.BORDER_DEFAULT);

    let all_contours = new cv.MatVector();
    let hierarchy = new cv.Mat();
    cv.findContours(mask, all_contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_NONE);

    let color = new cv.Scalar(255, 0, 0, 255);

    //Find contours with area > 1000 and append it to new vector
    let contours = new cv.MatVector();
    for (let i = 0; i < all_contours.size(); ++i) {
        let cnt = all_contours.get(i);
        let area = cv.contourArea(cnt, false);
        if (((area > 1500 && !hasContours) || (area > 1000 && hasContours)) && area < 10000) {
            contours.push_back(cnt);
        }
    }

    for (let i = 0; i < contours.size(); ++i) {
        //Find aproximate shape
        let approx = new cv.Mat();
        cv.approxPolyDP(contours.get(i), approx, .02 * cv.arcLength(contours.get(i), true), true);
        //Draw lines between vertices
        for (let j = 0; j < approx.data32S.length / 2 - 1; ++j) {
            // cv.line(output, new cv.Point(approx.data32S[j * 2], approx.data32S[j * 2 + 1]),
            //     new cv.Point(approx.data32S[(j + 1) * 2], approx.data32S[(j + 1) * 2 + 1]),
            //     color, 2, cv.LINE_AA, 0);
                //Write lenght of each side
                let x = (approx.data32S[j * 2] + approx.data32S[(j + 1) * 2]) / 2
                let y = (approx.data32S[j * 2 + 1] + approx.data32S[(j + 1) * 2 + 1]) / 2
                let distance = Math.sqrt(Math.pow(approx.data32S[j * 2] - approx.data32S[(j + 1) * 2], 2) + Math.pow(approx.data32S[j * 2 + 1] - approx.data32S[(j + 1) * 2 + 1], 2))
        }
        // cv.line(output, new cv.Point(approx.data32S[(approx.data32S.length / 2 - 1) * 2],
        //     approx.data32S[(approx.data32S.length / 2 - 1) * 2 + 1]),
        //     new cv.Point(approx.data32S[0], approx.data32S[1]),
        //     color, 2, cv.LINE_AA, 0);

        //Write max difference between lenghts of sides
        let max_diff = 0
        for (let j = 0; j < approx.data32S.length / 2 - 1; ++j) {
            let distance = Math.sqrt(Math.pow(approx.data32S[j * 2] - approx.data32S[(j + 1) * 2], 2) + Math.pow(approx.data32S[j * 2 + 1] - approx.data32S[(j + 1) * 2 + 1], 2))
            let distance2 = Math.sqrt(Math.pow(approx.data32S[j * 2 + 2] - approx.data32S[(j + 1) * 2], 2) + Math.pow(approx.data32S[j * 2 + 3] - approx.data32S[(j + 1) * 2 + 1], 2))
            let diff = Math.abs(distance - distance2)
            if (diff > max_diff){
                max_diff = diff
            }
        }
        // let x = (approx.data32S[0] + approx.data32S[2]) / 2
        // let y = (approx.data32S[1] + approx.data32S[3]) / 2
        // cv.putText(output, max_diff.toFixed(2).toString(), new cv.Point(x, y),
        //     cv.FONT_HERSHEY_SIMPLEX, 0.5, color, 2);

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
        // cv.putText(output, max_angle_diff.toFixed(2).toString(), new cv.Point(x, y),
        //     cv.FONT_HERSHEY_SIMPLEX, 0.5, color, 2);



        //Draw vertices of polygon
        var vertices = approx.data32S.length / 2;
        
        if (vertices >= 7 && max_angle_diff < 100) {
            let cnt = contours.get(i);
            if (cv.isContourConvex(approx)) {
                hasContours = true;

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
                cv.circle(output, center, 3, new cv.Scalar(255, 0, 0, 255), -1, cv.LINE_AA, 0);
                //Write circle center coordinates
                cv.putText(output, "(" + parseInt(center.x).toString() + ", " + parseInt(center.y).toString() + ")", new cv.Point(center.x, center.y),
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
                    cv.circle(output, new cv.Point(points[i][j].x, points[i][j].y), 2, color, -1, cv.LINE_AA, 0);
                }


                //Draw line between center and min and max distance
                cv.line(output2, center, new cv.Point(min_point.x, min_point.y), new cv.Scalar(0, 255, 0, 255), 2, cv.LINE_AA, 0);
                cv.line(output2, center, new cv.Point(max_point.x, max_point.y), new cv.Scalar(255, 0, 0, 255), 2, cv.LINE_AA, 0);

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
                cv.putText(output, accuracy, new cv.Point((center.x - accuracy.length * 5), minY-10), cv.FONT_HERSHEY_SIMPLEX,  0.5, new cv.Scalar(0, 0, 0, 255), 1);

                //color = new cv.Scalar(0, 255, 0, 255);
                //cv.drawContours(output, contours, i, color, 5, cv.LINE_8, hierarchy, 100);
            } else {
                hasContours = false;
            }
            //cv.putText(contours_var, shape, new cv.Point(x, y),
                //cv.FONT_HERSHEY_SIMPLEX, 0.5, color, 2);
        } else {
            hasContours = false;
            //color = new cv.Scalar(255, 0, 0, 255);
            //cv.drawContours(output, contours, i, color, 5, cv.LINE_8, hierarchy, 100);
        }
        approx.delete();
    }



    cv.imshow(OUTPUT_CANVAS, output);
    cv.imshow(OUTPUT_CANVAS_ADITIONAL_INFO, output2);
    cv.imshow(MASK_OUTPUT, mask);
    src.delete();
    mask.delete();
    output.delete();
    output2.delete();
    low.delete();
    high.delete();
    contours.delete();
    hierarchy.delete();

    M.delete();



}

function onOpenCvReady() {
    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        startStream();
        setInterval(function () {
            processVideo();
        }, 1000 / FRAME_RATE);
    }).catch(function (error) {
        console.error('Error accessing media devices.', error);
    });
}

document.addEventListener('DOMContentLoaded', function () {
   document.getElementById("switch").addEventListener("click", function(){
        if (document.getElementById("switch").checked){
            startStream();
        } else {
            stopStream();
            //Stop using camera

        }
    });
});