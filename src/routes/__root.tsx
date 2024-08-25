import { Button } from "@/components/ui/button";
import { addRoute, getRoutes } from "@/utils/user-data";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Plus } from "lucide-react";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  const queryClient = useQueryClient();
  const { data /* isLoading */ } = useQuery({
    queryKey: ["routes"],
    queryFn: getRoutes,
  });
  const { mutate: createRoute } = useMutation({
    mutationFn: addRoute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["routes"] });
    },
  });

  return (
    <>
      <div className="min-h-screen flex">
        <aside className="p-2 w-52 lg:w-72 border-r flex flex-col gap-2">
          <Button
            variant="outline"
            size="icon"
            className="w-full"
            onClick={() => {
              createRoute({
                name: "New Route",
                url: null,
              });
            }}
          >
            <Plus />
          </Button>
          {/* {isLoading && <div>Loading...</div>} */}
          {data &&
            data.map((route, index) => (
              <Link
                key={index}
                to="/routes/$routeId"
                params={{ routeId: index.toString() }}
                className="p-3 border hover:bg-accent transition-colors"
              >
                {route.name}
              </Link>
            ))}
        </aside>
        <div className="p-2 grow">
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools />
    </>
  );
}
