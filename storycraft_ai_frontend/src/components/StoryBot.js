import React, { useState } from "react";
import "../App.css";

/*
PUBLIC_INTERFACE
StoryBot is the main component for the StoryCraft AI story generation feature.
It allows users to enter a prompt, select a tone, toggle plot twist & character description,
(optionally) set age appropriateness, and on submission displays a generated story with
the appropriate structure.
*/
const TONE_OPTIONS = [
  { value: "funny", label: "Funny" },
  { value: "sad", label: "Sad" },
  { value: "mystery", label: "Mystery" },
  { value: "adventure", label: "Adventure" },
  { value: "dramatic", label: "Dramatic" },
  { value: "scary", label: "Scary" },
  { value: "sci-fi", label: "Sci-Fi" },
];

/**
 * PUBLIC_INTERFACE
 * Simulate a StoryBot API response with all elements in user-selected order.
 * Assembles title, main story, (optional) plot twist and character description as needed.
 */
function fakeStoryApi({ prompt, tone, plotTwist, charDesc, age }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Title construction
      const title = `The ${tone.charAt(0).toUpperCase() + tone.slice(1)} Tale: "${prompt.substring(0,30)}..."`;

      // Body construction
      let mainStory = `Once upon a time, inspired by your prompt "${prompt}", a ${tone} story unfolded${age && age.trim() ? " for readers (age: " + age.trim() + ")" : ""}.`;

      // Optionally add twist and character description
      let twistSec = plotTwist
        ? "🌀 Suddenly, an unexpected event changed everything! "
        : null;
      let charSec = charDesc
        ? "Meet Jamie, a clever protagonist with a knack for surprises."
        : null;

      resolve({
        title,
        story: mainStory,
        plotTwist: twistSec,
        characterDescription: charSec,
      });
    }, 700);
  });
}

