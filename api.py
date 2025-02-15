from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'feprep'
app.config['MYSQL_PASSWORD'] = 'feprep'
app.config['MYSQL_DB'] = 'feprep_db'

mysql = MySQL(app)

@app.route('/users', methods=['GET'])
def getAllUsers():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT id, username FROM users")
    users = cursor.fetchall()
    cursor.close()

    users_list = [{'id': user[0], 'username': user[1]} for user in users]
    return jsonify(users_list)

@app.route('/users/signup', methods=['POST'])
def signup():
    data = request.json
    username = data['username']
    password = data['password']

    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
    mysql.connection.commit()
    cursor.close()

    return jsonify({'message': 'User created successfully'}), 201
@app.route('/users/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']

    cursor = mysql.connection.cursor()
    cursor.execute("SELECT id, username FROM users WHERE username = %s AND password = %s", (username, password))
    user = cursor.fetchone()
    cursor.close()

    if user:
        return jsonify({'id': user[0], 'username': user[1], 'message': 'Login successful'})
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

if __name__ == '__main__':
    app.run(debug=True)
