from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import joblib

# Initialize FastAPI app
app = FastAPI()

# Load the saved model, scaler, and encoder
# model = joblib.load('model/return_prediction_model.pkl')
# scaler = joblib.load("model/scaler.pkl")
# encoder = joblib.load("model/ordinal_encode.pkl")

model = joblib.load("model/return_prediction_model.pkl")
scaler = joblib.load("model/scaler.pkl")
encoder = joblib.load("model/ordinal_encoder.pkl")


# Define the expected input features
cat_cols = ['customer_id', 'product_type', 'product_id', 'month', 'return_reason']
num_cols = ['price', 'delivery_distance', 'customer_return_rate']

class InputData(BaseModel):
    customer_id: str
    product_type: str
    product_id: str
    price: float
    delivery_distance: float
    month: str
    customer_return_rate: float
    return_reason: str

@app.post("/predict")
def predict(data: InputData):
    try:
        # Convert input to DataFrame
        df = pd.DataFrame([data.dict()])

        # Encode categorical features
        df[cat_cols] = encoder.transform(df[cat_cols].astype(str))

        # Scale numerical features
        df[num_cols] = scaler.transform(df[num_cols])

        # Combine and predict
        X = df[cat_cols + num_cols]
        pred = model.predict(X)[0]
        prob = model.predict_proba(X)[0][1]

        return {
            "return_status": int(pred),
            "return_probability": round(float(prob), 3)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


