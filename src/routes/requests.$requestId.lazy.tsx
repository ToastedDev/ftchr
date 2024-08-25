import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/requests/$requestId")({
  component: () => <div>Hello /requests/$requestId!</div>,
});
