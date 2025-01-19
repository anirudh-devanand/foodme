# from flask import Flask, render_template, url_for, redirect
# from flask_sqlalchemy import SQLAlchemy
# from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
# from flask_wtf import FlaskForm
# from wtforms import StringField, PasswordField, SubmitField
# from wtforms.validators import InputRequired, Length, ValidationError
# from flask_bcrypt import Bcrypt
# from flask import Flask, request, jsonify
# import google.generativeai as genai
# from datetime import datetime, timedelta
# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart


# from pymongo.mongo_client import MongoClient
# from pymongo.server_api import ServerApi


# from flask import Flask, render_template, request, jsonify
# from werkzeug.security import generate_password_hash
# from datetime import datetime
# from flask_pymongo import PyMongo

# app = Flask(__name__)

# # app.config["MONGO_URI"] = "mongodb+srv://admin:2dCwq8zbbwmFZgBV@foodmecluster.y6mdk.mongodb.net/?retryWrites=true&w=majority&appName=FoodMeCluster"
# # DATABASE stuff 

# app.config['SECRET_KEY'] = 'thisisasecretkey'

# # Assuming mongo is already initialized in the Flask app
# # mongo = PyMongo(app)


# uri = "mongodb+srv://admin:2dCwq8zbbwmFZgBV@foodmecluster.y6mdk.mongodb.net/?retryWrites=true&w=majority&appName=FoodMeCluster"

# # Create a new client and connect to the server
# mongo = MongoClient(uri, server_api=ServerApi('1'))

# # Send a ping to confirm a successful connection
# try:
#     mongo.admin.command('ping')
#     print("Pinged your deployment. You successfully connected to MongoDB!")
# except Exception as e:
#     print(e)

# class User:
#     def __init__(self, id, username, email, password):
#         self.id = id
#         self.username = username
#         self.email = email
#         self.password = generate_password_hash(password) 

#     def save(self):
#         user = {
#             'username': self.username,
#             'email': self.email,
#             'password': self.password,  
#         }
#         mongo.db.users.insert_one(user)  # Insert the user into the 'users' collection

# class Dish:
#     def __init__(self, id, expiry, name, description, price, seller, country):
#         self.id = id
#         self.expiry = expiry
#         self.name = name
#         self.description = description
#         self.price = price
#         self.seller = seller  # Seller should be a reference to the User object (user ID)
#         self.country = country

#     def save(self):
#         dish = {
#             'name': self.name,
#             'description': self.description,
#             'price': self.price,
#             'seller': self.seller,  # Reference to User ID
#             'expiry': self.expiry,
#             'country': self.country
#         }
#         mongo.db.dishes.insert_one(dish)  # Insert the dish into the 'dishes' collection


# ######################################################################


# # REGISTRATION LOGIN stuff
# # Registration Form
# class RegisterForm(FlaskForm):
#     username = StringField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Username"})
#     password = PasswordField(validators=[InputRequired(), Length(min=8, max=20)], render_kw={"placeholder": "Password"})
#     email = StringField(validators=[InputRequired(), Length(min=8, max=100)], render_kw={"placeholder": "Email"})
#     submit = SubmitField('Register')

#     def validate_username(self, username):
#         existing_user_username = User.query.filter_by(username=username.data).first()
#         if existing_user_username:
#             raise ValidationError('That username already exists. Please choose a different one.')


# # Login Form
# class LoginForm(FlaskForm):
#     username = StringField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Username"})
#     password = PasswordField(validators=[InputRequired(), Length(min=8, max=20)], render_kw={"placeholder": "Password"})
#     submit = SubmitField('Login')



# @app.route('/register', methods=['GET', 'POST'])
# def register():
#     form = RegisterForm()
#     # if form.validate_on_submit():
#     #     existing_user_username = None
#     # if(mongo.db.users):
#     #     existing_user_username = mongo.db.users.find_one({'username': form.username.data})
#         # if not existing_user_username:
#     password = form.password.data  # Decode hash
#     new_user = User(id = 1, username=form.username.data, password= password, email=form.email.data)
#     new_user.save()
#             # return redirect(url_for('login'))
#     return render_template('register.html', form=form)


# @app.route('/login', methods=['GET', 'POST'])
# def login():

#     form = LoginForm()
#     if form.validate_on_submit():
#         user = User.query.filter_by(username=form.username.data).first()
#         # hash_entered_password = generate_password_hash(form.password.data)
#         if user and user.password == generate_password_hash(form.password.data):
#             login_user(user)
#             return redirect(url_for('dashboard'))
#     return render_template('login.html', form=form)


# @app.route('/logout', methods=['GET', 'POST'])
# @login_required
# def logout():
#     logout_user()
#     return redirect(url_for('login'))


# @app.route('/dashboard', methods=['GET', 'POST'])
# @login_required
# def dashboard():
#     user_items = Dish.query.filter_by(user_id=current_user.id).all()  # Retrieve items for the current user
#     return render_template('dashboard.html', email=current_user.email, user_items=user_items)


# #########################################################################


# @app.route('/')
# def home():
#     return render_template('index.html')



# # Seller adds/posts new dish
# @app.route('/addItem', methods=['POST'])
# @login_required
# def addItem():
#     data = request.get_json()

#     item_name = data['itemData']['name']  # Extract the actual item name
#     item_country = data['itemData']['country']
#     # item_name = data.get('item_name')  # Extract 'item_name' from JSON
#     print(item_name)
#     user_id = current_user.id  # Use the logged-in user's ID

#     if not item_name:
#         return jsonify({'error': 'Missing item name'}), 400