export default function StoryBot() {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState(TONE_OPTIONS[0].value);
  const [plotTwist, setPlotTwist] = useState(false);
  const [charDesc, setCharDesc] = useState(false);
  const [age, setAge] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [story, setStory] = useState(null);
  const [error, setError] = useState(null);

  // PUBLIC_INTERFACE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setStory(null);
    if (!prompt.trim()) {
      setError("Please enter a story prompt.");
      return;
    }
    setSubmitting(true);
    try {
      // Later, replace this with real API call.
      const result = await fakeStoryApi({
        prompt,
        tone,
        plotTwist,
        charDesc,
        age: age.trim(),
      });
      setStory(result);
    } catch (e) {
      setError("Something went wrong. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <div
      style={{
        margin: "0 auto",
        marginTop: 48,
        maxWidth: 560,
        background: "rgba(10,30,40,0.92)",
        boxShadow: "0 6px 22px 0 rgba(20,80,120,0.12)",
        borderRadius: 16,
        padding: 32,
      }}
    >
      <h2 style={{ color: "var(--base-light)", marginBottom: 6, fontSize: "2.1rem" }}>
        StoryBot
      </h2>
      <div className="description" style={{ marginBottom: 22 }}>
        Create a unique short story! Customize style, plot twists, and more. Powered by AI.
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label
            htmlFor="prompt"
            style={{ fontWeight: 500, color: "var(--text-color)" }}
          >
            Story prompt <span style={{ color: "#ff9500" }}>*</span>
          </label>
          <textarea
            id="prompt"
            value={prompt}
            required
            placeholder="Enter your story idea or prompt..."
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            style={{
              width: "100%",
              border: "1px solid var(--border-color)",
              borderRadius: 5,
              padding: 10,
              marginTop: 6,
              fontSize: 16,
              resize: "vertical",
              background: "#212a3a",
              color: "var(--text-color)",
              marginBottom: 0,
            }}
            disabled={submitting}
          />
        </div>

        <div style={{ display: "flex", gap: 18, marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <label
              htmlFor="tone"
              style={{ fontWeight: 500, color: "var(--text-color)" }}
            >
              Tone
            </label>
            <select
              id="tone"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              style={{
                width: "100%",
                border: "1px solid var(--border-color)",
                borderRadius: 5,
                padding: 6,
                marginTop: 6,
                background: "#212a3a",
                color: "var(--text-color)",
                fontSize: 15,
              }}
              disabled={submitting}
            >
              {TONE_OPTIONS.map((option) => (
                <option value={option.value} key={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 12, marginTop: 22 }}>
            <label style={{ color: "var(--text-color)" }}>
              <input
                type="checkbox"
                checked={plotTwist}
                onChange={() => setPlotTwist((v) => !v)}
                disabled={submitting}
                style={{ marginRight: 7 }}
              /> Plot twist
            </label>
            <label style={{ color: "var(--text-color)" }}>
              <input
                type="checkbox"
                checked={charDesc}
                onChange={() => setCharDesc((v) => !v)}
                disabled={submitting}
                style={{ marginRight: 7 }}
              /> Character description
            </label>
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ color: "var(--text-secondary)", fontSize: 15 }}>
            Age appropriateness (optional):{" "}
            <input
              type="text"
              placeholder="e.g. 8+, teen, adult"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={{
                border: "1px solid var(--border-color)",
                borderRadius: 6,
                padding: 6,
                background: "#212a3a",
                color: "var(--text-color)",
                width: 110,
                marginLeft: 6,
              }}
              disabled={submitting}
            />
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-large"
          style={{ width: "100%", letterSpacing: "0.03em", background: "var(--base-light)" }}
          disabled={submitting || !prompt.trim()}
        >
          {submitting ? "Generating..." : "Generate Story"}
        </button>
      </form>

      <div style={{ marginTop: 24, minHeight: 130 }}>
        {error && (
          <div style={{ color: "#ff9500", marginBottom: 10, fontWeight: 500 }}>
            {error}
          </div>
        )}
        {story && (
          <div
            style={{
              borderRadius: 18,
              background: "#161B2E",
              color: "var(--text-color)",
              border: "1.5px solid var(--base-light)",
              marginTop: 8,
              overflow: "hidden",
              boxShadow: "0 8px 30px 0 rgba(40,200,255,0.12)",
              padding: 0,
              marginBottom: 0
            }}
            data-testid="storybot-results"
          >
            {/* -- Top timeline bar/section icons for visual fun cue -- */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 0,
                padding: "0 0 0 16px",
                background: "linear-gradient(90deg, var(--base-light) 0px, #4A90E2 70%)",
                borderRadius: "17px 17px 0 0",
                minHeight: 12,
                height: 12,
              }}
            >
              {[...Array(6)].map((_,i) => (
                <div key={i}
                  style={{
                    width: 8, height: 8, borderRadius: 4,
                    background: i%2 ? "var(--base-light)" : "#fff",
                    marginRight: 6,
                    opacity: 0.85
                  }}
                />
              ))}
            </div>

            {/* Title */}
            <div
              style={{
                background: "linear-gradient(90deg, var(--base-light) 0%, #4A90E2 88%)",
                color: "#fff",
                fontWeight: 800,
                fontSize: "1.38rem",
                padding: "18px 24px 10px 24px",
                letterSpacing: "0.014em",
                borderBottom: "1px solid var(--border-color)",
                display: "flex",
                alignItems: "flex-end",
                gap: 10
              }}
            >
              <span
                style={{
                  color: "#fff",
                  marginRight: 5,
                  background: "#20294d",
                  borderRadius: 5,
                  padding: "3px 13px 3.5px 8px",
                  fontWeight: 700,
                  letterSpacing: "0.01em",
                  fontSize: "0.93rem",
                  boxShadow: "0 1px 6px 0 rgba(100,180,255,0.09)"
                }}
              >Title</span>
              <div
                style={{
                  fontFamily: "'Georgia',serif",
                  fontSize: "1.18em",
                  color: "#aafffd",
                  fontWeight: 700,
                  letterSpacing: "0.01em",
                  marginLeft: 2
                }}
              >{story.title}</div>
            </div>

            {/* Main story */}
            <div
              style={{
                background: "linear-gradient(100deg,#192340 90%,#202645 100%)",
                borderTop: "none",
                padding: "22px 24px 14px 24px",
                lineHeight: 1.8,
                color: "#eafdff",
                fontWeight: 500,
                fontSize: "1.07rem",
                borderBottom: "1px solid var(--border-color)",
                position: "relative"
              }}
            >
              <div style={{
                fontWeight: 800,
                fontSize: "1.07em",
                color: "var(--base-light)",
                letterSpacing: "0.011em",
                marginBottom: 6,
                textShadow: "0px 1px 6px rgba(0,255,255,0.09)"
              }}>
                <span role="img" aria-label="book" style={{marginRight: 6, fontWeight: 700}}>📖</span>
                Main story
              </div>
              <div>{story.story}</div>
            </div>

            {/* Plot Twist (optional; animated "twist" bar & fun emoji) */}
            {story.plotTwist && (
              <div
                style={{
                  background: "rgba(0,238,255,0.08)",
                  borderLeft: "7px solid var(--base-light)",
                  borderTop: "none",
                  borderBottom: "1px solid var(--border-color)",
                  margin: "0 18px",
                  borderRadius: 11,
                  padding: "13px 18px 12px 19px",
                  color: "var(--base-light)",
                  fontWeight: 700,
                  fontSize: "1.065rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: 2
                }}
              >
                <span role="img" aria-label="twist" style={{ fontSize: "1.28em" }}>🌀</span>
                <span>
                  <span style={{
                    color: "#25bee7",
                    background: "rgba(36,255,223,0.06)",
                    padding: "2px 7px",
                    fontWeight: 700,
                    borderRadius: 7,
                    marginRight: 6,
                    fontSize: "0.97em"
                  }}>Plot twist</span>
                  <span style={{marginLeft:6}}>{story.plotTwist}</span>
                </span>
              </div>
            )}

            {/* Character Description (optional) - like a highlighted fun card */}
            {story.characterDescription && (
              <div
                style={{
                  background: "linear-gradient(90deg,rgba(255,149,0,0.10) 70%,rgba(41,41,41,0.04) 100%)",
                  margin: "12px 18px 18px 18px",
                  borderRadius: 11,
                  padding: "17px 22px 12px 22px",
                  color: "#ff9500",
                  fontWeight: 700,
                  fontSize: "1.01rem",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #ff950066",
                  boxShadow: "0 0 4px 0 #ff95003b",
                  marginTop: 8
                }}
              >
                <span style={{ color: "#ff9500", fontWeight: 900, fontSize: "1.03em", marginBottom: 4 }}>
                  <span role="img" aria-label="character" style={{ fontSize: "1.18em", marginRight: 6 }}>👤</span>
                  Character Description
                </span>
                <div style={{
                  marginTop: 5,
                  fontSize: "1.01em",
                  color: "#ffefa2",
                  textShadow: "0px 1px 8px #ff950025"
                }}>
                  {story.characterDescription}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
