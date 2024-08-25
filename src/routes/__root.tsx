import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen flex">
        <aside className="p-2 w-52 lg:w-72 border-r">hello</aside>
        <div className="p-2 grow">
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
