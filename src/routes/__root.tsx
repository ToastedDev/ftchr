import { Button } from "@/components/ui/button";
import { addRoute, getRoutes } from "@/utils/user-data";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Plus } from "lucide-react";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["routes"],
    queryFn: getRoutes,
  });
  const { mutate: createRoute, error } = useMutation({
    mutationFn: addRoute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["routes"] });
    },
  });

  return (
    <>
      <div className="min-h-screen flex">
        <aside className="p-2 w-52 lg:w-72 border-r">
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
          {isLoading && <div>Loading...</div>}
          {data &&
            data.map((route, index) => <div key={index}>{route.name}</div>)}
        </aside>
        <div className="p-2 grow">
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools />
    </>
  );
}
