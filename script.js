// Send on Enter key
document.getElementById("user-input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") sendMessage();
});

// Send on Button click
document.getElementById("send-button").addEventListener("click", sendMessage);

// Toggle Dark Mode
document.getElementById("dark-mode-toggle").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});

// Show Chat History
document.getElementById("history-button").addEventListener("click", function () {
  const history = JSON.parse(localStorage.getItem("chatHistory")) || [];
  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML = "";

  // Show Back button, hide input
  document.querySelector(".back-button-container").style.display = "flex";
  document.querySelector(".input-section").style.display = "none";

  if (history.length === 0) {
    chatBox.innerHTML = `<div class="bot-message">🤖 No chat history found.</div>`;
    return;
  }

  history.forEach(item => {
    const userDiv = document.createElement("div");
    userDiv.className = "user-message";
    userDiv.innerText = "👤 " + item.user;
    chatBox.appendChild(userDiv);

    const botDiv = document.createElement("div");
    botDiv.className = "bot-message";
    botDiv.innerText = item.bot;
    chatBox.appendChild(botDiv);
  });

  const clearBtn = document.createElement("button");
  clearBtn.innerText = "🧹 Clear History";
  clearBtn.className = "clear-history-btn";
  clearBtn.onclick = function () {
    localStorage.removeItem("chatHistory");
    chatBox.innerHTML = `<div class="bot-message">🤖 Chat history cleared.</div>`;
  };
  chatBox.appendChild(clearBtn);
});

// Back to Chat
document.getElementById("back-button").addEventListener("click", function () {
  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML = `<div class="bot-message">🤖 Hello! I'm RuleBot. Ask me anything.</div>`;
  document.querySelector(".input-section").style.display = "flex";
  document.querySelector(".back-button-container").style.display = "none";
});

// Main Message Sending
function sendMessage() {
  const inputField = document.getElementById("user-input");
  const message = inputField.value.trim();
  const chatBox = document.getElementById("chat-box");

  if (message === "") return;

  const userDiv = document.createElement("div");
  userDiv.className = "user-message";
  userDiv.innerText = "👤 " + message;
  chatBox.appendChild(userDiv);

  const reply = getBotReply(message.toLowerCase());
  const botDiv = document.createElement("div");
  botDiv.className = "bot-message";
  botDiv.innerText = reply;
  chatBox.appendChild(botDiv);

  storeChat(message, reply);

  inputField.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Store Chat History
function storeChat(user, bot) {
  const history = JSON.parse(localStorage.getItem("chatHistory")) || [];
  history.push({ user, bot });
  localStorage.setItem("chatHistory", JSON.stringify(history));
}

// Rule-based Reply System
function getBotReply(message) {
  let reply = "🤖 I'm not sure how to respond to that. Try asking something else?";

  if (["hi", "hello", "hey"].some(greet => message.includes(greet))) {
    reply = "🤖 Hey there! 👋 How can I help you today?";
  } else if (message.includes("how are you")) {
    reply = "🤖 I'm running smoothly, thanks for asking! How about you?";
  } else if (message.includes("i am fine") || message.includes("i'm good")) {
    reply = "🤖 That's great to hear! 😊";
  } else if (message.includes("thank")) {
    reply = "🤖 You're welcome! 🙌";
  } else if (message.includes("bye")) {
    reply = "🤖 Goodbye! Take care! 👋";
  } else if (message.includes("your name")) {
    reply = "🤖 I'm RuleBot – your friendly assistant!";
  } else if (message.includes("help")) {
    reply = "🤖 I can tell jokes, show time, answer simple questions, or just chat!";
  } else if (message.includes("joke")) {
    reply = "🤖 Why did the computer catch a cold? It left its Windows open!";
  } else if (message.includes("what can you do")) {
    reply = "🤖 I can answer basic questions, tell jokes, and chat with you!";
  } else if (message.includes("date")) {
    reply = `🤖 Today's date is ${new Date().toLocaleDateString()}`;
  } else if (message.includes("time")) {
    reply = `🤖 Current time is ${new Date().toLocaleTimeString()}`;
  } else if (message.includes("weather")) {
    reply = "🤖 I can't fetch live weather yet, but it's always sunny in code-land! ☀️";
  } else if (message.includes("motivate") || message.includes("motivation")) {
    reply = "🤖 Keep pushing forward! Great things take time. 💪";
  } else if (message.includes("study tip")) {
    reply = "🤖 Study in short sessions, take breaks, and teach others to retain better!";
  } else if (message.includes("who created you") || message.includes("developer")) {
    reply = "🤖 I was built by a cool developer learning how chatbots work! 😄";
  } else if (message.includes("love you")) {
    reply = "🤖 Aww! Love you too ❤️ (in a machine-learning way)";
  } else if (message.includes("are you real")) {
    reply = "🤖 As real as ones and zeros can be 🤖";
  } else if (message.includes("open google")) {
    reply = "🤖 You can open Google here: https://www.google.com";
  } else if (message.includes("1 + 1") || message.includes("one plus one")) {
    reply = "🤖 1 + 1 = 2!";
  } else if (message.includes("your age")) {
    reply = "🤖 I'm timeless. I was born the moment you ran this code!";
  } else if (message.includes("bored")) {
    reply = "🤖 Try learning something new or take a quick walk – refresh your mind!";
  } else if (message.includes("tell me about india")) {
    reply = "🤖 India is a diverse country with rich culture, history, and traditions 🇮🇳";
  } else if (message.includes("corona") || message.includes("covid")) {
    reply = "🤖 Stay safe, wear a mask, and sanitize your hands! 🧼😷";
  } else if (message.includes("food")) {
    reply = "🤖 I don't eat, but I hear pizza is pretty awesome! 🍕";
  } else if (message.includes("sleep")) {
    reply = "🤖 Sleep well! Your brain needs rest too 😴";
  }

  return reply;
}
