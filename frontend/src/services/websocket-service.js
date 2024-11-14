const WEBSOCKET_URL = "ws://localhost:8000";

class WebSocketService {
  constructor() {
    this.socket = null;
  }

  connect() {
    this.socket = new WebSocket(WEBSOCKET_URL);

    this.socket.onopen = () => {
      console.log("Connected to WebSocket server");
      this.sendMessage("Hello from the client!");
    };

    this.socket.onmessage = (event) => {
      console.log("Message from server:", event.data);
    };

    this.socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    this.socket.onerror = (error) => {
      console.log("WebSocket error:", error);
    };
  }

  sendMessage(message) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.log("WebSocket is not open");
    }
  } 

  close() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;
