from config import db

class Question(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    question = db.Column(db.String(120),nullable=False)
    answer = db.Column(db.String(120),nullable=False)#TODO - Set this up to account for potential games with one question linked to several answers or one answer working for multiple questions (look into a bridge table)

    def get_json(self):
        return {
            "id":self.id,
            "question":self.question,
            "answer":self.answer
            }   