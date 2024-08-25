import { Button } from "@/components/ui/button";
import { addRequest, getRequests } from "@/utils/user-data";
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
    queryKey: ["requests"],
    queryFn: getRequests,
  });
  const { mutate: createRequest } = useMutation({
    mutationFn: addRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
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
              createRequest({
                name: "New Request",
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
                to="/requests/$requestId"
                params={{ requestId: index.toString() }}
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
