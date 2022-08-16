# -*- coding: utf-8 -*-
#Instalar https://simpy.readthedocs.io/en/latest/simpy_intro/installation.html
#Ejemplos https://simpy.readthedocs.io/en/latest/examples/index.html
import simpy
import csv
from collections import defaultdict
from random import random
import random
from statistics import mean
import numpy 
from datetime import datetime

columns = defaultdict(list) # each value in each column is appended to a list
duracionViaje = columns['trip_duration']
duraciones = []
deltaTime= []
text = ""

#Variables desempeño
COLA = 0
MAX_COLA = 0
ESPERA_CLIENTES = numpy.array([])

def prepare(city):
    with open(city) as f:
        reader = csv.DictReader(f) # read rows into a dictionary format
        for row in reader: # read a row as {column1: value1, column2: value2,...}
            contador = 0
            for (k,v) in row.items(): # go over each column name and value 
                columns[k].append(v) # append the value into the appropriate list
                                    # based on column name k
                contador= contador +1
                if(contador>3000):
                    break

    for i in range(len(duracionViaje)):
        duracionViaje[i]= int(duracionViaje[i])

        if(duracionViaje[i]<18000 and duracionViaje[i]>60):
            duraciones.append(duracionViaje[i])

            
    cantidadDatos = len(duraciones)

    maximo = max(duraciones)
    minimo = min(duraciones)

    tiemposDeLLegado = columns['pickup_datetime']
    tiemposDeLLegado.sort()

    for x in range (len(tiemposDeLLegado)):
        
        if(x==len(tiemposDeLLegado)-1):
            break

        d1 = datetime.strptime(tiemposDeLLegado[x], "%Y-%m-%d %H:%M:%S")
        d2 = datetime.strptime(tiemposDeLLegado[x+1], "%Y-%m-%d %H:%M:%S")
        delta = d2 - d1
        if(d1.day==d2.day and d1.month==d2.month and d1.year==d2.year ):
            deltaTime.append(delta.seconds)

def llegada(env, numero, contador):

    for i in range(numero):
        c = cliente(env, 'Pasajero %02d' % i, contador)
        env.process(c)
        tiempo_llegada = random.expovariate(1/mean(deltaTime))
        yield env.timeout(tiempo_llegada) #Yield retorna un objeto iterable
        
        
def cliente(env, nombre, servidor):
    #El cliente llega y se va cuando es atendido
    llegada = env.now
    printValue(f"{env.now:.2f}\t\t\tLlega {nombre}")
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
		
                #printValue("Tamaño cola", COLA)
                results = yield req	
                COLA = COLA - 1
                espera = env.now - llegada
                ESPERA_CLIENTES = numpy.append(ESPERA_CLIENTES, espera)
		
                printValue(f"{env.now:.2f}\t\t\t{nombre} en espera {espera:.2f}")
		
                tiempo_atencion = random.expovariate(1/mean(duraciones))
                yield env.timeout(tiempo_atencion)
		
                printValue(f"{env.now:.2f}\t\t\tSale {nombre}" )
    
def printValue(value):
    #print(value)
    global text
    text += f"{value}\n"

def executeQueue(city,cars,clients,seed):
    global text
    text = ""
    prepare(city)
    #Inicio de la simulación
    printValue('--------------- Resultados de simulación ---------------')
    random.seed(seed)
    env = simpy.Environment()

    #Inicio del proceso y ejecución
    servidor = simpy.Resource(env, capacity=cars)
    env.process(llegada(env, clients, servidor))
    env.run()

    printValue(f"\nCola máxima {MAX_COLA}")
    printValue(f"Tiempo promedio de espera {numpy.mean(ESPERA_CLIENTES):.2f}")
    return text

print(executeQueue("uio_clean.csv",4,100,40))
