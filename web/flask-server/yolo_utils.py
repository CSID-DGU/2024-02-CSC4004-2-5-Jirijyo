from ultralytics import YOLO

# Load YOLO model
model = YOLO('weights/best.pt')  # Use your custom YOLO model

# Specify the "person" class index
person_index = 0  # Assuming '0' corresponds to "Person" in your model's label file

def get_detections(img):
    # Perform object detection
    results = model(img)
    
    # Extract results
    detections = results[0].boxes.xyxy.cpu().numpy()  # x1, y1, x2, y2
    classes = results[0].boxes.cls.cpu().numpy()  # Class IDs
    confidences = results[0].boxes.conf.cpu().numpy()  # Confidence scores
    
    objects = []
    for i in range(len(detections)):
        # Filter only "Person" class detections
        if int(classes[i]) == person_index:  # Match 'person' class index
            x1, y1, x2, y2 = detections[i]
            objects.append({
                'x1': int(x1),
                'y1': int(y1),
                'x2': int(x2),
                'y2': int(y2),
                'confidence': float(confidences[i]),
                'class': "Person"  # Replace label with "Person"
            })
    
    return {'objects': objects}