#     # print(f"{item_name}: {getExpiry(item_name)}")
#     expiry = datetime.now() + timedelta(hours = 6)
#     # # Create and save the new item in the database
#     new_dish = Dish(user_id = user_id, item_name = item_name, expiry = expiry, item_country = item_country)
#     new_dish.save()

#     return jsonify({'message': 'Item added successfully!', 'item': {'user_id': user_id, 'name': item_name, 'expiry': expiry}})

# # @app.route('\showList', methods=['GET'])
# # @login_required
# # def showList():



# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, debug=True)













# # class User:
# #     id = db.Column(db.Integer, primary_key=True)
# #     username = db.Column(db.String(20), nullable=False, unique=True)
# #     password = db.Column(db.String(80), nullable=False)
# #     email = db.Column(db.String(100), nullable=False)
# #     items_by_user = db.relationship('Dish', backref='owner', lazy=True)  # Relationship with Item model

# # class Dish: 
# #     id = db.Column(db.Integer, primary_key=True)
# #     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
# #     item_name = db.Column(db.String(100), nullable=False)
# #     item_description = db.Column(db.String(200), nullable=True)
# #     expiry = db.Column(db.DateTime, nullable=True)
# #     item_country = db.Column(db.String(100), nullable = True)


from flask import Flask, render_template, url_for, redirect, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_login import LoginManager, UserMixin, login_user, current_user, login_required
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError
from flask_bcrypt import Bcrypt
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask_pymongo import PyMongo
from datetime import datetime, timedelta
from bson import ObjectId
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi



app = Flask(__name__)
app.config['SECRET_KEY'] = 'thisisasecretkey'

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"  # Optional: specify login route


# Initialize Bcrypt
bcrypt = Bcrypt(app)

uri = "mongodb+srv://admin:2dCwq8zbbwmFZgBV@foodmecluster.y6mdk.mongodb.net/?retryWrites=true&w=majority&appName=FoodMeCluster"

# Create a new client and connect to the server
mongo = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    mongo.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)



class User(UserMixin):
    def __init__(self, id, username, email, password):
        # MongoDB provides _id, but we can use it as id in our class
        self.id = str(id)  # Store the MongoDB _id as string, which is usually in ObjectId format
        self.username = username
        self.email = email
        self.password = password
        
        
    def save(self):
        user = {
            'username': self.username,
            'email': self.email,
            'password': self.password,
        }
        # MongoDB will automatically assign an _id when inserting the document
        result = mongo.db.users.insert_one(user)
        # Update the User object with the MongoDB _id
        self.id = str(result.inserted_id)
    
    @staticmethod
    def get(id):
        # Use ObjectId to fetch the user by MongoDB's _id
        user_data = mongo.db.users.find_one({"_id": ObjectId(id)})
        if user_data:
            return User(user_data["_id"], user_data["username"], user_data["email"], user_data["password"])
        return None
    

    def get_id(self):
        return self.id
    
    @classmethod
    def get_by_username(cls, username):
        user = mongo.db.users.find_one({'username': username})
        if user:
            return cls(id=user['_id'], username=user['username'], email=user['email'], password=user['password'])
        return None
    
# Load the user by user_id
@login_manager.user_loader
def load_user(id):
    return User.get(id)

# Dish class
class Dish:
    def __init__(self, id, expiry, name, description, price, seller_id, country, seller_name):
        self.id = id
        self.expiry = expiry
        self.name = name
        self.description = description
        self.price = price
        self.seller_id = seller_id
        self.country = country
        self.seller_name = seller_name

    def save(self):
        dish = {
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'seller_id': self.seller_id,
            'expiry': self.expiry,
            'country': self.country,
            'seller_name': self.seller_name
        }
        mongo.db.dishes.insert_one(dish)

# Registration Form
class RegisterForm(FlaskForm):
    username = StringField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Username"})
    password = PasswordField(validators=[InputRequired(), Length(min=8, max=20)], render_kw={"placeholder": "Password"})
    email = StringField(validators=[InputRequired(), Length(min=8, max=100)], render_kw={"placeholder": "Email"})
    submit = SubmitField('Register')

    def validate_username(self, username):
        existing_user_username = mongo.db.users.find_one({'username': username.data})
        if existing_user_username:
            raise ValidationError('That username already exists. Please choose a different one.')

# Login Form
class LoginForm(FlaskForm):
    username = StringField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Username"})
    password = PasswordField(validators=[InputRequired(), Length(min=8, max=20)], render_kw={"placeholder": "Password"})
    submit = SubmitField('Login')

# Registration Route
@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')  # Hash password before saving
        new_user = User(id=None, username=form.username.data, password=hashed_password, email=form.email.data)
        new_user.save()
        return redirect(url_for('login'))
    return render_template('register.html', form=form)

# Login Route
@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.get_by_username(form.username.data)
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user)
            return redirect(url_for('dashboard'))
    return render_template('login.html', form=form)

# Logout Route
@app.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

# Dashboard Route
@app.route('/dashboard', methods=['GET', 'POST'])
@login_required
def dashboard():
    user_items = mongo.db.dishes.find({'seller_id': current_user.id})  # Retrieve items for the current user
    return render_template('dashboard.html', email=current_user.email, user_items=user_items)

# Home Route
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
    user_id = current_user.id  # Use the logged-in user's ID
    user_name = mongo.db.users.find_one({'id': user_id})    

    if not item_name:
        return jsonify({'error': 'Missing item name'}), 400

    expiry = datetime.now() + timedelta(hours=6)
    new_dish = Dish(id=None, expiry=expiry, name=item_name, description='', price=0, seller_name=user_name, seller_id=user_id, country=item_country)
    new_dish.save()

    return jsonify({'message': 'Item added successfully!', 'item': {'name': item_name, 'expiry': expiry}})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)



