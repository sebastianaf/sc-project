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
import dateutil.parser as parser
from datetime import datetime

columns = defaultdict(list) # each value in each column is appended to a list
bogota ='bog_clean.csv'
quito = 'uio_clean.csv'
with open(quito) as f:
    reader = csv.DictReader(f) # read rows into a dictionary format
    for row in reader: # read a row as {column1: value1, column2: value2,...}
        for (k,v) in row.items(): # go over each column name and value 
            columns[k].append(v) # append the value into the appropriate list
                                 # based on column name k

tiemposDeLLegado = columns['pickup_datetime']
tiemposDeLLegado.sort()
deltaTime= []

for x in range (len(tiemposDeLLegado)):
    
    if(x==len(tiemposDeLLegado)-1):
        break

    d1 = datetime.strptime(tiemposDeLLegado[x], "%Y-%m-%d %H:%M:%S")
    d2 = datetime.strptime(tiemposDeLLegado[x+1], "%Y-%m-%d %H:%M:%S")
    delta = d2 - d1
    if(d1.day==d2.day and (d1.month==12 and d2.month==12) and d1.year==d2.year ):
        deltaTime.append(delta.seconds)
    


def clasificar(duraciones):
  cantidadDatos = len(duraciones)
  numClases = math.ceil( math.sqrt(cantidadDatos))
  intervalo = max(duraciones)/numClases
  ##print(intervalo)
  fo = [0]*numClases
  for i in range(0,cantidadDatos):
    
      
    posicion = math.floor((duraciones[i]/intervalo)-0.00001)
    fo[posicion]= fo[posicion]+1
    
  return fo 
print(mean(deltaTime))
plt.plot(clasificar(deltaTime))
