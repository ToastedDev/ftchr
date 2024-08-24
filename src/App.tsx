import { useRef } from "react";
import { fetch, ResponseType } from "@tauri-apps/api/http";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  async function greet() {
    const url = inputRef.current?.value;
    if (!url) return;
    const res = await fetch(url, {
      method: "GET",
      responseType: ResponseType.Text,
    });
    console.log(res);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        greet();
      }}
    >
      <input type="url" placeholder="https://example.com" ref={inputRef} />
      <button type="submit">Send</button>
    </form>
  );
}

export default App;
