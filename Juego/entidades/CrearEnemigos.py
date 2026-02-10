from random import *
import pygame
import math

pygame.init()

class enemigos:
    
    def __init__(self, imagen, enemigo_x, enemigo_y):
        self.imagen = imagen
        #self.numero = numero
        self.enemigo_x = enemigo_x
        self.enemigo_y = enemigo_y
        self.MoverEnemigo_x = 0.3
        self.MoverEnemigo_y = 20
        self.vivo = True
        
    def movimiento (self):
        if  self.enemigo_x >= 736:
            self.MoverEnemigo_x = -0.3
            self.enemigo_y += self.MoverEnemigo_y
            
        if self.enemigo_x <= 0:
            self.MoverEnemigo_x = 0.3
            self.enemigo_y += self.MoverEnemigo_y
        
        self.enemigo_x += self.MoverEnemigo_x
        
    def imprimir (self, pantalla):
        pantalla.blit(self.imagen, (self.enemigo_x, self.enemigo_y))

    def colicion (self, x, y):
        distancia = math.sqrt(math.pow(self.enemigo_x - x, 2) + math.pow(self.enemigo_y - y, 2))
        return distancia < 32
    
    def revivir (self, x, y):
        self.enemigo_x = x
        self.enemigo_y = y
        self.vivo = True
        
    def fin_juego (self):
        self.enemigo_y = 1000


