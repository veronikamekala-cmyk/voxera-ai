import { Link } from "react-router-dom";

function Home() {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#0f172a",
                color: "white",
                padding: "40px",
            }}
        >
            <h1>🎓 Voxera AI</h1>

            <h2>Student Communication & Career Confidence Platform</h2>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    marginTop: "40px",
                }}
            >
                <Link to="/dashboard">📊 Dashboard</Link>

                <Link to="/presentation">🎤 Presentation Coach</Link>

                <Link to="/faculty">👨‍🏫 Faculty Trainer</Link>

                <Link to="/interview">💼 Interview Hub</Link>

                <Link to="/resume">📄 Resume Analyzer</Link>

                <Link to="/communication">🤝 Communication Lab</Link>

                <Link to="/motivation">💡 Motivation Center</Link>

                <Link to="/simulator">🚀 AI College Simulator</Link>
            </div>
        </div>
    );
}

export default Home;