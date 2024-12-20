import React, { useState, useEffect } from "react";
import './SpeechToText.css'; // Importing the CSS file

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
    <div className="speech-container">
      <h1>Speech to Text</h1>
      <select onChange={(e) => setLanguage(e.target.value)} value={language}>
        <option value="en-US">English (US)</option>
        <option value="hi-IN">Hindi</option>
        <option value="ta-IN">Tamil</option>
      </select>
      <button onClick={isListening ? stopListening : startListening}>
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
      <p className={text ? "" : "empty"}>
        {text || "Your speech will appear here..."}
      </p>
    </div>
  );
};

export default SpeechToText;
