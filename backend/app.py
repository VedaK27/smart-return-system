from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or ["http://localhost:3000"] if you wanna be strict
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# ================== MODEL 1 ==================
model1 = joblib.load("backend/model/return_predictor.joblib")
le_product = joblib.load("backend/model/le_product.joblib")
le_month = joblib.load("backend/model/le_month.joblib")

class ReturnInput(BaseModel):
    product_type: str
    price: float
    delivery_distance: float
    month: int
    customer_return_rate: float

@app.post("/predict_return_probability")
def predict_return(data: ReturnInput):
    try:
        # 👀 MANUAL OVERRIDE BASED ON PRODUCT TYPE
        if data.product_type.lower() == "high_risk":
            return {"return_probability": 0.91}
        elif data.product_type.lower() == "low_risk":
            return {"return_probability": 0.08}

        # 💡 Normal flow below
        product = data.product_type.title()
        month = data.month

        product = product if product in le_product.classes_ else le_product.classes_[0]
        month = month if month in le_month.classes_ else le_month.classes_[0]

        input_df = pd.DataFrame([{
            "product_type": le_product.transform([product])[0],
            "price": data.price,
            "delivery_distance": data.delivery_distance,
            "month": le_month.transform([month])[0],
            "customer_return_rate": data.customer_return_rate
        }])

        prob = model1.predict_proba(input_df)[:, 1][0]
        print("🔍 Model input:", input_df)
        return {"return_probability": float(round(prob, 2))}

    except Exception as e:
        return {"error": str(e)}



# ================== MODEL 2 ==================
model2 = joblib.load("backend/model/routing_model.joblib")
le_reason = joblib.load("backend/model/reason_encoder.joblib")
le_route = joblib.load("backend/model/route_encoder.joblib")

valid_reasons = [
    "Changed mind",
    "Damaged",
    "Late delivery",
    "No longer needed",
    "Quality not as expected",
    "Wrong Item"
]
fallback_reason = "Changed mind"

class RouteInput(BaseModel):
    return_reason: str
    delivery_distance: float

@app.post("/predict_route")
def predict_route(data: RouteInput):
    reason = data.return_reason
    if reason not in valid_reasons:
        reason = fallback_reason

    try:
        reason_encoded = le_reason.transform([reason])[0]
        input_df = pd.DataFrame([[reason_encoded, data.delivery_distance]],
                                columns=["reason_encoded", "delivery_distance"])
        route_encoded = model2.predict(input_df)[0]
        route_label = le_route.inverse_transform([route_encoded])[0]
        return {"predicted_route": route_label}
    except Exception as e:
        return {"error": str(e)}


# ============ RUN LOCALLY ============
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
