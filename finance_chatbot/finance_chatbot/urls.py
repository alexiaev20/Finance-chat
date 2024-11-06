from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('chatbot/', include('chatbot.urls')),  # Inclui as rotas do app 'chatbot'
    path('', RedirectView.as_view(url='/chatbot/')),  # Redireciona a URL raiz para '/chatbot/'
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
