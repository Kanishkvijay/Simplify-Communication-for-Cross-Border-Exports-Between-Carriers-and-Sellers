import React, { useState, useEffect } from "react";
import "./voicetotext.css"
const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [language, setLanguage] = useState("en-US");

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const speechRecognition = new SpeechRecognition();
      speechRecognition.continuous = true;
      speechRecognition.interimResults = false; // We only need final results
      speechRecognition.lang = language;

      speechRecognition.onstart = () => {
        setIsListening(true);
      };

      speechRecognition.onresult = async (event) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          finalTranscript += event.results[i][0].transcript + " ";
        }

        // Set the original text
        setText(finalTranscript);

        // Only translate if the language is Hindi or Tamil
        if (language === "hi-IN" || language === "ta-IN") {
          const translated = await translateToEnglish(finalTranscript);
          setTranslatedText(translated);
        } else {
          // If it's English, no translation needed
          setTranslatedText(finalTranscript);
        }
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

  // Function to translate text to English using LibreTranslate API
  const translateToEnglish = async (text) => {
    try {
      const response = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: text,
          source: "auto", // Detect source language automatically
          target: "en", // Always translate to English
        }),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("Translation error response:", errorDetails);
        throw new Error("Failed to translate text");
      }

      const data = await response.json();
      return data.translatedText || text; // Return translated text or original text
    } catch (error) {
      console.error("Translation error:", error);
      return text; // Return the original text in case of an error
    }
  };

  return (
    <div>
      <h1>Speech to Text (With Translation)</h1>
      <select onChange={(e) => setLanguage(e.target.value)} value={language}>
        <option value="en-US">English (US)</option>
        <option value="hi-IN">Hindi</option>
        <option value="ta-IN">Tamil</option>
      </select>
      <button onClick={isListening ? stopListening : startListening}>
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
      <p>Original Text: {text}</p>
      <p>Translated Text: {translatedText}</p>
    </div>
  );
};

export default SpeechToText;
