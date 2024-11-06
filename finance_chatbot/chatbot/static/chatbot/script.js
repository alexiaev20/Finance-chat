function submitChatForm(event) {
    event.preventDefault(); // Impede o recarregamento da página
    const formData = new FormData(event.target);

    fetch(event.target.action, {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest', // Requisição AJAX
            'X-CSRFToken': getCookie('csrftoken')
        }
    })
    .then(response => response.json())
    .then(data => {
        const chatContent = document.querySelector('.chat-content');

        // Exibe a mensagem do usuário com ícone
        const userMessage = document.createElement('p');
        userMessage.classList.add('user-m');
        userMessage.innerHTML = `<span class="icon">👤</span> <strong>Você:</strong> ${formData.get("user_input")}`;
        chatContent.appendChild(userMessage);

        // Exibe a resposta do chatbot com ícone
        const botResponse = document.createElement('p');
        botResponse.classList.add('bot-m');
        botResponse.innerHTML = `<span class="icon">🤖</span> <strong>Chatbot:</strong> ${data.response}`;
        chatContent.appendChild(botResponse);

        // Exibe as opções novamente, se existirem
        if (data.options) {
            const optionsMessage = document.createElement('p');
            optionsMessage.classList.add('bot-m');
            optionsMessage.innerHTML = `<span class="icon">🤖</span> ${data.options.replace(/\n/g, '<br>')}`;
            chatContent.appendChild(optionsMessage);
        }

        // Limpa o campo de entrada após o envio
        event.target.user_input.value = '';
        chatContent.scrollTop = chatContent.scrollHeight; // Rola o chat para a parte inferior
    })
    .catch(error => console.error('Erro:', error));
}


function getCookie(name) {
    // Retorna o valor do cookie pelo nome
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function toggleChat() {
    // Alterna a visibilidade do chat
    const chatBox = document.getElementById("chat-box");
    chatBox.style.display = (chatBox.style.display === "none" || chatBox.style.display === "") ? "block" : "none";
}

function toggleLogin() {
    const loginBox = document.getElementById("login-box");
    const overlay = document.getElementById("overlay");

    if (loginBox.style.display === "none" || loginBox.style.display === "") {
        loginBox.style.display = "block";
        overlay.style.display = "block";
    } else {
        loginBox.style.display = "none";
        overlay.style.display = "none";
    }
}

function openSignup() {
    toggleLogin(); // Fecha o modal de login
    const signupBox = document.getElementById("signup-box");
    signupBox.style.display = "block"; // Abre o modal de cadastro
}

function toggleSignup() {
    const signupBox = document.getElementById("signup-box");
    const overlay = document.getElementById("overlay");
    signupBox.style.display = "none"; // Fecha o modal de cadastro
    overlay.style.display = "none"; // Fecha o overlay
}
