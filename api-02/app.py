#!flask/bin/python
from flask_cors import CORS, cross_origin
from flask import Flask, request
from simulateQueue import executeQueue
from simulateCars import executeCars

ALLOWED_EXTENSIONS = {'dzn'}

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

cities = ['uio_clean.csv','bog_clean.csv','mex_clean.csv']

@app.route('/queue', methods=['POST'])
@cross_origin() 
def queue():
    try:
        city = cities[int(request.args.get('city'))]
        cars = int(request.args.get('cars'))
        clients = int(request.args.get('clients'))
        seed = int(request.args.get('seed'))
        out = executeQueue(city,cars,clients,seed)
        return out
    except :
        return "Error al correr la simulación"

@app.route('/cars', methods=['POST'])
@cross_origin() 
def cars():
    try:
        city = cities[int(request.args.get('city'))]
        clients = int(request.args.get('clients'))
        seed = int(request.args.get('seed'))
        out = executeCars(city,clients,seed)
        return out
    except :
        return "Error al correr la simulación"



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5002)
