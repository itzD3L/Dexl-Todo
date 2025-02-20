import { store } from '../../app/store';
import { jwtDecode } from "jwt-decode";

class WebSocketService {
    private ws: WebSocket | null = null;
    private static instance: WebSocketService;
    private connecting: boolean = false;

    private constructor() {}

    static getInstance() {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    connect() {
        // Prevent multiple connection attempts
        if (this.connecting) return this.ws;
        if (this.ws?.readyState === WebSocket.OPEN) {
            return this.ws;
        }

        this.connecting = true;

        const authState = store.getState().auth;
        const token = authState?.token;

        if (!token) {
            this.connecting = false;
            return null;
        }

        const decode: any = jwtDecode(token);
        const userId = decode.UserInfo._id;
        
        this.ws = new WebSocket(`wss://dexl-todo-api.onrender.com?userId=${userId}`);

        this.ws.onopen = () => {
            this.connecting = false;
        };

        this.ws.onclose = () => {
            this.connecting = false;
            this.ws = null;
        };

        return this.ws;
    }

    disconnect() {
        if (this.ws) {
            // Add event listener to confirm close
            this.ws.onclose = () => {
                this.connecting = false;
                this.ws = null;
            };

            // Send close frame with code 1000 (normal closure)
            this.ws.close(1000, 'Client disconnecting');
            
        }
    }

    isWebSocketConnected() {
        return this.ws?.readyState === WebSocket.OPEN;
    }
}

export const wsService = WebSocketService.getInstance();