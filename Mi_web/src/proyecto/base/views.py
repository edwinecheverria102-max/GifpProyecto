from django.shortcuts import render, redirect
from django.contrib.auth import logout, login
from django.shortcuts import redirect
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.views.generic.edit import CreateView, UpdateView, DeleteView, FormView
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import LoginView
from django.views import View

from django.urls import reverse_lazy
from .models import tarea

class logeo(LoginView):
    template_name = "base/login.html"
    #field = '__all__'
    redirect_authenticated_user = True
    
    def get_success_url(self):
        return reverse_lazy('pendientes')
    
class paginaregistro(FormView):
    template_name = 'base/registro.html'
    form_class = UserCreationForm
    redirect_authenticated_user = True
    success_url = reverse_lazy('pendientes')
    
    def form_valid(self, form):
        usuario = form.save()
        if usuario is not None:
            login(self.request, usuario)
        return super(paginaregistro, self).form_valid(form)
    
    def get(self, *args, **kwargs):
        if self.request.user.is_authenticated:
            return redirect('pendientes')
        return super(paginaregistro, self).get(*args, **kwargs)

class customlogoutview(View):
    def get(self, request):
        logout(request)
        return redirect('login')

class listaPendientes(LoginRequiredMixin, ListView):
    model = tarea
    context_object_name = 'pendientes'
    template_name = 'base/tarea_list.html'
    
    def get_queryset(self):
    
        queryset = tarea.objects.filter(usuario=self.request.user)
        
        valor_buscado = self.request.GET.get('area-buscar') or ''
        if valor_buscado:
            queryset = queryset.filter(titulo__icontains=valor_buscado)
        return queryset  
    
    def get_context_data(self, **kwargs):
        
        context = super().get_context_data(**kwargs)
        
        context['count'] = context['pendientes'].filter(completo=False).count()
        
        context['valor_buscado'] = self.request.GET.get('area-buscar') or ''
        
        return context

class detalletarea(LoginRequiredMixin, DetailView):
    model = tarea
    template_name = 'base/tarea_detail.html'
    
class creartarea(LoginRequiredMixin, CreateView):
    model = tarea
    fields = ['titulo', 'descripcion', 'completo']
    template_name = 'base/tarea_form.html'
    success_url = reverse_lazy('pendientes')
    
    def form_valid(self, form):
        form.instance.usuario = self.request.user
        return super(creartarea, self).form_valid(form)
    
    
class editartarea(LoginRequiredMixin, UpdateView):
    model = tarea
    fields = ['titulo', 'descripcion', 'completo']
    template_name = 'base/tarea_form.html'
    success_url = reverse_lazy('pendientes')
    
class eliminartarea(LoginRequiredMixin, DeleteView):
    model = tarea
    context_object_name = 'tarea'
    success_url = reverse_lazy('pendientes')