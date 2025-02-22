from flask import jsonify, request
from config import app, db
from models import Question

# from App.views import views
# def add_views(app):
#     for view in views:
#         app.register_blueprint(view)

@app.route("/questions",methods=["GET"])
def get_questions():

    questions = Question.query.all()
    response = {}
    i = 1
    for q in questions:
        response += {f" Q{i}": q.get_json()}
    r = {"questions":"response"}
    return r


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
