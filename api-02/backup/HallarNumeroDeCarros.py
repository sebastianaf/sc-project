import csv
from collections import defaultdict
from random import random
from statistics import mean
from scipy.stats import chisquare
import numpy 
import math
import matplotlib.pyplot as plt
import random
import simpy
from datetime import datetime

columns = defaultdict(list) # each value in each column is appended to a list
mex = 'mex_clean.csv'
bogota ='bog_clean.csv'
quito = 'uio_clean.csv'
with open(quito) as f:
    reader = csv.DictReader(f) # read rows into a dictionary format
    for row in reader: # read a row as {column1: value1, column2: value2,...}
        contador = 0
        for (k,v) in row.items(): # go over each column name and value 
            columns[k].append(v) # append the value into the appropriate list
                                 # based on column name k
            contador= contador +1
            if(contador>3000):
                break

duracionViaje = columns['trip_duration']
duraciones = []
for i in range(len(duracionViaje)):
    duracionViaje[i]= int(duracionViaje[i])

    if(duracionViaje[i]<18000 and duracionViaje[i]>60):
        duraciones.append(duracionViaje[i])

        
cantidadDatos = len(duraciones)

maximo = max(duraciones)
minimo = min(duraciones)


arrayLlegadas  = []
for x in range (cantidadDatos):
    tiempoDeLlega = random.expovariate(1/1374.516540139466)
    arrayLlegadas.append(tiempoDeLlega)

print(len(arrayLlegadas))

tiemposDeLLegado = columns['pickup_datetime']
tiemposDeLLegado.sort()
deltaTime= []

for x in range (len(tiemposDeLLegado)):
    
    if(x==len(tiemposDeLLegado)-1):
        break

    d1 = datetime.strptime(tiemposDeLLegado[x], "%Y-%m-%d %H:%M:%S")
    d2 = datetime.strptime(tiemposDeLLegado[x+1], "%Y-%m-%d %H:%M:%S")
    delta = d2 - d1
    if(d1.day==d2.day and d1.month==d2.month and d1.year==d2.year ):
        deltaTime.append(delta.seconds)
    

#Datos de la simulación
SEMILLA = 40 #Semilla generador
CLIENTES = 2500 #Vamos a simular 10 clientes
#Variables desempeño
COLA = 0
MAX_COLA = 0
ESPERA_CLIENTES = numpy.array([])

def llegada(env, numero, contador):

    for i in range(numero):
        c = cliente(env, 'Pasajero %02d' % i, contador)
        env.process(c)
        tiempo_llegada = random.expovariate(1/mean(deltaTime))
        yield env.timeout(tiempo_llegada) #Yield retorna un objeto iterable
        
        
def cliente(env, nombre, servidor):
    #El cliente llega y se va cuando es atendido
    llegada = env.now
    print('%7.2f'%(env.now)," Llega el pasajero ", nombre)
    global COLA
    global MAX_COLA 
    global ESPERA_CLIENTES   
    #Atendemos a los clientes (retorno del yield)
    #With ejecuta un iterador sin importar si hay excepciones o no
    with servidor.request() as req:
		
                #Hacemos la espera hasta que sea atendido el cliente
                COLA += 1
                if COLA > MAX_COLA:
                   MAX_COLA = COLA
		
                #print("Tamaño cola", COLA)
                results = yield req	
                COLA = COLA - 1
                espera = env.now - llegada
                ESPERA_CLIENTES = numpy.append(ESPERA_CLIENTES, espera)
		
                print('%7.2f'%(env.now), " El pasajero ",nombre," espera a ser atendido ",espera)
		
                tiempo_atencion = random.expovariate(1/mean(duraciones))
                yield env.timeout(tiempo_atencion)
		
                print('%7.2f'%(env.now), " Sale el pasajero ",nombre)
    
                    
#Inicio de la simulación

#print('Sala de cine')
#random.seed(SEMILLA)
#env = simpy.Environment()

#Inicio del proceso y ejecución
#servidor = simpy.Resource(env, capacity=1)
#servidor = simpy.Resource(env, capacity=4) # ASN Salen
#env.process(llegada(env, CLIENTES, servidor))
#env.run()

print("Cola máxima ",MAX_COLA)

def prueba(capacity):
	global ESPERA_CLIENTES
	iteracion0 = True

	while numpy.mean(ESPERA_CLIENTES)> 0 or iteracion0:
		ESPERA_CLIENTES = numpy.array([])
		iteracion0 = False
		capacity = capacity + 1
		
		#Inicio de la simulación

		print('Pasajeros de aplicaciones de taxi')
		random.seed(SEMILLA)
		env = simpy.Environment()

		#Inicio del proceso y ejecución
		servidor = simpy.Resource(env, capacity)
		env.process(llegada(env, CLIENTES, servidor))
		env.run()
	return capacity

print("Carros necesarios para tiempo 0 de espera: ",prueba(0))
print('Tiempo de llegada promedio: '+str(mean(deltaTime)), 'Tiempo de atencion promedio: '+str(mean(duraciones)))