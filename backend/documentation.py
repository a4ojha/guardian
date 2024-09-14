from inference import get_model
import supervision as sv
import cv2


# load a pre-trained yolov8n model
model = get_model(model_id="fall-detection-ca3o8/4")

# # run inference on our chosen image, image can be a url, a numpy array, a PIL image, etc.
# results = model.infer(image)[0]
# detections = sv.Detections.from_inference(results)

# # create supervision annotators
# bounding_box_annotator = sv.BoundingBoxAnnotator()
# label_annotator = sv.LabelAnnotator()

# # annotate the image with our inference results
# annotated_image = bounding_box_annotator.annotate(
#     scene=image, detections=detections)
# annotated_image = label_annotator.annotate(
#     scene=annotated_image, detections=detections)

# # display the image
# sv.plot_image(annotated_image)

video = cv2.VideoCapture(0)


# Infer via the Roboflow Infer API and return the result
def infer():
    # Get the current image from the webcam
    ret, img = video.read()
    cv2.imshow('image', img)

    results = model.infer(img)[0]
    detections = sv.Detections.from_inference(results)



    print(detections.confidence)


while 1:
    # On "q" keypress, exit
    if(cv2.waitKey(1) == ord('q')):
        break

    # Synchronously get a prediction from the Roboflow Infer API
    infer()
    