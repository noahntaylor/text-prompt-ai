import { useEffect, useState } from "react";
import { faCircleInfo, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularProgress from "@mui/material/CircularProgress";

import InfoPanel from "./InfoPanel";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useState([]);
  const [showPanel, setShowPanel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPrompt("");
    setResponses([]);
    setShowPanel(false);
  }, []);

  const data = {
    prompt: prompt,
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/engines/text-curie-001/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
          },
          body: JSON.stringify(data),
        }
      );

      const reply = await response.json();

      if (reply.choices) {
        setResponses((prev) => [
          { input: prompt, response: reply.choices[0].text },
          ...prev,
        ]);
      } else {
        setResponses((prev) => [
          {
            input: prompt,
            response: "Something went wrong! Unable to access OpenAI.",
          },
          ...prev,
        ]);
      }

      setIsLoading(false);
    } catch {
      setResponses((prev) => [
        {
          input: prompt,
          response: "Something went wrong! Unable to access OpenAI.",
        },
        ...prev,
      ]);
      setIsLoading(false);
    }
  };

  const updatePrompt = (value) => {
    setPrompt(value);
  };

  const changeShowPanel = () => {
    setShowPanel(!showPanel);
  };

  return (
    <main className="app">
      <div className="info-icon" onClick={changeShowPanel}>
        {showPanel ? (
          <FontAwesomeIcon
            className="info-icon fa-xl"
            icon={faTimes}
            color="pink"
          />
        ) : (
          <FontAwesomeIcon
            className="info-icon fa-xl"
            icon={faCircleInfo}
            color="pink"
          />
        )}
      </div>
      <InfoPanel showPanel={showPanel} onCloseMenu={changeShowPanel} />
      <div className="app-surface">
        <h1>Text Prompt AI</h1>
        <form>
          <label htmlFor="prompt">Enter Prompt:</label>
          <textarea
            name="prompt"
            id="prompt"
            placeholder='Enter Text Prompt - Try "Write a poem about dogs on skis"'
            onChange={(e) => updatePrompt(e.target.value)}
          ></textarea>
          <div className="button-container">
            <button className="button" onClick={submit}>
              Submit
            </button>
          </div>
        </form>
      </div>
      <h2>Responses:</h2>
      {isLoading ? <CircularProgress className="spinner" /> : null}
      {responses.map((resp, i) => (
        <div className="app-surface" key={i}>
          <p className="row">
            <span className="bold">Prompt:</span>
            <span>{resp.input}</span>
          </p>
          <p className="row">
            <span className="bold">Response:</span>
            <span>{resp.response}</span>
          </p>
        </div>
      ))}
    </main>
  );
}

export default App;
