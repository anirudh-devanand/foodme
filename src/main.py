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
from wtforms import StringField, PasswordField, SubmitField, EmailField
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

from flask import Flask
from flask_cors import CORS

from flask_wtf.csrf import CSRFProtect

import jwt
from gridfs import GridFS



app = Flask(__name__)
CORS(app)
# CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

app.config['SECRET_KEY'] = 'thisisasecretkey'

# csrf = CSRFProtect(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"  # Optional: specify login route




global_user = None
# login_manager.login_view = 'login'  # Replace 'login' with the route name of your login view


# Initialize Bcrypt
bcrypt = Bcrypt(app)

uri = "mongodb+srv://admin:2dCwq8zbbwmFZgBV@foodmecluster.y6mdk.mongodb.net/?retryWrites=true&w=majority&appName=FoodMeCluster"

# Create a new client and connect to the server
mongo = MongoClient(uri, server_api=ServerApi('1'))


fs = GridFS(mongo.db) # Set up gridFs

# Send a ping to confirm a successful connection
try:
    mongo.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)


# def create_jwt_token(username):
#     # expiration = datetime.utcnow() + timedelta(hours=1)  # Token valid for 1 hour
#     expiration = datetime.datetime.now(datetime.UTC) + timedelta(hours=1)  # Token valid for 1 hour
#     payload = {
#         'sub': username,  # subject of the token (usually user identifier)
#         'exp': expiration,  # expiration time
#         'iat': datetime.datetime.now(datetime.UTC),  # issued at time
#     }
#     token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
#     return token


class User(UserMixin):
    def __init__(self, id, fullname, username, email, password, address):
        # MongoDB provides _id, but we can use it as id in our class
        self.id = str(id)  # Store the MongoDB _id as string, which is usually in ObjectId format
        self.fullname = fullname
        self.username = username
        self.email = email
        self.password = password
        self.address = address
        
        
        
    def save(self):
        user = {
            'username': self.username,
            'email': self.email,
            'password': self.password,
            'fullname': self.fullname,
            "address": self.address
        }
        # MongoDB will automatically assign an _id when inserting the document
        result = mongo.db.users.insert_one(user)
        print(f"RESULT: {result}")
        # Update the User object with the MongoDB _id
        self.id = str(result.inserted_id)
    
    @staticmethod
    def get(id):
        # Use ObjectId to fetch the user by MongoDB's _id
        user_data = mongo.db.users.find_one({"_id": ObjectId(id)})
        if user_data:
            return User(user_data["_id"], user_data["username"], user_data["address"],user_data["email"], user_data["password"], user_data["fullname"])
        return None
    

    def get_id(self):
        return self.id
    
    @classmethod
    def get_by_username(cls, username):
        user = mongo.db.users.find_one({'username': username})
        if user:
            return cls(id=user['_id'], username=user['username'], address=user["address"], email=user['email'], password=user['password'], fullname=user["fullname"])
        return None
    
    @classmethod
    def get_by_email(cls, email):
        user = mongo.db.users.find_one({'email': email})
        if user:
            return cls(id=user['_id'], username=user['username'], email=user['email'],address=user["address"], password=user['password'], fullname=user["fullname"])
            # return cls(id=user['_id'], email=user['email'], password=user['password'], fullname=user["fullname"])
        return None
    
    def to_dict(self):
        return {
            'id': self.id,
            'fullname': self.fullname,
            'username': self.username,
            'email': self.email,
            'address': self.address
        }
    


# Load the user by user_id
@login_manager.user_loader
def load_user(id):
    return User.get(id)

