import "./App.css";
import CountryCapitalGame from "./components/CountryCapitalGame";

function App() {
  return (
    <CountryCapitalGame
      data={{
        Philippines: "Manila",
        Thailand: "Bangkok",
        Japan: "Tokyo",
      }}
    />
  );
}

export default App;
