import { useState } from "react";
import "./Homepage.css";

function Bort() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <div className="chat-bubble">
      {/* Chat Bubble */}
      <div className="chat-bubble" onClick={toggleChat}>
        <img
          src="https://img.icons8.com/ios/50/000000/chat.png"
          alt="Chat Icon"
          className="chat-icon"
        />
      </div>

      {/* Chatbot Iframe */}
      {isChatOpen && (
        <div className="chat-window">
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/-XQLvj5LmwFhtgoO39hYF"
            width="97%"
            style={{ height: "80%", minHeight: "390px" }}
            frameBorder="0"
            title="Chatbot"
          ></iframe>
        </div>
      )}

      {/* Chatbot Integration (Embedded) */}
      <div className="chatbot-container">
        <script>
          {`
            window.embeddedChatbotConfig = {
              chatbotId: "-XQLvj5LmwFhtgoO39hYF",
              domain: "www.chatbase.co",
            };
          `}
        </script>
        <script
          src="https://www.chatbase.co/embed.min.js"
          chatbotId="-XQLvj5LmwFhtgoO39hYF"
          domain="www.chatbase.co"
          defer
        ></script>
      </div>
    </div>
  );
}

export default Bort;
