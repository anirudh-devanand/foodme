from flask import Flask, render_template, url_for, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError
from flask_bcrypt import Bcrypt
from flask import Flask, request, jsonify
import google.generativeai as genai
from datetime import datetime, timedelta
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


from flask import Flask, render_template, request, jsonify
from werkzeug.security import generate_password_hash
from datetime import datetime
from flask_pymongo import PyMongo

app = Flask(__name__)


# DATABASE stuff 

uri = "mongodb+srv://admin:<db_password>@foodmecluster.y6mdk.mongodb.net/?retryWrites=true&w=majority&appName=FoodMeCluster"

# Create a new client and connect to the server
db = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    db.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)


# Assuming mongo is already initialized in the Flask app
mongo = PyMongo(app)


class User:
    def __init__(self, id, username, email, password, balance=0):
        self.id = id
        self.username = username
        self.email = email
        self.password = generate_password_hash(password) 
        self.balance = balance  # User balance in the marketplace

    def save(self):
        user = {
            'username': self.username,
            'email': self.email,
            'password': self.password,  
            'balance': self.balance
        }
        mongo.db.users.insert_one(user)  # Insert the user into the 'users' collection

class Dish:
    def __init__(self, id, expiry, name, description, price, seller, country):
        self.id = id
        self.expiry = expiry
        self.name = name
        self.description = description
        self.price = price
        self.seller = seller  # Seller should be a reference to the User object (user ID)
        self.country = country

    def save(self):
        dish = {
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'seller': self.seller,  # Reference to User ID
            'expiry': self.expiry,
            'country': self.country
        }
        mongo.db.dishes.insert_one(dish)  # Insert the dish into the 'dishes' collection


######################################################################


# REGISTRATION LOGIN stuff
# Registration Form
class RegisterForm(FlaskForm):
    username = StringField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Username"})
    password = PasswordField(validators=[InputRequired(), Length(min=8, max=20)], render_kw={"placeholder": "Password"})
    email = StringField(validators=[InputRequired(), Length(min=8, max=100)], render_kw={"placeholder": "Email"})
    submit = SubmitField('Register')

    def validate_username(self, username):
        existing_user_username = User.query.filter_by(username=username.data).first()
        if existing_user_username:
            raise ValidationError('That username already exists. Please choose a different one.')


# Login Form
class LoginForm(FlaskForm):
    username = StringField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Username"})
    password = PasswordField(validators=[InputRequired(), Length(min=8, max=20)], render_kw={"placeholder": "Password"})
    submit = SubmitField('Login')



@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')  # Decode hash
        new_user = User(username=form.username.data, password=hashed_password, email=form.email.data)
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('login'))
    return render_template('register.html', form=form)

#########################################################################


@app.route('/')
def home():
    return render_template('index.html')



# Seller adds/posts new dish
@app.route('/addItem', methods=['POST'])
@login_required
def addItem():
    data = request.get_json()

    item_name = data['itemData']['name']  # Extract the actual item name
    item_country = data['itemData']['country']
    # item_name = data.get('item_name')  # Extract 'item_name' from JSON
    print(item_name)
    user_id = current_user.id  # Use the logged-in user's ID

    if not item_name:
        return jsonify({'error': 'Missing item name'}), 400

    # print(f"{item_name}: {getExpiry(item_name)}")
    expiry = datetime.now() + timedelta(hours = 6)
    # # Create and save the new item in the database
    new_dish = Dish(user_id = user_id, item_name = item_name, expiry = expiry, item_country = item_country)
    new_dish.save()

    return jsonify({'message': 'Item added successfully!', 'item': {'user_id': user_id, 'name': item_name, 'expiry': expiry}})




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)













# class User:
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(20), nullable=False, unique=True)
#     password = db.Column(db.String(80), nullable=False)
#     email = db.Column(db.String(100), nullable=False)
#     items_by_user = db.relationship('Dish', backref='owner', lazy=True)  # Relationship with Item model

# class Dish: 
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
#     item_name = db.Column(db.String(100), nullable=False)
#     item_description = db.Column(db.String(200), nullable=True)
#     expiry = db.Column(db.DateTime, nullable=True)
#     item_country = db.Column(db.String(100), nullable = True)
