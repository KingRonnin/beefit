from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import beefit_user_exercise_plan, db

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Create db
@app.before_first_request
def create_table():
    db.create_all()
    
# Routes
@app.route('api/records', methods=['GET', 'POST'])
def manage_records():
    if request.method == 'POST':
        data=request.json
        new_record=beefit_user_exercise_plan(
            exercise=data['exercise'],
            reps=data['reps'],
            sets=data['sets'],
            date=data['date'],
        )
        db.session.add(new_record)
        db.session.commit()
        return jsonify({"message": "Record Added"}), 201
    
    # GET all records
    records = beefit_user_exercise_plan.query.all()
    return jsonify([{
        "id": record.id,
        "exercise": record.exercise,
        "reps": record.reps,
        "sets": record.sets,
        "date": record.date,
    } for record in records])

if __name__ == '__main__':
    app.run(debug=True)