import fs from "fs/promises";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { devLogger } from "../config/logger/logger.config.js";

export async function loadCheckers(
  dir = new URL("./checkers", import.meta.url)
) {
  try {
    let dirPath;
    if (dir instanceof URL) {
      dirPath = fileURLToPath(dir);
    } else {
      dirPath = path.resolve(String(dir));
    }

    const files = await fs.readdir(dirPath);
    const list = [];

    for (const file of files) {
      if (!file.endsWith(".js") && !file.endsWith(".mjs")) continue;
      const filePath = path.join(dirPath, file);
      const url = pathToFileURL(filePath).href;

      try {
        const mod = await import(url);
        const checker = mod.default ?? mod;

        if (!checker || typeof checker.check !== "function" || !checker.name) {
          devLogger.error(`[health] Ignorando checker inválido: ${file}`);
          continue;
        }

        list.push(checker);
      } catch (err) {
        devLogger.error(`[health] Error cargando checker ${file}: ${err.stack || err.message || err}`);
      }
    }

    return list;
  } catch (err) {
    devLogger.error(`[health] Error leyendo directorio:`, err.message);
    return [];
  }
}
