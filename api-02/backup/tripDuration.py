import csv
from collections import defaultdict
from random import random
from statistics import mean
from scipy.stats import chisquare
import numpy as np
import math
import matplotlib.pyplot as plt
import random
import simpy

columns = defaultdict(list) # each value in each column is appended to a list
bogota ='bog_clean.csv'
quito = 'uio_clean.csv'
with open(quito) as f:
    reader = csv.DictReader(f) # read rows into a dictionary format
    for row in reader: # read a row as {column1: value1, column2: value2,...}
        for (k,v) in row.items(): # go over each column name and value 
            columns[k].append(v) # append the value into the appropriate list
                                 # based on column name k

duracionViaje = columns['trip_duration']
duraciones = []
for i in range(len(duracionViaje)):
    duracionViaje[i]= int(duracionViaje[i])

    if(duracionViaje[i]<18000 and duracionViaje[i]>60):
        duraciones.append(duracionViaje[i])

print(mean(duraciones))
cantidadDatos = len(duraciones)
arrayLlegadas  = []
