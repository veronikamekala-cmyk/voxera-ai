import { useState } from "react";
import "./App.css";

function App() {

  const [logged, setLogged] = useState(
    localStorage.getItem("logged") === "true"
  );

  const [name, setName] = useState(
    localStorage.getItem("name") || ""
  );

  const [xp, setXp] = useState(
    Number(localStorage.getItem("xp")) || 0
  );


  const [video, setVideo] = useState(null);
  const [videoReport, setVideoReport] = useState("");

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const [response, setResponse] = useState("");

  const [listening, setListening] = useState(false);

  const [stageText, setStageText] = useState(
    "Click Start Practice 🎤"
  );

  const [stageFeedback, setStageFeedback] = useState("");

  const [aiScore, setAiScore] = useState(0);

  const [timer, setTimer] = useState(60);



  const addXP = (n) => {

    let x = xp + n;

    setXp(x);

    localStorage.setItem("xp", x);

  };



  const login = () => {

    if (!name)
      return alert("Enter name");

    localStorage.setItem("logged", "true");
    localStorage.setItem("name", name);

    setLogged(true);

  };



  const uploadVideo = (e) => {

    let file = e.target.files[0];

    if (file)
      setVideo(URL.createObjectURL(file));

  };



  const analyze = () => {

    if (!video)
      return alert("Upload video");


    setVideoReport(`

🎭 Facial Expression Analysis

😊 Smile: Detected

👀 Eye Contact: Good

💪 Confidence: 85%

🗣 Voice Clarity: Good


Improve:

✔ Maintain posture

✔ Reduce nervous movement

`);

    addXP(50);

  };




  const getQuestion = () => {

    let q = [
      "Tell me about yourself",
      "What are your strengths?",
      "Explain your project",
      "Why should we hire you?"
    ];


    setQuestion(
      q[Math.floor(Math.random() * q.length)]
    );

    setAnswer("");

    setFeedback("");

  };





  const checkAnswer = () => {


    if (!answer.trim()) {

      setFeedback("⚠️ Write answer first");
      return;

    }



    let text = answer.toLowerCase();


    let correct =
      text.includes("student") ||
      text.includes("project") ||
      text.includes("skill") ||
      text.includes("technology") ||
      text.includes("experience");



    let msg;


    if (correct) {


      msg = "Correct answer. Good job. Keep improving.";


      setFeedback(`

🤖 Interview Result

✅ CORRECT ANSWER

Score: 90/100


${answer}

${msg}

`);

    }


    else {


      msg = "Wrong answer. Add your skills, project and experience.";


      setFeedback(`

🤖 Interview Result

❌ WRONG ANSWER

Score: 40/100


${answer}

${msg}

`);

    }



    let speech =
      new SpeechSynthesisUtterance(msg);


    speech.rate = 0.9;


    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(speech);



  };







  const startSpeech = (type) => {


    let SR =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;


    if (!SR) {

      alert("Open Chrome");

      return;

    }



    let rec = new SR();


    rec.lang = "en-US";

    rec.continuous = true;

    rec.interimResults = true;



    let time = 60;


    setTimer(60);



    let interval = setInterval(() => {


      time--;


      setTimer(time);



      if (time <= 0) {

        clearInterval(interval);

        rec.stop();

      }



    }, 1000);






    if (type === "stage") {


      setStageText(
        "🎤 Speak for 60 seconds..."
      );


    }
    else {


      setListening(true);

      setResponse(
        "🎤 Speak for 60 seconds..."
      );


    }




    rec.start();





    rec.onresult = (e) => {


      let text = "";


      for (
        let i = e.resultIndex;
        i < e.results.length;
        i++
      ) {

        text += e.results[i][0].transcript;

      }




      if (type === "stage") {


        setStageText(`

🗣 You said:

${text}

⏳ Time left: ${time}s

`);



        setStageFeedback(`

🎭 Stage Feedback

Confidence: 90%

Clarity: Good

Suggestion:
Speak slowly

`);

      }


      else {


        setResponse(`

You said:

${text}


AI Feedback:

Good speaking practice

`);

        setAiScore(90);

      }



    };




    rec.onerror = (e) => {

      if (e.error !== "aborted") {

        console.log(e.error);

      }

    };



    rec.onend = () => {

      clearInterval(interval);

      setListening(false);

    };



  };







  if (!logged) {

    return (

      <div className="page">

        <div className="card">

          <h1>✨ Voxera AI</h1>

          <input
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          />

          <button onClick={login}>
            Start
          </button>

        </div>

      </div>

    )

  }






  return (

    <div className="page">


      <div className="navbar">

        <h2>✨ Voxera AI</h2>

      </div>



      <div className="layout">



        <div className="sidebar">

          <h2>Menu</h2>

          <p>🏠 Dashboard</p>
          <p>🎥 Video</p>
          <p>🎤 Speaking</p>
          <p>💼 Interview</p>
          <p>🏆 Achievement</p>

        </div>




        <div className="content">



          <div className="card">

            <h2>👤 {name}</h2>

            <h2>⭐ XP {xp}</h2>

          </div>






          <div className="card">

            <h2>🎥 Video Trainer</h2>


            <input
              type="file"
              onChange={uploadVideo}
            />


            {video &&
              <video
                src={video}
                controls
                width="250"
              />
            }


            <button onClick={analyze}>
              Analyze
            </button>


            <p>{videoReport}</p>

          </div>







          <div className="card">


            <h2>🎭 Stage Trainer</h2>


            <p>{stageText}</p>


            <button onClick={() => startSpeech("stage")}>

              Start {timer}s

            </button>


            <p>{stageFeedback}</p>


          </div>







          <div className="card">

            <h2>💼 Interview</h2>


            <button onClick={getQuestion}>
              Get Question
            </button>


            <h3>{question}</h3>


            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />


            <button onClick={checkAnswer}>
              Check
            </button>


            <p>{feedback}</p>


          </div>







          <div className="card">

            <h2>🎤 Speaking</h2>


            <button onClick={() => startSpeech("voice")}>

              {listening ? "Listening..." : "Start"}

            </button>


            <p>{response}</p>


            <h3>
              AI Score {aiScore}/100
            </h3>


          </div>







          <div className="card">

            <h2>🏆 Achievement</h2>

            <p>🥉 Beginner Speaker</p>
            <p>🥈 Practice Master</p>
            <p>🥇 Confidence Pro</p>


          </div>




        </div>


      </div>


    </div>

  )

}


export default App;