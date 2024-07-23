import { Server } from "socket.io";
import * as http from "http";

class SocketIO {
  io: Server;

  constructor(appServer: any) {
    this.io = new Server(appServer, {
      cors: {
        origin: "*",
      },
    });

    this.io.on("connection", (socket) => {
      console.log("Socket client connected");
    });
  }
}

let socket: SocketIO;
export function initSocket(server: http.Server): SocketIO | void {
  if (!socket) {
    socket = new SocketIO(server);
  }
}
export function getSocketIO(): Server {
  if (!socket) {
    throw new Error("Please call init first");
  }
  return socket.io;
}
