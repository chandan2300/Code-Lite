import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar.js";
import Axios from "axios";
import spinner from "./logo.svg";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-clouds_midnight";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/ext-code_lens";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-static_highlight";
import "ace-builds/src-noconflict/ext-beautify";
import "ace-builds/src-noconflict/snippets/scala";

const languages = [
  "javascript",
  "java",
  "python",
  "xml",
  "ruby",
  "sass",
  "swift",
  "markdown",
  "mysql",
  "json",
  "html",
  "handlebars",
  "golang",
  "csharp",
  "elixir",
  "typescript",
  "css",
  "c_cpp",
  "golang",
  "perl",
  "scala",
];

languages.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

const Ace = () => {
  // State variable to set users source code
  const [userCode, setUserCode] = useState(``);

  // State variable to set editors default language
  const [userLang, setUserLang] = useState("python");

  //Set variable to compilers defalut language
  const [userLabel, setUserLabel] = useState("python3");

  // State variable to set editors default theme
  const [userTheme, setUserTheme] = useState("terminal");

  // State variable to set editors default font size
  const [fontSize, setFontSize] = useState(18);

  // State variable to set users input
  const [userInput, setUserInput] = useState("");

  // State variable to set users output
  const [userOutput, setUserOutput] = useState("");

  // Loading state variable to show spinner
  // while fetching data
  const [loading, setLoading] = useState(false);

  const options = {
    fontSize: fontSize,
  };

  // Function to call the compile endpoint
  function compile() {
    setLoading(true);
    if (userCode === ``) {
      return;
    }

    // Post request to compile endpoint
    Axios.post(`http://localhost:8000/runner`, {
      code: userCode,
      language: userLabel,
      input: userInput,
    })
      .then((res) => {
        setUserOutput(res.data.output);
      })
      .then(() => {
        setLoading(false);
      });
  }

  // Function to clear the output screen
  function clearOutput() {
    setUserOutput("");
  }
  function onChange(newValue) {
    console.log("change", newValue);
  }

  return (
    <div className="App">
      <Navbar
        userLang={userLang}
        userLabel={userLabel}
        setUserLang={setUserLang}
        userTheme={userTheme}
        setUserTheme={setUserTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
        setUserLabel={setUserLabel}
      />
      <div className="main">
        <div className="left-container" id="ace">
          <AceEditor
            mode={userLang}
            theme={userTheme}
            onChange={(value) => {
              setUserCode(value);
            }}
            name="ace"
            editorProps={{ $blockScrolling: true }}
            highlightActiveLine={true}
            fontSize={fontSize}
            width="100%"
            height="calc(100vh - 50px)"
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
          <button className="run-btn" onClick={() => compile()}>
            Run
          </button>
        </div>
        <div className="right-container">
          <h4>Input:</h4>
          <div className="input-box">
            <textarea
              id="code-inp"
              onChange={(e) => setUserInput(e.target.value)}
            ></textarea>
          </div>
          <h4>Output:</h4>
          {loading ? (
            <div className="spinner-box">
              <img src={spinner} alt="Loading..." />
            </div>
          ) : (
            <div className="output-box">
              <pre>{userOutput}</pre>
              <button
                onClick={() => {
                  clearOutput();
                }}
                className="clear-btn"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ace;
