import { devLogger } from "../logger/logger.config.js";
import { setLock, releaseLock, isLocked } from "./../../utils/lockManager.js";
import { socketManager } from "./../websocket/socket.js";
import EventEmitter from "events";

class TaskManager extends EventEmitter {
  constructor() {
    super();
    this.tasks = new Map();
  }

  async startTask(userId, taskId, processFunction) {
    if (await isLocked()) {
      throw new Error("Proceso en ejecución, intenta más tarde.");
    }

    // Bloquea la ejecución en DB y memoria
    await setLock();

    const task = { id: taskId, userId, status: "RUNNING", cancel: false };
    this.tasks.set(taskId, task);    
    socketManager.emitToUser(userId, "task-started", { taskId });

    try {
      await processFunction(task);
      task.status = "COMPLETED";
    } catch (error) {
      task.status = task.cancel ? "CANCELED" : "FAILED";
    } finally {
      this.tasks.delete(taskId);
      await releaseLock();
      socketManager.emitToUser(userId, "task-finished", { taskId, status: task.status });
    }
  }

  async cancelTask(taskId) {   
    const task = this.tasks.get(taskId);
    if (task) {
      task.cancel = true;
      task.status = "CANCELED";
      await releaseLock();
      socketManager.emitToTask(taskId, "task-canceled", { taskId });
    }
  }
}

export const taskManager = new TaskManager();
