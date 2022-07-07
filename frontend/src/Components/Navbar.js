import React from "react";
import Select from "react-select";
import "./Navbar.css";

const Navbar = ({
  userLang,
  userLabel,
  setUserLang,
  userTheme,
  setUserTheme,
  fontSize,
  setFontSize,
  setUserLabel,
}) => {
  const languages = [
    { value: "c", label: "c_cpp" },
    { value: "cpp17", label: "c_cpp" },
    { value: "python3", label: "python" },
    { value: "java", label: "java" },
    { value: "csharp", label: "csharp" },
    { value: "ruby", label: "ruby" },
    { value: "perl", label: "perl" },
    { value: "go", label: "golang" },
    { value: "scala", label: "scala" },
    { value: "swift", label: "swift" },
  ];
  // cpp: "c_cpp",
  //       java: "java",
  //       c: "c_cpp",
  //       cs: "csharp",
  //       rb: "ruby",
  //       py: "python",
  //       kt: "kotlin",
  //       swift: "swift"
  const languages2 = [
    { value: "c_cpp", label: "C" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "java", label: "Java" },
  ];
  const themes = [
    { value: "vs-dark", label: "Dark" },
    { value: "light", label: "Light" },
  ];
  const themes2 = [
    { value: "terminal", label: "terminal" },
    { value: "twilight", label: "twilight" },
    { value: "xcode", label: "xcode" },
    { value: "solarized_light", label: "solarized_lightt" },
    { value: "github", label: "github" },
    { value: "clouds_midnight", label: "clouds_midnight" },
    { value: "ambiance", label: "ambiance" },
    { value: "chrome", label: "chrome" },
  ];
  function styleFn(provided, state) {
    return { ...provided, color: state.isFocused ? "black" : "black" };
  }
  return (
    <div className="navbar">
      <h1>CODE-LITE</h1>
      <Select
        options={languages}
        value={userLang}
        label={userLabel}
        onChange={(e) => {
          setUserLang(e.label);
          setUserLabel(e.value);
          console.log(userLabel, userLang);
        }}
        placeholder={userLabel}
        clearable={false}
        styles={styleFn}
      />
      <Select
        options={themes2}
        value={userTheme}
        onChange={(e) => setUserTheme(e.value)}
        placeholder={userTheme}
        color="primary"
      />
      {/* <Select
        options={themes2}
        value={userTheme}
        onChange={(e) => setUserTheme(e.value)}
        placeholder={userTheme}
      /> */}
      <label>Font Size</label>
      <input
        type="range"
        min="18"
        max="30"
        value={fontSize}
        step="2"
        onChange={(e) => {
          setFontSize(e.target.value);
        }}
      />
    </div>
  );
};

export default Navbar;
