from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Data model
class beefit_user_exercise_plan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    exercise = db.Column(db.String(255), nullable=False)
    reps = db.Column(db.Integer, nullable=False)
    sets = db.Column(db.Integer, nullable=False)
    date = db.Column(db.String(255), nullable=False)
    
class beefit_user_fitness_data(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    calories_burned = db.Column(db.Integer, nullable=False)
    calories_intake = db.Column(db.Integer, nullable=False)
    steps = db.Columns(db.Integer, nullable=False)
    date = db.Column(db.Integer, nullable=False)
