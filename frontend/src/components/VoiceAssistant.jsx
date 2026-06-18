import { useState } from "react";

function VoiceAssistant() {

    const [response, setResponse] = useState("");
    const [listening, setListening] = useState(false);


    const startListening = () => {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;


        if (!SpeechRecognition) {
            alert("Please open in Google Chrome and allow microphone");
            return;
        }


        const recognition = new SpeechRecognition();


        recognition.lang = "en-US";
        recognition.continuous = false;
        recognition.interimResults = false;


        setListening(true);

        setResponse("🎤 Listening...");


        recognition.start();



        recognition.onresult = (event) => {

            const transcript =
                event.results[0][0].transcript;


            let reply = "";


            if (
                transcript
                    .toLowerCase()
                    .includes("tell me about yourself")
            ) {

                reply =
                    "I am a motivated student passionate about technology, learning, and improving my skills.";

            }


            else if (
                transcript
                    .toLowerCase()
                    .includes("strengths")
            ) {

                reply =
                    "My strengths are adaptability, teamwork, communication, and problem solving.";

            }


            else if (
                transcript
                    .toLowerCase()
                    .includes("project")
            ) {

                reply =
                    "I worked on projects where I improved my technical skills and learned real world development.";

            }


            else {

                reply =
                    "Good attempt. Keep speaking confidently and improve your communication skills.";

            }



            setResponse(reply);



            const speech =
                new SpeechSynthesisUtterance(reply);


            speech.lang = "en-US";


            window.speechSynthesis.speak(speech);


        };



        recognition.onerror = () => {

            setResponse(
                "❌ Microphone error. Allow permission."
            );

        };



        recognition.onend = () => {

            setListening(false);

        };


    };




    return (

        <div
            style={{
                background: "#1e293b",
                padding: "25px",
                borderRadius: "15px",
                marginTop: "30px",
                color: "white"
            }}
        >


            <h2>
                🎙 AI Voice Assistant
            </h2>



            <button

                onClick={startListening}

                style={{
                    background: "#3b82f6",
                    color: "white",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "10px",
                    cursor: "pointer"
                }}

            >

                {listening
                    ? "🎤 Listening..."
                    : "🎤 Start Speaking"}

            </button>



            <p style={{ marginTop: "20px" }}>

                <b>AI Response:</b>

                <br />

                {response}

            </p>



        </div>

    );

}


export default VoiceAssistant;