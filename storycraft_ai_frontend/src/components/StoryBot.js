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

function fakeStoryApi({ prompt, tone, plotTwist, charDesc, age }) {
  // Simulate story generation API
  // PUBLIC_INTERFACE
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: `The ${tone.charAt(0).toUpperCase() + tone.slice(1)} Tale: "${prompt.substring(0,30)}..."`,
        story: `Once upon a time, inspired by your prompt "${prompt}", a ${tone} story unfolded for readers ${age ? "(age: " + age + ")" : ""}.`,
        plotTwist: plotTwist
          ? "Suddenly, an unexpected event changed everything!"
          : null,
        characterDescription: charDesc
          ? "Meet Jamie, a clever protagonist with a knack for surprises."
          : null,
      });
    }, 900);
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
              padding: 18,
              borderRadius: 10,
              background: "#171f2c",
              color: "var(--text-color)",
              border: "1px solid var(--border-color)",
              marginTop: 8,
            }}
          >
            <div style={{ fontWeight: "bold", fontSize: "1.20rem", color: "var(--base-light)" }}>
              {story.title}
            </div>
            <div style={{ marginTop: 10, marginBottom: 8 }}>{story.story}</div>
            {story.plotTwist && (
              <div
                style={{
                  background: "rgba(64,220,220,0.07)",
                  borderRadius: 6,
                  padding: "8px 10px",
                  marginBottom: 6,
                  color: "var(--base-light)",
                  fontWeight: 500,
                }}
              >
                🌀 <b>Plot twist:</b> {story.plotTwist}
              </div>
            )}
            {story.characterDescription && (
              <div
                style={{
                  background: "rgba(255,149,0,0.10)",
                  borderRadius: 6,
                  padding: "7px 10px",
                  color: "#ff9500",
                }}
              >
                <b>Character:</b> {story.characterDescription}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
