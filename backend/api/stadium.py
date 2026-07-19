from fastapi import APIRouter
import json
import os

router = APIRouter()

# Load mock data
data_path = os.path.join(os.path.dirname(__file__), "../data/mock.json")
with open(data_path, "r", encoding="utf-8") as f:
    stadium_data = json.load(f)

@router.get("/dashboard")
def get_dashboard_stats():
    return stadium_data.get("dashboard", {})

@router.get("/map")
def get_map_markers():
    return stadium_data.get("map_markers", [])

@router.get("/ticker")
def get_ticker_items():
    return stadium_data.get("ticker", [])