# Dish class
class Dish:
    def __init__(self, id, expiry, name, description, price, seller_id, country, seller_name, location):
        self.id = str(id) 
        self.expiry = expiry
        self.name = name
        self.description = description
        self.price = price
        self.seller_id = seller_id
        self.country = country
        self.seller_name = seller_name
        self.location = location
        # self.image = image

    def save(self):
        dish = {
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'seller_id': self.seller_id,
            'expiry': self.expiry,
            'country': self.country,
            'seller_name': self.seller_name,
            'location': self.location
        }
        # MongoDB will automatically assign an _id when inserting the document
        result = mongo.db.dishes.insert_one(dish)
        # Update the User object with the MongoDB _id
        self.id = str(result.inserted_id)

        @staticmethod
        def get(id):
            item_data = mongo.db.dishes.find_one({"_id": ObjectId(id)})
            if item_data:
                # image_id = item_data.get('image')
                # image = None
                # if image_id:
                #     image = fs.get(image_id).read()  # Retrieve image from GridFS
                return Dish(item_data["_id"], item_data["name"], item_data["expiry"], item_data["description"], item_data["price"], item_data["seller_id"], item_data["country"], item_data["seller_name"], item_data["location"], image)
            return None
        
        def get_id(self):
            return self.id

# Registration Form
class RegisterForm(FlaskForm):
    username = StringField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Username"})
    fullname = StringField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Jane Doe"})
    password = PasswordField(validators=[InputRequired(), Length(min=8, max=20)], render_kw={"placeholder": "Password"})
    email = StringField(validators=[InputRequired(), Length(min=8, max=100)], render_kw={"placeholder": "jane.doe@email.com"})
    address = StringField(validators=[InputRequired(), Length(min=8, max=100)], render_kw={"placeholder": "2205 Lower Mall, V6T 0A5"})
    
    submit = SubmitField('Register')

    def validate_username(self, username):
        existing_user_username = mongo.db.users.find_one({'username': username.data})
        if existing_user_username:
            raise ValidationError('That username already exists. Please choose a different one.')

# Login Form
class LoginForm(FlaskForm):
    # username = StringField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Username"})
    password = PasswordField(validators=[InputRequired(), Length(min=8, max=20)], render_kw={"placeholder": "Password"})
    email = EmailField(validators=[InputRequired(), Length(max=50)],render_kw={"placeholder": "Email"})
    submit = SubmitField('Login')

# Registration Route
@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm()
    print(f"FORM: {form.data}")
    if form.data["submit"]:
        print("IN THIS")
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')  # Hash password before saving
        new_user = User(id=None, username=form.username.data, password=hashed_password, email=form.email.data, fullname=form.fullname.data, address = form.address.data)
        new_user.save()
        print("Registered")
        return "something"
    return "something"

# Login Route
@app.route('/login', methods=['GET', 'POST'])
def login():
    # print("reached login")
    form = LoginForm()
    print(form.data)
    # print(form.email.data)
    # if form.validate_on_submit():
    if form.data["submit"]:
        # user = User.get_by_username(form.username.data)
        user = User.get_by_email(form.email.data)
        print(f"USER: {user}")
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            print("reached login")
            login_user(user)
            print(current_user.id)
            token = "loggedIn"; 
            global_user = user
            return jsonify({"token": token, "user": user.to_dict()})
    return jsonify({'message': 'Invalid credentials'}), 401

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
# @app.route('/updateItem', methods=['POST'])
# @login_required
# def updateItem():
#     data = request.get_json()

#     item_name = data['itemData']['name']  # Extract the actual item name
#     item_country = data['itemData']['country']
#     item_description = data['itemData']['description']
#     item_price = data['itemData']['price']
#     item_id = data['itemData']['id']
#     item_expiry = data['itemData']['expiry']

#     if not item_name:
#         return jsonify({'error': 'Missing item name'}), 400
    

#     mongo.db.dishes.update_one({'_id' : item_id},{"$set":{'name': item_name,
#             'description': item_description,
#             'price': item_price,
#             'expiry': item_expiry,
#             'country': item_country,}})
    
#     return jsonify({'message': 'Item updated successfully!', 'item': {'name': item_name, 'expiry': item_expiry}})

