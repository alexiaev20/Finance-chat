from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt

def index(request):
    return render(request, 'chatbot/index.html')

@csrf_exempt  
def chatbot_view(request):
    options = """
Chatbot: Escolha uma opção:
Digite "1" para Consultoria Financeira
Digite "2" para Análise de Investimentos
Digite "3" para Educação Financeira
Digite "4" para Suporte de Orçamento Pessoal
"""
    
    response = ""
    if request.method == "POST":
        option = request.POST.get("user_input")
        if option == '1':
            response = "A consultoria financeira ajuda a planejar e organizar suas finanças, proporcionando uma visão clara de como alcançar seus objetivos econômicos."
        elif option == '2':
            response = "A análise de investimentos ajuda a identificar as melhores opções para aplicar seu dinheiro, avaliando riscos e retornos."
        elif option == '3':
            response = "A educação financeira capacita as pessoas a entenderem melhor como gerenciar suas finanças e tomar decisões inteligentes sobre dinheiro."
        elif option == '4':
            response = "O suporte de orçamento pessoal oferece estratégias para gerenciar sua renda e despesas, garantindo que você possa economizar e gastar de maneira equilibrada."
        else:
            response = "Opção inválida. Por favor, escolha um número de 1 a 4."

        # Retorna a resposta e as opções formatadas
        return JsonResponse({
            "response": response,
            "options": options.strip()  # Remove espaços em branco desnecessários
        })

    return render(request, 'chatbot/index.html')

@csrf_exempt  
def signup(request):
    if request.method == 'POST':
        username = request.POST['name']  # Nome do usuário
        email = request.POST['email']
        password = request.POST['password']
        
        # Criação do usuário
        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()
        
        messages.success(request, 'Cadastro realizado com sucesso!')
        return redirect('login')  # Redirecionar para a página de login

    return render(request, 'signup.html')