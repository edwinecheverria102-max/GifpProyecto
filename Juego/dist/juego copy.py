import pygame #libreria para crear un juegol
import math
from entidades import CrearEnemigos
from random import *
from pygame import mixer

def PosicionJugador(x, y):
    interfas.blit(jugador, (x, y))
    
def Posicionlaser(x, y):
    global Existelaser
    Existelaser = True
    interfas.blit(laser, (x+16, y))
    
def coliciones (x1, x2, y1, y2):
    distancia = math.sqrt(math.pow(x2 - x1, 2) + math.pow(y2 - y1, 2))
    
    if distancia <= 32:
        return True
    else:
        return False
    
def puntuacion ():
    numero = 0
    
    while True:
        numero += 1
        yield numero


#inicializar pygame
pygame.init()

#Interfaz
#creacion de la interfaz
interfas = pygame.display.set_mode((800, 600))

#titulo del juego
pygame.display.set_caption("invacion espacial")
#logo del juego
icono = pygame.image.load("juego.png")
pygame.display.set_icon(icono)
#fondo del juego
fondo = pygame.image.load("fondo.png")
#fuente
fuente = pygame.font.Font("freesansbold.ttf", 32)
fin_juego = pygame.font.Font("freesansbold.ttf", 42)
#musica
mixer.music.load("musica_fondo.mp3") #cargar el sonido
mixer.music.set_volume(0.2) #controla el volumen
mixer.music.play(-1) #entra en bucle


#entidades
jugador = pygame.image.load("jugador.png")
jugador_x = 336
jugador_y = 536
MoverJugador_x = 0
MoverJugador_y = 0

img_enemigos = pygame.image.load("enemigo.png")
enemigos = [
    CrearEnemigos.enemigos(img_enemigos, randint(0, 736), randint(0, 300)),
    CrearEnemigos.enemigos(img_enemigos, randint(0, 736), randint(0, 300)),
    CrearEnemigos.enemigos(img_enemigos, randint(0, 736), randint(0, 300)),
    CrearEnemigos.enemigos(img_enemigos, randint(0, 736), randint(0, 300)),
    CrearEnemigos.enemigos(img_enemigos, randint(0, 736), randint(0, 300)),
    CrearEnemigos.enemigos(img_enemigos, randint(0, 736), randint(0, 300))
]

laser = pygame.image.load("laser.png")
laser_x = 0
laser_y = 0
Moverlaser_x = -0.3

Existelaser = False
sumapuntos = 0

puntos = puntuacion()

cerrar = True
while cerrar:
    #darle color a la interfaz
    interfas.blit(fondo, (0,0))
    
    
    #se busca un evento para serrar la interfaz
    for evento in pygame.event.get():
        #evento para salir del juego
        if evento.type == pygame.QUIT:
            cerrar = False
        
        
        #eventos del personaje
        if evento.type == pygame.KEYDOWN:
            
            #eventos de movimiento
            if evento.key == pygame.K_LEFT:
                MoverJugador_x = -0.2
                    
            if evento.key == pygame.K_RIGHT:
                MoverJugador_x = 0.2
                    
            if evento.key == pygame.K_UP:
                MoverJugador_y = -0.2
                    
            if evento.key == pygame.K_DOWN:
                MoverJugador_y = 0.2
                
            #evento para disparar
            if evento.key == pygame.K_SPACE:
                if not Existelaser:
                    laser_y = jugador_y
                    laser_x = jugador_x
                    sonido_laser = mixer.Sound("disparo.mp3")
                    sonido_laser.set_volume(0.2)
                    sonido_laser.play()
                    Posicionlaser(laser_x, laser_y)
                
        if evento.type == pygame.KEYUP:
            if evento.key == pygame.K_UP or evento.key == pygame.K_DOWN:
                MoverJugador_y = 0
            
            if evento.key == pygame.K_LEFT or evento.key == pygame.K_RIGHT:
                MoverJugador_x = 0
    
    
    #limitar personaje
    if jugador_x <= 0:
        jugador_x = 0
    elif jugador_x >= 736:
        jugador_x = 736
        
    if jugador_y <= 0:
        jugador_y = 0
    elif jugador_y >= 536:
        jugador_y = 536
    
    #Mover entidades         
    jugador_x += MoverJugador_x
    jugador_y += MoverJugador_y

    for enemigo in enemigos:
        
        if enemigo.enemigo_y >= 536:
            for e in enemigos:
                #e.fin_juego()
                finla = fin_juego.render(f"fin del juego", True, (255, 255, 255))
                interfas.blit(finla, (60, 200))
        else:
            if enemigo.vivo:
                enemigo.movimiento()
        
            if not enemigo.vivo:
                enemigo.revivir(randint(0, 736), randint(0, 300))           
            
            if Existelaser and enemigo.colicion(laser_x, laser_y):
                enemigo.vivo = False
                Existelaser = False
                sumapuntos += 1
        
            enemigo.imprimir(interfas)
            
    if Existelaser:
        Posicionlaser(laser_x, laser_y)
        laser_y += -0.8
        
        
        if laser_y <= 0:
            Existelaser = False
    
    
    PosicionJugador(jugador_x, jugador_y)
    texto = fuente.render(f"puntaje: {sumapuntos}", True, (255, 255, 255))
    interfas.blit(texto, (10, 10))
    
    
    #actualiza la interfaz
    pygame.display.update()