const chatBox = document.getElementById('chat-box');
const userMessageInput = document.getElementById('user-message');

function addMessage(message, isUser) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('chat-message');
  if (isUser) {
    messageElement.classList.add('user-message');
  } else {
    messageElement.classList.add('bot-message');
  }
  messageElement.textContent = message;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;  
}

function sendMessage() {
  const userMessage = userMessageInput.value.trim();
  if (userMessage !== '') {
    addMessage(userMessage, true);
    userMessageInput.value = '';
     
  }
}


function receiveBotResponse(botResponse) {
  addMessage(botResponse, false);
}

 
setTimeout(() => {
  receiveBotResponse("Hello! How can I help you today?");
}, 1000);
function sendMessage() {
    const userMessage = userMessageInput.value.trim();
    if (userMessage !== '') {
      addMessage(userMessage, true);
      userMessageInput.value = '';
      showTypingIndicator();
  
       
      fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
      })
      .then(response => response.json())
      .then(data => {
        const botResponse = data.response;
        receiveBotResponse(botResponse);
      })
      .catch(error => {
        removeTypingIndicator();
        addMessage('Oops! Something went wrong. Please try again.', false);
        console.error('Error:', error);
      });
    }
  }
  
