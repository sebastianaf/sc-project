# -*- coding: utf-8 -*-
#Instalar https://simpy.readthedocs.io/en/latest/simpy_intro/installation.html
#Ejemplos https://simpy.readthedocs.io/en/latest/examples/index.html
import random
import simpy
import numpy

#Datos de la simulación
SEMILLA = 40 #Semilla generador
CLIENTES = 100 #Vamos a simular 10 clientes
LLEGADA_CLIENTES = [0, 120] #Clientes llegan cada 10 segundos en una distribución uniforme
ATENCION_CLIENTES = [40, 100] #Clientes son atendidos en una distribucion

#Variables desempeño
COLA = 0
MAX_COLA = 0
ESPERA_CLIENTES = numpy.array([])

def llegada(env, numero, contador):

    for i in range(numero):
        c = cliente(env, 'Cliente %02d' % i, contador)
        env.process(c)
        tiempo_llegada = random.uniform(LLEGADA_CLIENTES[0],LLEGADA_CLIENTES[1])
        yield env.timeout(tiempo_llegada) #Yield retorna un objeto iterable
        
        
def cliente(env, nombre, servidor):
    #El cliente llega y se va cuando es atendido
    llegada = env.now
    print('%7.2f'%(env.now)," Llega el cliente ", nombre)
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
		
                print('%7.2f'%(env.now), " El cliente ",nombre," espera a ser atendido ",espera)
		
                tiempo_atencion = random.uniform(ATENCION_CLIENTES[0],ATENCION_CLIENTES[1])
                yield env.timeout(tiempo_atencion)
		
                print('%7.2f'%(env.now), " Sale el cliente ",nombre)
    
                    
#Inicio de la simulación

print('Sala de cine')
random.seed(SEMILLA)
env = simpy.Environment()

#Inicio del proceso y ejecución
servidor = simpy.Resource(env, capacity=1)
env.process(llegada(env, CLIENTES, servidor))
env.run()

print("Cola máxima ",MAX_COLA)
print("Tiempo promedio de espera ",'%7.2f'%(numpy.mean(ESPERA_CLIENTES)))
