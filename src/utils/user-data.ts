import {
  BaseDirectory,
  createDir,
  exists,
  readTextFile,
  writeTextFile,
} from "@tauri-apps/api/fs";
import { appDataDir } from "@tauri-apps/api/path";

interface Route {
  name: string;
  url: string | null;
}

export async function getRoutes(): Promise<Route[] | null> {
  try {
    const data = await readTextFile("routes.json", {
      dir: BaseDirectory.AppData,
    });
    return JSON.parse(data);
  } catch (err) {
    return null;
  }
}

export async function addRoute(route: Route) {
  const routes = (await getRoutes()) ?? [];
  routes.push(route);
  if (!(await exists(await appDataDir()))) {
    await createDir(await appDataDir(), {
      recursive: true,
    });
  }
  await writeTextFile("routes.json", JSON.stringify(routes), {
    dir: BaseDirectory.AppData,
  });
}
