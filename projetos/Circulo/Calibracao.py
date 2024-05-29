import cv2
import numpy as np

# Initialize variables for the rectangle
drawing = False
rectangle_finalized = False
ix, iy = -1, -1
fx, fy = -1, -1

def draw_rectangle(event, x, y, flags, param):
    global ix, iy, fx, fy, drawing, rectangle_finalized

    if event == cv2.EVENT_LBUTTONDOWN:
        drawing = True
        rectangle_finalized = False
        ix, iy = x, y

    elif event == cv2.EVENT_MOUSEMOVE:
        if drawing:
            fx, fy = x, y

    elif event == cv2.EVENT_LBUTTONUP:
        drawing = False
        fx, fy = x, y
        rectangle_finalized = True

def get_median_color(roi):
    median_rgb = [int(np.median(roi[:, :, i])) for i in range(3)]
    hsv_roi = cv2.cvtColor(roi, cv2.COLOR_BGR2HSV)
    median_hsv = [int(np.median(hsv_roi[:, :, i])) for i in range(3)]
    return median_rgb, median_hsv

# Create a window and set a mouse callback
cv2.namedWindow('Live Feed')
cv2.setMouseCallback('Live Feed', draw_rectangle)

# Capture video from the camera
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Could not open video capture")
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        print("Error: Failed to capture image")
        break

    display_frame = frame.copy()

    if drawing:
        cv2.rectangle(display_frame, (ix, iy), (fx, fy), (0, 255, 0), 2)
    elif rectangle_finalized:
        x1, y1 = min(ix, fx), min(iy, fy)
        x2, y2 = max(ix, fx), max(iy, fy)
        roi = frame[y1:y2, x1:x2]

        if roi.size > 0:
            median_rgb, median_hsv = get_median_color(roi)
            
            # Display the median values on the image
            text_rgb = f"RGB Median: {median_rgb}"
            text_hsv = f"HSV Median: {median_hsv}"
            cv2.putText(display_frame, text_rgb, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
            cv2.putText(display_frame, text_hsv, (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
    
    # Display the frame
    cv2.imshow('Live Feed', display_frame)

    # Exit when 'q' key is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the capture and close windows
cap.release()
cv2.destroyAllWindows()
