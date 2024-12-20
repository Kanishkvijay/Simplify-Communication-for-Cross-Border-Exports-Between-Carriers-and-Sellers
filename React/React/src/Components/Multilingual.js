import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faHistory, faCheckCircle, faLanguage, faAddressBook } from "@fortawesome/free-solid-svg-icons";
import "./Multilingual.css";

const Multilingual = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [clientId, setClientId] = useState("");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState("en");
  const [messages, setMessages] = useState([]);
  const chatBoxRef = useRef(null);
  const [socket, setSocket] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const id = prompt("Enter your unique Client ID:") || "guest";
    setClientId(id);

    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/${id}`);
    setSocket(ws);

    ws.onopen = () => console.log("WebSocket connection established");
    ws.onmessage = (event) => {
      const incomingMessage = event.data;
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: incomingMessage, type: "incoming" },
      ]);
    };
    ws.onerror = (error) => console.error("WebSocket error:", error);
    ws.onclose = () => console.log("WebSocket connection closed");

    return () => ws.close();
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!recipient || !message.trim()) {
      alert("Please enter both recipient ID and a message.");
      return;
    }

    const data = { to: recipient, text: message.trim(), lang: language };
    if (socket) {
      socket.send(JSON.stringify(data));
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: `To ${recipient}: ${message}`, type: "outgoing" },
    ]);
    setMessage("");
  };

  return (
    <div id="app4">
      <nav className="navbar">
        <h1 className="navbar-title">CROSSBORDER-EXPORT-CHECKER</h1>
      </nav>
      <div className="contains">
        <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? "X" : "☰"}
          </button>
          <ul className="sidebar-links">
            <li><Link to="/home"><FontAwesomeIcon icon={faHome} /> Home</Link></li>
            <li><Link to="/crossborder"><FontAwesomeIcon icon={faCheckCircle} /> Verification</Link></li>
            <li><Link to="/multilingual"><FontAwesomeIcon icon={faLanguage} /> Multilingual</Link></li>
            <li><Link to="/user_history"><FontAwesomeIcon icon={faHistory} /> PostShipment</Link></li>
            <li><Link to="/contacts"><FontAwesomeIcon icon={faAddressBook} /> Contacts</Link></li>
          </ul>
        </aside>

        <main className="content">
          <div>
            <h1>Real-Time Multi-User Multi-Lingual Chat</h1>
            <div
              id="chat-box"
              ref={chatBoxRef}
              style={{ border: "1px solid black", height: "300px", overflowY: "auto", padding: "10px" }}
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.type}`}
                  style={{
                    margin: "5px 0",
                    padding: "10px",
                    borderRadius: "5px",
                    maxWidth: "60%",
                    alignSelf: msg.type === "incoming" ? "flex-start" : "flex-end",
                    backgroundColor: msg.type === "incoming" ? "#f1f0f0" : "#d1e7dd",
                  }}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="message-form">
              <input
                type="text"
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <input
                type="text"
                placeholder="Recipient ID"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="hi">Hindi</option>
                <option value="zh">Chinese</option>
              </select>
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Multilingual;
