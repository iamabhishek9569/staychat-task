from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from datetime import datetime
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb+srv://admin:staychat123@staychat-cluster.kyhvd7q.mongodb.net/staychat"
mongo = PyMongo(app)

@app.route("/items", methods=["POST"])
def upsert_item():
    data = request.json
    mongo.db.items.update_one(
        {"name": data["name"]},
        {"$set": {
            "description": data["description"],
            "timestamp": datetime.now()
        }},
        upsert=True
    )
    return jsonify({"message": "Saved"})

@app.route("/items", methods=["GET"])
def get_items():
    items = []
    for item in mongo.db.items.find():
        item["_id"] = str(item["_id"])
        items.append(item)
    return jsonify(items)

@app.route("/items/<id>", methods=["DELETE"])
def delete_item(id):
    mongo.db.items.delete_one({"_id": ObjectId(id)})
    return jsonify({"message": "Deleted"})

if __name__ == "__main__":
    app.run(debug=True)
