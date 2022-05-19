import { React } from "react";
import "./App.css";

function InfoPanel(props) {
  if (props.showPanel) {
    return (
      <div>
        <div className="nav-menu">
          <p className="paragraph">
            Text prompt AI accepts a text prompt and uses the OpenAI Completion
            AI to provide a meaningful response! Responses are displayed in a
            list along with the associated prompts.
          </p>
          <p className="list">A few suggestions:</p>
          <ul className="list">
            <li>Write a poem about dogs on skis</li>
            <li>Write a sentence about sailing</li>
            <li>Say hello</li>
          </ul>
        </div>
        <div className="nav-menu-blur" onClick={props.onCloseMenu}></div>
      </div>
    );
  } else {
    return null;
  }
}

export default InfoPanel;
