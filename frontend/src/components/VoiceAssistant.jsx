import { useState } from "react";

function VoiceAssistant() {
    const [response, setResponse] = useState("");

    const startListening = () => {
        const recognition = new window.webkitSpeechRecognition();

        recognition.lang = "en-US";
        recognition.start();

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;

            let reply = "";

            if (transcript.toLowerCase().includes("tell me about yourself")) {
                reply =
                    "I am a motivated student passionate about technology and continuous learning.";
            } else if (transcript.toLowerCase().includes("strengths")) {
                reply =
                    "My strengths are adaptability, teamwork, and problem-solving skills.";
            } else {
                reply =
                    "Thank you for your question. I will help you improve your communication skills.";
            }

            setResponse(reply);

            const speech = new SpeechSynthesisUtterance(reply);
            window.speechSynthesis.speak(speech);
        };
    };

    return (
        <div
            style={{
                background: "#1e293b",
                padding: "25px",
                borderRadius: "15px",
                marginTop: "30px",
            }}
        >
            <h2>🎙 AI Voice Assistant</h2>

            <button
                onClick={startListening}
                style={{
                    background: "#3b82f6",
                    color: "white",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "10px",
                    cursor: "pointer",
                }}
            >
                🎤 Start Speaking
            </button>

            <p style={{ marginTop: "20px" }}>
                <strong>AI Response:</strong> {response}
            </p>
        </div>
    );
}

export default VoiceAssistant;