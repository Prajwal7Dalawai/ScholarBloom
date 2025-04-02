import React, { useState } from "react";
import "./ChatWidget.css"; // Ensure this CSS file exists for styling

const GeminiChat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); // Store chat history
  const [isOpen, setIsOpen] = useState(false); // Toggle chat window

  const sendMessage = async () => {
    if (!input.trim()) return;

    const API_KEY = "AIzaSyChS7YHXsZT3fLoEbPlapUmovGP_hCLd2k"; // Replace with a valid API key
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

    const requestBody = {
      contents: [{ role: "user", parts: [{ text: input }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 200 }
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });

      const data = await res.json();
      let fullResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

      // Remove Markdown formatting like **, *, and new lines
      let cleanedResponse = fullResponse
        .replace(/\*\*/g, "") // Remove bold (**text**)
        .replace(/\*/g, "")   // Remove italic (*text*)
        .split("\n")          // Split into lines
        .slice(0, 4)          // Limit to 4 lines
        .join("\n");          // Join back

      // Update message history
      setMessages([...messages, { sender: "user", text: input }, { sender: "bot", text: cleanedResponse }]);
      setInput(""); // Clear input field
    } catch (error) {
      setMessages([...messages, { sender: "bot", text: "Error fetching response" }]);
    }
  };

  return (
    <div className="chat-container">
      {/* Floating Chat Button */}
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        💬 
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h2>Scholar-Bloom Chatbot</h2>
            <button className="close-btn" onClick={() => setIsOpen(false)}>❌ </button>
          </div>
          
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Input Field at Bottom */}
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about jobs, scholarships, or AI challenges..."
            />
            <button className="send-btn" onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiChat;
