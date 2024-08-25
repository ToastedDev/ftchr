import { useRef } from "react";
import { fetch, ResponseType } from "@tauri-apps/api/http";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

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
      className="flex gap-2"
    >
      <Input type="url" placeholder="https://example.com" ref={inputRef} />
      <Button type="submit">Send</Button>
    </form>
  );
}

export default App;
