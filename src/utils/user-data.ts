import {
  BaseDirectory,
  createDir,
  exists,
  readTextFile,
  writeTextFile,
} from "@tauri-apps/api/fs";
import { appDataDir } from "@tauri-apps/api/path";

interface Request {
  name: string;
  url?: string;
}

export async function getRequests(): Promise<Request[] | null> {
  try {
    const data = await readTextFile("requests.json", {
      dir: BaseDirectory.AppData,
    });
    return JSON.parse(data);
  } catch (err) {
    return null;
  }
}

export async function getRequest(routeId: number): Promise<Request | null> {
  const routes = (await getRequests()) ?? [];
  return routes[routeId] ?? null;
}

export async function addRequest(route: Request) {
  const routes = (await getRequests()) ?? [];
  routes.push(route);
  if (!(await exists(await appDataDir()))) {
    await createDir(await appDataDir(), {
      recursive: true,
    });
  }
  await writeTextFile("requests.json", JSON.stringify(routes), {
    dir: BaseDirectory.AppData,
  });
}
