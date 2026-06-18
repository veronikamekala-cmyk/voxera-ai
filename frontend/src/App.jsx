import { useState } from "react";
import "./App.css";

function App() {

  const [logged, setLogged] = useState(
    localStorage.getItem("logged") === "true"
  );

  const [name, setName] = useState(localStorage.getItem("name") || "");

  const [video, setVideo] = useState(null);
  const [analyzed, setAnalyzed] = useState(false);
  const [score, setScore] = useState(0);

  const [xp, setXp] = useState(Number(localStorage.getItem("xp")) || 0);
  const [streak, setStreak] = useState(Number(localStorage.getItem("streak")) || 0);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const [response, setResponse] = useState("");
  const [listening, setListening] = useState(false);

  const [stageListening, setStageListening] = useState(false);

  const topics = [
    "Introduce yourself",
    "Explain your project",
    "Talk about your dream career",
    "Describe your college",
    "Talk about your strengths",
    "Explain your daily routine"
  ];

  const [topic, setTopic] = useState(topics[0]);

  const [stageText, setStageText] = useState(
    "Click Start Practice and speak 🎤"
  );

  const tasksList = [
    "Speak for 1 minute on any topic",
    "Describe your dream job",
    "Explain your last project",
    "Talk without filler words for 30 sec",
    "Introduce yourself confidently"
  ];

  const [task, setTask] = useState(
    tasksList[Math.floor(Math.random() * tasksList.length)]
  );

  const [taskDone, setTaskDone] = useState(
    localStorage.getItem("taskDone") === "true"
  );

  const [challengeDay, setChallengeDay] = useState(
    Number(localStorage.getItem("challengeDay")) || 1
  );

  const [challengeDone, setChallengeDone] = useState(false);

  const [challengeFinished, setChallengeFinished] = useState(
    localStorage.getItem("challengeFinished") === "true"
  );

  const [aiScore, setAiScore] = useState(0);
  const [levelUp, setLevelUp] = useState(false);

  // 🏆 LEVEL SYSTEM (NEW)
  const getLevel = (xp) => {
    if (xp < 300) return "🥉 Bronze Speaker";
    if (xp < 800) return "🥈 Silver Speaker";
    if (xp < 1500) return "🥇 Gold Speaker";
    return "💎 Diamond Speaker";
  };

  const getNextLevelXP = (xp) => {
    if (xp < 300) return 300;
    if (xp < 800) return 800;
    if (xp < 1500) return 1500;
    return 2000;
  };

  const runAIScore = (text) => {
    if (!text) return;

    const grammar = 60 + Math.floor(Math.random() * 40);
    const clarity = 60 + Math.floor(Math.random() * 40);
    const confidence = 60 + Math.floor(Math.random() * 40);

    const total = Math.floor((grammar + clarity + confidence) / 3);

    setAiScore(total);

    if (total > 85) setLevelUp(true);

    setFeedback(
      `🧠 AI Feedback:
Grammar: ${grammar}/100
Clarity: ${clarity}/100
Confidence: ${confidence}/100`
    );

    addXP(40);
  };

  const addXP = (n) => {
    const value = xp + n;
    setXp(value);
    localStorage.setItem("xp", value);
  };

  const login = () => {
    if (name.trim() === "") return alert("Enter your name");
    localStorage.setItem("logged", "true");
    localStorage.setItem("name", name);
    setLogged(true);
  };

  const uploadVideo = (e) => {
    const file = e.target.files[0];
    if (file) setVideo(URL.createObjectURL(file));
  };

  const analyze = () => {
    if (!video) return alert("Upload video first");
    setScore(82);
    setAnalyzed(true);
    addXP(50);
  };

  const getQuestion = () => {
    const q = [
      "Tell me about yourself",
      "What are your strengths?",
      "Explain your project",
      "Why should we hire you?"
    ];
    setQuestion(q[Math.floor(Math.random() * q.length)]);
    setAnswer("");
    setFeedback("");
  };

  const checkAnswer = () => {
    if (!answer.trim()) {
      setFeedback("⚠️ Type your answer first");
      return;
    }
    setFeedback("🤖 Good attempt. Add examples and confidence.");
    addXP(50);
  };

  const speakingCoach = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return alert("Speech not supported");

    const rec = new SpeechRecognition();
    rec.lang = "en-US";

    setListening(true);
    setResponse("🎤 Listening...");
    rec.start();

    rec.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setResponse("You said:\n" + text);
      runAIScore(text);
    };

    rec.onend = () => setListening(false);
  };

  const startStagePractice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return alert("Use Chrome");

    const rec = new SpeechRecognition();
    rec.lang = "en-US";

    setStageListening(true);
    setStageText("🎤 Recording... speak now");

    rec.start();

    const timer = setTimeout(() => {
      try { rec.stop(); } catch { }
    }, 60000);

    rec.onresult = (e) => {
      const text = e.results[0][0].transcript;
      const nextTopic = topics[Math.floor(Math.random() * topics.length)];

      setTopic(nextTopic);

      setStageText(
        `🎯 Speech:\n\n${text}\n\n🎤 Next: ${nextTopic}`
      );

      runAIScore(text);
      addXP(30);
    };

    rec.onend = () => {
      setStageListening(false);
      clearTimeout(timer);
    };
  };

  const completeTask = () => {
    if (taskDone) return;
    setTaskDone(true);
    localStorage.setItem("taskDone", "true");
    addXP(100);
  };

  const newTask = () => {
    const t = tasksList[Math.floor(Math.random() * tasksList.length)];
    setTask(t);
    setTaskDone(false);
  };

  const completeChallenge = () => {
    if (challengeDone) return;

    setChallengeDone(true);
    addXP(120);

    let next = challengeDay + 1;
    if (next <= 30) {
      setChallengeDay(next);
      localStorage.setItem("challengeDay", next);
    }

    localStorage.setItem("challengeDone", "true");

    let today = new Date().toLocaleDateString();
    localStorage.setItem("practiceDate", today);

    let s = streak + 1;
    setStreak(s);
    localStorage.setItem("streak", s);

    if (challengeDay >= 30) {
      setChallengeFinished(true);
      localStorage.setItem("challengeFinished", "true");
      addXP(500);
    }
  };

  const resetChallenge = () => {
    setChallengeDay(1);
    setChallengeDone(false);
    setChallengeFinished(false);

    localStorage.setItem("challengeDay", "1");
    localStorage.setItem("challengeDone", "false");
    localStorage.setItem("challengeFinished", "false");
  };

  const claimReward = () => {
    alert("🎓 Certificate Unlocked! You are a Speaking Master 🏆");
    addXP(1000);
  };

  let level = getLevel(xp);
  let nextXP = getNextLevelXP(xp);
  let progress = (xp / nextXP) * 100;

  if (!logged) {
    return (
      <div className="page">
        <div className="card">
          <h1>✨ Voxera AI</h1>
          <h2>Beat Stage Fear 🚀</h2>
          <input placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
          <button onClick={login}>Start</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">

      <div className="hero">
        <h1>✨ Voxera AI</h1>
        <h2>Confidence Coach</h2>
      </div>

      <div className="cards">

        {/* PROFILE */}
        <div className="card">
          <h2>👤 {name}</h2>
          <h3>{level}</h3>
          <h3>⭐ XP {xp}</h3>

          {/* XP BAR */}
          <div style={{ background: "#222", height: 10, marginTop: 10 }}>
            <div style={{
              width: `${progress}%`,
              height: "100%",
              background: "linear-gradient(90deg, #00f5ff, #8b5cf6)"
            }} />
          </div>

          <p>Next Level: {nextXP} XP</p>

          <h3>🔥 Streak {streak}</h3>
        </div>

        {/* AI PERFORMANCE */}
        <div className="card">
          <h2>🧠 AI Performance</h2>
          <p>AI Score: {aiScore}/100</p>
          <p>{feedback}</p>
          {levelUp && <h3>🏆 Level Up Unlocked!</h3>}
        </div>

        {/* CHALLENGE */}
        <div className="card">
          <h2>🏆 30 Day Challenge</h2>
          <h3>Day {challengeDay}/30</h3>

          <div style={{ background: "#222", height: 10 }}>
            <div style={{
              width: `${(challengeDay / 30) * 100}%`,
              height: "100%",
              background: "cyan"
            }} />
          </div>

          <button onClick={completeChallenge}>Complete Day</button>
          <button onClick={resetChallenge}>Reset</button>
        </div>

        {challengeFinished && (
          <div className="card">
            <h2>🎉 Certificate Unlocked!</h2>
            <h1>🏆 MASTER SPEAKER</h1>
            <button onClick={claimReward}>Claim Reward</button>
          </div>
        )}

        {/* OTHER CARDS (UNCHANGED) */}
        <div className="card">
          <h2>🎯 Daily Task</h2>
          <p>{task}</p>
          <button onClick={completeTask}>Complete</button>
          <button onClick={newTask}>New Task</button>
        </div>

        <div className="card">
          <h2>🎥 Video Trainer</h2>
          <input type="file" onChange={uploadVideo} />
          {video && <video src={video} controls />}
          <button onClick={analyze}>Analyze</button>
        </div>

        <div className="card">
          <h2>🎭 Stage Trainer</h2>
          <p>{stageText}</p>
          <button onClick={startStagePractice}>Start</button>
        </div>

        <div className="card">
          <h2>💼 Interview</h2>
          <button onClick={getQuestion}>Get Question</button>
          <h3>{question}</h3>
          <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} />
          <button onClick={checkAnswer}>Check</button>
        </div>

        <div className="card">
          <h2>🎤 Speaking</h2>
          <button onClick={speakingCoach}>Start</button>
          <p>{response}</p>
        </div>

      </div>
    </div>
  );
}

export default App;