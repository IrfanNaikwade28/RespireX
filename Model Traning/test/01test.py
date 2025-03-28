import numpy as np
import pandas as pd
import pickle
from keras.models import load_model

class Level0:
    def __init__(self, model_path='../model/lung_cancer_model.h5', scaler_path='../model/scaler.pkl'):
        try:
            self.model = load_model(model_path)
            with open(scaler_path, 'rb') as f:
                self.scaler = pickle.load(f)
        except Exception as e:
            raise Exception(f"Error loading model or scaler: {e}")
    
    def predict(self, input_data):
        try:
            # Ensure input is a numpy array and reshape if necessary
            input_data = np.array(input_data).reshape(1, -1)
            
            # Scale input data
            input_data_scaled = self.scaler.transform(input_data)
            
            # Predict probability
            prediction = self.model.predict(input_data_scaled)
            
            # Convert probability to boolean class (True or False)
            return bool(prediction[0][0] > 0.5)
        
        except Exception as e:
            return f"Prediction error: {e}"

    def predict_from_csv(self, file_path):
        try:
            # Load CSV file
            df = pd.read_csv(file_path)
            
            # Remove 'LUNG_CANCER' column if exists
            if 'LUNG_CANCER' in df.columns:
                df.drop(columns=['LUNG_CANCER'], inplace=True)
            
            # Convert categorical 'GENDER' column to numeric
            df['GENDER'] = df['GENDER'].map({'M': 1, 'F': 0})
            
            # Scale input data
            input_data_scaled = self.scaler.transform(df)
            
            # Predict probability
            predictions = self.model.predict(input_data_scaled)
            
            # Convert probabilities to True/False
            df['Predicted_Risk'] = predictions.flatten() > 0.5
            
            # Save results to CSV
            output_path = '../Dataset/predictions_output.csv'
            df[['Predicted_Risk']].to_csv(output_path, index=False)
            return df[['Predicted_Risk']]
        
        except Exception as e:
            return f"CSV Prediction error: {e}"

# Example usage
if __name__ == "__main__":
    model = Level0()
    result = model.predict_from_csv('../Dataset/survey.csv')
    print("Predictions saved to 'predictions_output.csv'")
    print("\nFirst few predictions:")
    print(result.head())
