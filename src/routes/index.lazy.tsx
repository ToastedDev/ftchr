import { createLazyFileRoute } from "@tanstack/react-router";
import { Stars } from "lucide-react";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-1">
      <Stars className="h-8 w-8 text-yellow-500" />
      <h1 className="text-xl font-bold">No request selected</h1>
      <p className="text-muted-foreground">
        Select or create a request to get started
      </p>
    </div>
  );
}
