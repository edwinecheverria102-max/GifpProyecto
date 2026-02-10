from django.urls import path
from .views import listaPendientes, detalletarea, creartarea, editartarea, eliminartarea, logeo, customlogoutview, paginaregistro
from django.contrib.auth.views import LogoutView

urlpatterns = [
    path('', listaPendientes.as_view(), name = 'pendientes'),
    path('login/', logeo.as_view(), name='login'),
    path('registro/', paginaregistro.as_view(), name = 'registro'),
    path('logout/', customlogoutview.as_view(), name='logout'),
    path('tarea/<int:pk>', detalletarea.as_view(), name = 'tarea'),
    path('crear-tarea/', creartarea.as_view(), name = 'crear-tarea'),
    path('editar-tarea/<int:pk>', editartarea.as_view(), name = 'editar-tarea'),
    path('eliminar-tarea/<int:pk>', eliminartarea.as_view(), name = 'eliminar-tarea')
]