@app.route('/deleteItem', methods=['POST'])
# @login_required
def deleteItem():
    data = request.get_json()
    item_id = data['_id']

    query = {"_id" : item_id}

    print(mongo.db.dishes.find_one({"name": "dfs"}))

    print(item_id)
    # itemToDel = mongo.db.dishes.find_one({"_id": item_id})
    itemToDel = mongo.db.dishes.find_one({"_id": ObjectId(item_id)})
    # print(itemToDel)

    result = mongo.db.dishes.delete_one(itemToDel)
    

    if result.deleted_count > 0:
        print("Successfully deleted item")
    else:
        print("No document deleted")

    return jsonify({'message': 'Item deleted successfully!', 'item': {'_id': item_id}})

# # Seller adds/posts new dish
# @app.route('/addItem', methods=['POST'])
# # @login_required
# def addItem():
#     print("IN HERE!!!!!!!!!")
#     # print(f"Logged in: {current_user.id}")
#     data = request.get_json()

#     print(data)

#     print(f"User: {data['currentUser']}")

#     item_name = data['name']  # Extract the actual item name
#     item_country = data['country']
#     item_descr = data['description']
#     item_price = data['price']
#     user_name = data['currentUser']; 

#     # user_id = currentUser.id  # Use the logged-in user's ID
#     user_id = mongo.db.users.find_one({'username': user_name})    

#     # if not item_name:
#     #     return jsonify({'error': 'Missing item name'}), 400

#     expiry = datetime.now() + timedelta(hours=6)
#     new_dish = Dish(id=None, expiry=expiry, name=item_name, description= item_descr, price= item_price, seller_name=user_name, seller_id=user_id, country=item_country)
#     new_dish.save()
#     # print(f"Dish saved: {new_dish}")

#     # return jsonify({'message': 'Item added successfully!', 'item': {'name': item_name, 'expiry': expiry}})


# @app.route('/marketplace', methods=['GET'])
# # @login_required
# def showList():
#     dishes = mongo.db.dishes.find()  # Retrieve all documents from the 'dishes' collection
#     dishes_list = []
    
#     for dish in dishes:
#         # Serialize each dish to include its fields and convert ObjectId to string
#         dish['_id'] = str(dish['_id'])
#         dishes_list.append(dish)
    
#     return jsonify(dishes_list), 200


# Seller adds/posts new dish
@app.route('/addItem', methods=['POST'])
def addItem():
    print("IN HERE!!!!!!!!!")
    # data = request.form()  # Use request.form for multipart form-data
    data = request.get_json()  # Use request.form for multipart form-data
    # img = request.form()

    print(f"DATA: {data}")
    item_name = data['name']
    item_country = data['country']
    item_descr = data['description']
    item_price = data['price']
    item_location = data['location']
    user_name = data['currentUser']['username']
    
    # # Retrieve the image file from the request
    # image = request.files.get('image')  # Assume image is sent as part of form-data
    # image_data = image.read() if image else None

    user_id = mongo.db.users.find_one({'username': user_name})["_id"]

    expiry = datetime.now() + timedelta(hours=6)
    new_dish = Dish(id=None, expiry=expiry, location=item_location, name=item_name, description=item_descr, price=item_price, seller_name=user_name, seller_id=user_id, country=item_country)
    new_dish.save()

    print(f"Dish saved: {new_dish}")

    return jsonify({'message': 'Item added successfully!', 'item': {'name': item_name, 'expiry': expiry}})
    # return jsonify({'message': 'Item added successfully!', 'item': {'name': "sd", 'expiry': "2"}})


