from django.urls import path
from .views import index, chatbot_view
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', index, name='index'),  # Página inicial do chatbot
    path('chat/', chatbot_view, name='chatbot_view'),  # Rota para o processamento do chatbot
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
