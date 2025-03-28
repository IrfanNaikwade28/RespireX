import random

class DummyModel:
    """
    A dummy model class that simulates the SymptoScan model without requiring tensorflow or keras.
    This is a temporary solution until the actual model dependencies can be installed.
    """
    def __init__(self):
        # Some dummy rule-based logic for demonstration
        self.risk_thresholds = {
            'age': 50,  # Age above 50 increases risk
            'smoking': 1,  # If smoking status is 1 or higher, increases risk
            'yellow_fingers': 1,  # Yellow fingers is a symptom of smoking
            'anxiety': 1,  # Anxiety can be stress-related, minor factor
            'chronic_disease': 1,  # Chronic disease history increases risk
            'fatigue': 1,  # Fatigue is a common symptom
        }
    
    def predict(self, symptoms):
        """
        Make a prediction based on symptom values.
        
        Args:
            symptoms: List of symptom values [gender, age, smoking, yellow_fingers, anxiety, ...]
            
        Returns:
            1 if high risk, 0 if low risk
        """
        try:
            # Get relevant values from symptoms list
            # Assuming the symptoms list follows this order:
            # [gender, age, smoking, yellow_fingers, anxiety, chronic_disease, fatigue, ...]
            age = symptoms[1]
            smoking = symptoms[2]
            yellow_fingers = symptoms[3]
            anxiety = symptoms[4]
            chronic_disease = symptoms[5]
            fatigue = symptoms[6]
            
            # Simple rule-based scoring
            score = 0
            
            # Age factor
            if age > self.risk_thresholds['age']:
                score += 2
            
            # Smoking factors
            if smoking >= self.risk_thresholds['smoking']:
                score += 3
            
            if yellow_fingers >= self.risk_thresholds['yellow_fingers']:
                score += 1
            
            # Other health factors
            if anxiety >= self.risk_thresholds['anxiety']:
                score += 1
                
            if chronic_disease >= self.risk_thresholds['chronic_disease']:
                score += 2
                
            if fatigue >= self.risk_thresholds['fatigue']:
                score += 1
                
            # Random factor for variety (remove in production)
            score += random.randint(0, 2)
            
            # Threshold for positive prediction
            return 1 if score >= 5 else 0
            
        except Exception as e:
            print(f"Error in prediction: {e}")
            # Default to low risk if there's an error
            return 0

# Function to use for testing
def get_model():
    return DummyModel() 