# Helper function to recursively convert ObjectId to string in the document
def convert_objectid(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    elif isinstance(obj, dict):
        return {key: convert_objectid(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [convert_objectid(item) for item in obj]
    return obj

@app.route('/marketplace', methods=['GET'])
# def showList():
#     dishes = mongo.db.dishes.find()  # Retrieve all documents from the 'dishes' collection
#     dishes_list = []

#     for dish in dishes:
#         # Retrieve image from GridFS if exists
#         image_id = dish.get('image')
#         image = None
#         if image_id:
#             image = fs.get(image_id).read()  # Retrieve image from GridFS
#             dish['image'] = image.decode('utf-8')  # Optionally, encode the image as base64
        
#         dishes_list.append(dish)

#     return jsonify(dishes_list), 200

# def showList():
#     dishes = mongo.db.dishes.find()  # Retrieve all documents from the 'dishes' collection
#     dishes_list = []
    
#     for dish in dishes:
#         # Serialize each dish to include its fields and convert ObjectId to string
#         dish['_id'] = str(dish['_id'])
#         dishes_list.append(dish)

    
#     print(f"DISHES: {dishes_list}")
    
#     return jsonify(dishes_list), 200

def showList():
    dishes = mongo.db.dishes.find()  # Retrieve all documents from the 'dishes' collection
    dishes_list = []
    
    for dish in dishes:
        # Serialize each dish to include its fields and convert ObjectId to string
        dish['_id'] = str(dish['_id'])
        # Recursively convert any ObjectId to string in the dish document
        dish = convert_objectid(dish)
        dishes_list.append(dish)

    # for dish in dishes:
    #     dish["seller_name"] = dish["seller_name"]["username"]
    
    print(f"PRINT: {dishes_list[0]}")
    
    return jsonify(dishes_list), 200

@app.route('/searchFilter', methods=['POST'])
@login_required
def searchFilter():
    # Get request data
    data = request.json  # Assuming the request is JSON
    username = data['username']
    price = data['price']
    country = data['country']
    distance = data['distance']

    query = {}

    # Add filters based on price and country
    if price:
        query['price'] = {'$lte': price}
    
    if country:
        query['country'] = country

    # Retrieve the user's address
    user = mongo.db.users.find_one({'username': username})
    if not user:
        return jsonify({'error': 'User not found'}), 404

    consumer_addr = user['address']  # Assume this is a valid address string

    # Fetch dishes based on price and country filters
    results = mongo.db.dishes.find(query)

    filtered_results = []
    for dish in results:
        dish_address = dish["address"]  # The address in the dish document

        # Apply the distance filter if specified
        if distance:
            try:
                # Assuming get_distance returns a numeric value for distance in kilometers
                dish_distance = map.get_distance(consumer_addr, dish_address)

                # Check if the calculated distance is within the specified limit
                if dish_distance <= distance:
                    filtered_results.append(dish)
            except Exception as e:
                print(f"Error calculating distance: {str(e)}")
                continue  # Skip if there's an error with distance calculation
        else:
            # If no distance filter is applied, add the dish directly
            filtered_results.append(dish)

    # Return the filtered results as JSON
    if filtered_results:
        return jsonify(filtered_results), 200
    else:
        return jsonify({'message': 'No dishes found matching the filters.'}), 404
    
@app.route('/sellerList', methods=['GET', 'POST'])
def sellerList():
    print("REACHED HERE!!!!!!")
    data = request.get_json()
    print(data)
    username = data['username']
    user = mongo.db.users.find_one({'username': username})
    print(f"USER IS: {user}")
    dishes_list = []
    dishes = mongo.db.dishes.find({'seller_id': ObjectId(user["_id"])})
    print(f"DISHES IS: {dishes}")

    for dish in dishes:
        # Serialize each dish to include its fields and convert ObjectId to string
        dish['_id'] = str(dish['_id'])
        # Recursively convert any ObjectId to string in the dish document
        dish = convert_objectid(dish)
        dishes_list.append(dish)

    

    # for dish in dishes:
    #     dish["seller_name"] = dish["seller_name"]["username"]
    
    print(f"PRINT: {dishes_list}")
    
    return jsonify(dishes_list), 200






if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)



