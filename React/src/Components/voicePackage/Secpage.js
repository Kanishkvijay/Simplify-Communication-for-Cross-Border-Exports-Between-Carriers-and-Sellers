import React, { useState, useEffect } from "react";
import "./Secpage.css"; // Import your CSS file

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [language, setLanguage] = useState("en-US");

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = 
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const speechRecognition = new SpeechRecognition();
      speechRecognition.continuous = true;
      speechRecognition.interimResults = true;
      speechRecognition.lang = language;

      speechRecognition.onstart = () => {
        setIsListening(true);
      };

      speechRecognition.onresult = (event) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          }
        }
        setText((prevText) => prevText + finalTranscript);
      };

      speechRecognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
      };

      speechRecognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(speechRecognition);
    } else {
      console.error("Web Speech API is not supported in this browser.");
    }
  }, [language]);

  const startListening = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  return (
    <div className="speech-to-text-container">
      <select onChange={(e) => setLanguage(e.target.value)} value={language}>
        <option value="en-US">English (US)</option>
        <option value="hi-IN">Hindi</option>
        <option value="ta-IN">Tamil</option>
      </select>
      <button onClick={isListening ? stopListening : startListening}>
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
      <p>{text}</p>
    </div>
  );
};

const Secpage = () => {
  return (
    <div>
      <header>
        <div id="headcont" className="container-fluid pt-3 pb-3">
          <div className="row h-100 d-flex justify-content-center align-items-center">
            <div
              id="head1"
              className="col-6 d-flex justify-content-start align-items-start"
            >
              TICKET TROVE AI
            </div>
            <div className="col-6 d-flex justify-content-end align-items-end"></div>
          </div>
        </div>
      </header>

      <main>
        <div className="container-fluid">
          <div className="row">
            <div id="mainbg" className="col">
              {/* Speech to Text component */}
              <SpeechToText />

              {/* "Ask me anything" input box */}
              <input
                type="search"
                className="ask-input"
                placeholder="Ask me anything..."
              />
              <i id="mic-btn" className="fa-solid fa-microphone"></i>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Secpage;
