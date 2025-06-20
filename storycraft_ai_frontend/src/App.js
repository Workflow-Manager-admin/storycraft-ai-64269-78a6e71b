import React, { useState } from "react";
import "./App.css";
import StoryBot from "./components/StoryBot";

/**
 * PUBLIC_INTERFACE
 * The main app container for StoryCraft AI frontend.
 * Integrates navigation and loads the StoryBot section or home as needed.
 */
function App() {
  const [section, setSection] = useState("home");

  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div className="logo" style={{ cursor: "pointer" }} onClick={() => setSection("home")}>
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                className={`btn`}
                style={{
                  background: section === "home" ? "var(--base-light)" : "",
                  color: section === "home" ? "#00008b" : "white",
                  fontWeight: section === "home" ? 600 : 500,
                }}
                onClick={() => setSection("home")}
              >
                Home
              </button>
              <button
                className={`btn`}
                style={{
                  background: section === "storybot" ? "var(--base-light)" : "",
                  color: section === "storybot" ? "#00008b" : "white",
                  fontWeight: section === "storybot" ? 600 : 500,
                  letterSpacing: "0.02em"
                }}
                onClick={() => setSection("storybot")}
                data-testid="nav-storybot"
              >
                StoryBot
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main style={{ minHeight: "calc(100vh - 70px)", paddingTop: 70 }}>
        <div className="container">
          {section === "home" && (
            <div className="hero" data-testid="home-section">
              <div className="subtitle">AI Workflow Manager Template</div>
              <h1 className="title">storycraft_ai_frontend</h1>
              <div className="description">
                Start building your application.<br />
                <span style={{ color: "var(--base-light)" }}>Try the StoryBot to generate creative short stories instantly!</span>
              </div>
              <button className="btn btn-large" onClick={() => setSection("storybot")}>Go to StoryBot</button>
            </div>
          )}
          {section === "storybot" && (
            <StoryBot />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;