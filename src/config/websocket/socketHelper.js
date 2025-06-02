export const sendProgress = (io, clientId, taskId, message) => {
  io.to(clientId).emit('progreso', { taskId, message });
};
