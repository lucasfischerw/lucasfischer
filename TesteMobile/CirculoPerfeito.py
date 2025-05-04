import cv2 as cv
import numpy as np

camera = cv.VideoCapture(0)

#Line Variables
LOWER_LIMIT = np.array([0, 0, 0])
UPPER_LIMIT = np.array([150, 150, 150])

import time
start_time = time.time()

while True:
    ret, frame = camera.read()

    masked = cv.inRange(frame, LOWER_LIMIT, UPPER_LIMIT)
    masked = cv.dilate(masked, None, iterations=1)

    frame_copy = frame.copy()

    paper_contours, _ = cv.findContours(masked, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_NONE)

    contours = []

    for contour in paper_contours:
        if cv.contourArea(contour) > 1000:
            contours.append(contour)

    for contour in contours:
        approx = cv.approxPolyDP(contour, .03 * cv.arcLength(contour, True), True)
        correctness = 0
        x,y,w,h = cv.boundingRect(contour)
        closed = cv.isContourConvex(approx)
        if not closed:
            cv.putText(frame, "Forma aberta, desclassificado", (10, 20), cv.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 1, cv.LINE_AA)
            cv.drawContours(frame,[contour],0,(0,0,255),-1)
        elif len(approx) <= 7:
            cv.putText(frame, "Poxa, ta horrivel :(", (10, 20), cv.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 1, cv.LINE_AA)
            cv.drawContours(frame,[contour],0,(0,0,255),-1)
        else:

            min_distance_to_center = 255
            max_distance_to_center = 0

            min_distance_to_center_cordinates = (0, 0)
            max_distance_to_center_cordinates = (0, 0)

            medium_line_width = 0
            cv.drawContours(frame, [contour], -1, (255,0,0), 2)

            #cv.rectangle(frame,(x,y),(x+w,y+h),(0,255,0),2)
            boundingRect_center = (int(x+w/2), int(y+h/2))

            cv.circle(frame, boundingRect_center, 5, (0,0,255), -1)
            cv.putText(frame, f"{boundingRect_center}", boundingRect_center, cv.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2, cv.LINE_AA)

            medium_line_width = 0

            cropped = masked[(int)(y+(h/2))-5:(int)(y+(h/2)+5), x:(int)(x+(w/2))]

            for i in range(0, len(cropped)):
                for j in range(0, len(cropped[i])):
                    if cropped[i][j] == 255:
                        medium_line_width += 1

            cropped = masked[(int)(y+(h/2))-5:(int)(y+(h/2)+5), (int)(x+(w/2)):(int)(x+w)]

            for i in range(0, len(cropped)):
                for j in range(0, len(cropped[i])):
                    if cropped[i][j] == 255:
                        medium_line_width += 1

            medium_line_width = medium_line_width/(len(cropped)*4)

            for point in contour:
                pitagoras_distance = lambda x1, y1, x2, y2: ((x2-x1)**2 + (y2-y1)**2)**0.5
                distance = pitagoras_distance(boundingRect_center[0], boundingRect_center[1], point[0][0], point[0][1])


                if distance < min_distance_to_center:
                    min_distance_to_center = distance
                    min_distance_to_center_cordinates = (point[0][0], point[0][1])
                if distance > max_distance_to_center:
                    max_distance_to_center = distance
                    max_distance_to_center_cordinates = (point[0][0], point[0][1])
            
            min_distance_to_center = min_distance_to_center + medium_line_width
            
            cv.line(frame_copy, boundingRect_center, min_distance_to_center_cordinates, (0, 255, 0), 2)
            cv.line(frame_copy, boundingRect_center, max_distance_to_center_cordinates, (0, 0, 255), 2)

            cv.putText(frame_copy, f"{round(min_distance_to_center)}", min_distance_to_center_cordinates, cv.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv.LINE_AA)
            cv.putText(frame_copy, f"{round(max_distance_to_center)}", max_distance_to_center_cordinates, cv.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2, cv.LINE_AA)

            #cv.circle(frame, min_distance_to_center_cordinates, 5, (0,255,0), -1)
            #cv.circle(frame, max_distance_to_center_cordinates, 5, (0,0,255), -1)

            #cv.putText(frame, f"Min Distance: {min_distance_to_center}", (10, 20), cv.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 1, cv.LINE_AA)
            #cv.putText(frame, f"Max Distance: {max_distance_to_center}", (10, 40), cv.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 1, cv.LINE_AA)

            correctness = round((float)(((min_distance_to_center/max_distance_to_center))*100), 2)
            
        cv.putText(frame, f"{correctness}%", ((int)(-40+x+w/2), (int)(y-20)), cv.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 255), 2, cv.LINE_AA)
    
    cv.imshow("Original", frame)
    cv.imshow("Masked", masked)
    cv.imshow("Frame", frame_copy)
    if cv.waitKey(1) & 0xFF == ord("q"):
        break