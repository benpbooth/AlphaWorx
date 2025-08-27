// UNA Chatbot - Inject into any website via dev tools
(function() {
  // Prevent multiple instances
  if (document.getElementById('una-chatbot-container')) {
    console.log('UNA Chatbot already exists');
    return;
  }

  // Session management
  const getSessionId = () => {
    let sessionId = localStorage.getItem('una-chat-session');
    if (!sessionId) {
      sessionId = 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('una-chat-session', sessionId);
    }
    return sessionId;
  };

  // State management
  let isOpen = false;
  let messages = [
    {
      id: '1',
      text: "Hey there! I'm your UNA virtual agent. What can I help you with today?",
      isUser: false,
      timestamp: new Date()
    }
  ];
  let isLoading = false;

  // Webhook URL
  const WEBHOOK_URL = 'https://benpbooth.app.n8n.cloud/webhook/d55958cb-535a-4200-82da-e4c87aa9c77e/chat';

  // Create chatbot HTML
  const createChatbotHTML = () => {
    return `
      <div id="una-chatbot-container" style="
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      ">
        <!-- Chat Window -->
        <div id="una-chat-window" style="
          display: none;
          width: 320px;
          height: 400px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border: 1px solid #e5e7eb;
          margin-bottom: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        ">
          <!-- Header -->
          <div id="una-chat-header" style="
            background: #2563eb;
            color: white;
            padding: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          ">
            <div style="display: flex; align-items: center;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span style="font-weight: 600;">Chat with UNA</span>
            </div>
            <button id="una-close-btn" style="
              background: none;
              border: none;
              color: white;
              cursor: pointer;
              padding: 4px;
              border-radius: 4px;
              opacity: 0.8;
              transition: opacity 0.2s;
            " onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.8'">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- Messages -->
          <div id="una-messages" style="
            flex: 1;
            overflow-y: auto;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 16px;
          ">
            <!-- Messages will be inserted here -->
          </div>

          <!-- Input -->
          <div style="
            padding: 16px;
            border-top: 1px solid #e5e7eb;
            display: flex;
            gap: 8px;
          ">
            <input id="una-message-input" type="text" placeholder="How can we help you today?" style="
              flex: 1;
              padding: 8px 12px;
              border: 1px solid #d1d5db;
              border-radius: 8px;
              outline: none;
              font-size: 14px;
            " />
            <button id="una-send-btn" style="
              background: #2563eb;
              color: white;
              border: none;
              border-radius: 8px;
              padding: 8px 12px;
              cursor: pointer;
              transition: background-color 0.2s;
            " onmouseover="this.style.backgroundColor='#1d4ed8'" onmouseout="this.style.backgroundColor='#2563eb'">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
              </svg>
            </button>
          </div>
        </div>

        <!-- Chat Button -->
        <button id="una-chat-btn" style="
          width: 56px;
          height: 56px;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        " onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'">
          <svg id="una-chat-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <svg id="una-close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `;
  };

  // Format timestamp
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Render messages
  const renderMessages = () => {
    const messagesContainer = document.getElementById('una-messages');
    messagesContainer.innerHTML = '';

    messages.forEach(message => {
      const messageDiv = document.createElement('div');
      messageDiv.style.display = 'flex';
      messageDiv.style.justifyContent = message.isUser ? 'flex-end' : 'flex-start';

      const messageContent = document.createElement('div');
      messageContent.style.maxWidth = '240px';
      messageContent.style.padding = '8px 12px';
      messageContent.style.borderRadius = '12px';
      messageContent.style.fontSize = '14px';
      messageContent.style.lineHeight = '1.4';

      if (message.isUser) {
        messageContent.style.background = '#2563eb';
        messageContent.style.color = 'white';
      } else {
        messageContent.style.background = '#f3f4f6';
        messageContent.style.color = '#374151';
      }

      messageContent.innerHTML = `
        <p style="margin: 0 0 4px 0;">${message.text}</p>
        <p style="margin: 0; font-size: 12px; opacity: 0.7;">${formatTime(message.timestamp)}</p>
      `;

      messageDiv.appendChild(messageContent);
      messagesContainer.appendChild(messageDiv);
    });

    // Add loading indicator if needed
    if (isLoading) {
      const loadingDiv = document.createElement('div');
      loadingDiv.style.display = 'flex';
      loadingDiv.style.justifyContent = 'flex-start';

      const loadingContent = document.createElement('div');
      loadingContent.style.background = '#f3f4f6';
      loadingContent.style.padding = '8px 12px';
      loadingContent.style.borderRadius = '12px';
      loadingContent.innerHTML = `
        <div style="display: flex; gap: 4px;">
          <div style="width: 8px; height: 8px; background: #9ca3af; border-radius: 50%; animation: bounce 1.4s ease-in-out infinite both;"></div>
          <div style="width: 8px; height: 8px; background: #9ca3af; border-radius: 50%; animation: bounce 1.4s ease-in-out 0.16s infinite both;"></div>
          <div style="width: 8px; height: 8px; background: #9ca3af; border-radius: 50%; animation: bounce 1.4s ease-in-out 0.32s infinite both;"></div>
        </div>
      `;

      loadingDiv.appendChild(loadingContent);
      messagesContainer.appendChild(loadingDiv);
    }

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  // Send message
  const sendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    // Add user message
    messages.push({
      id: Date.now().toString(),
      text: text,
      isUser: true,
      timestamp: new Date()
    });

    isLoading = true;
    renderMessages();

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({
          chatInput: text,
          sessionId: getSessionId(),
          timestamp: new Date().toISOString(),
          user: 'web-visitor',
          source: 'chatbot'
        })
      });

      if (response.ok) {
        let data;
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
          const jsonData = await response.json();
          data = jsonData.output || jsonData.message || jsonData.response || jsonData.text || jsonData.reply || JSON.stringify(jsonData);
        } else {
          data = await response.text();
        }
        
        messages.push({
          id: (Date.now() + 1).toString(),
          text: data || 'Thank you for your message. We\'ll get back to you soon!',
          isUser: false,
          timestamp: new Date()
        });
      } else {
        const errorText = await response.text();
        let errorMessage = 'Sorry, there was an error sending your message. Please try again.';
        
        if (response.status === 500 && errorText.includes('Error in workflow')) {
          errorMessage = 'The chatbot service is currently experiencing issues. Please try again later or contact support.';
        }
        
        messages.push({
          id: (Date.now() + 1).toString(),
          text: errorMessage,
          isUser: false,
          timestamp: new Date()
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      messages.push({
        id: (Date.now() + 1).toString(),
        text: 'Connection error. Please check your internet connection and try again.',
        isUser: false,
        timestamp: new Date()
      });
    } finally {
      isLoading = false;
      renderMessages();
    }
  };

  // Toggle chat window
  const toggleChat = () => {
    const chatWindow = document.getElementById('una-chat-window');
    const chatIcon = document.getElementById('una-chat-icon');
    const closeIcon = document.getElementById('una-close-icon');

    isOpen = !isOpen;

    if (isOpen) {
      chatWindow.style.display = 'flex';
      chatIcon.style.display = 'none';
      closeIcon.style.display = 'block';
      renderMessages();
      document.getElementById('una-message-input').focus();
    } else {
      chatWindow.style.display = 'none';
      chatIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    }
  };

  // Add bounce animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes bounce {
      0%, 80%, 100% { 
        transform: scale(0);
      } 
      40% { 
        transform: scale(1.0);
      }
    }
  `;
  document.head.appendChild(style);

  // Insert chatbot into page
  document.body.insertAdjacentHTML('beforeend', createChatbotHTML());

  // Add event listeners
  document.getElementById('una-chat-btn').addEventListener('click', toggleChat);
  document.getElementById('una-close-btn').addEventListener('click', toggleChat);

  document.getElementById('una-send-btn').addEventListener('click', () => {
    const input = document.getElementById('una-message-input');
    const text = input.value;
    input.value = '';
    sendMessage(text);
  });

  document.getElementById('una-message-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const text = e.target.value;
      e.target.value = '';
      sendMessage(text);
    }
  });

  console.log('UNA Chatbot injected successfully! 🎉');
})();