import { Server } from "socket.io";
import { devLogger } from "../logger/logger.config.js";
class SocketManager {
  constructor() {
    this.io = null;
    this.userSockets = new Map(); // Mapea userId → Set(socketId)
    this.taskSockets = new Map(); // Mapea taskId → Set(socketId)
    this.allowedOrigins = [process.env.FRONTEND_ORIGIN];
  }

  init(server) {
    this.io = new Server(server, {
      cors: { origin: this.allowedOrigins, methods: ["GET", "POST"] }
    });

    this.io.on("connect", (socket) => {
      devLogger.debug(`Cliente conectado: ${socket.id}`);

      socket.on("register", (userId, taskId) => {
        this.registerSocket(userId, taskId, socket.id);
      });

      socket.on("cancel", (taskId) => {
        devLogger.debug(`Solicitud de cancelación recibida para taskId: ${taskId}`);
        this.emitToTask(taskId, "task-canceled", { taskId });  // Emite que la tarea fue cancelada
      });

      socket.on("disconnect", () => {
        this.unregisterSocket(socket.id);
      });
    });
  }

  registerSocket(userId, taskId, socketId) {
    if (!this.userSockets.has(userId)) {
      this.userSockets.set(userId, new Set());
    }
    this.userSockets.get(userId).add(socketId);

    if (taskId) {
      if (!this.taskSockets.has(taskId)) {
        this.taskSockets.set(taskId, new Set());
      }
      this.taskSockets.get(taskId).add(socketId);
    }
  }

  unregisterSocket(socketId) {
    for (const [userId, sockets] of this.userSockets) {
      if (sockets.has(socketId)) {
        sockets.delete(socketId);
        if (sockets.size === 0) this.userSockets.delete(userId);
        break;
      }
    }

    for (const [taskId, sockets] of this.taskSockets) {
      if (sockets.has(socketId)) {
        sockets.delete(socketId);
        if (sockets.size === 0) this.taskSockets.delete(taskId);
        break;
      }
    }
  }

  emitToUser(userId, event, data) {
    const sockets = this.userSockets.get(userId);
    if (sockets) {
      sockets.forEach((socketId) => this.io.to(socketId).emit(event, data));
    }
  }

  emitToTask(taskId, event, data) {
    const sockets = this.taskSockets.get(taskId);
    if (sockets) {
      sockets.forEach((socketId) => this.io.to(socketId).emit(event, data));
    }
  }
}

export const socketManager = new SocketManager();
