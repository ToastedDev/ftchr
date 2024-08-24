import { useRef } from "react";
import { fetch } from "@tauri-apps/api/http";

function App() {
  // const inputRef = useRef<HTMLInputElement>(null);

  async function greet() {
    console.log(await fetch("https://jsonplaceholder.typicode.com/todos/1"));
  }

  return (
    <form
      className="row"
      onSubmit={(e) => {
        e.preventDefault();
        greet();
      }}
    >
      <button type="submit">Greet</button>
    </form>
  );
}

export default App;
