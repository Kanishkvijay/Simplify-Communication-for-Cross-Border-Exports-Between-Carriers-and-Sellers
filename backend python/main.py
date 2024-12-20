from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from deep_translator import GoogleTranslator
from fastapi.responses import HTMLResponse

app = FastAPI()

# Store connected clients: {client_id: websocket}
clients = {}

@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await websocket.accept()
    clients[client_id] = websocket
    try:
        while True:
            # Receive message from a client
            data = await websocket.receive_text()
            # Example format: {"to": "target_client", "text": "message", "lang": "en"}
            parsed_data = eval(data)
            message = parsed_data["text"]
            target_lang = parsed_data["lang"]
            target_client = parsed_data["to"]

            # Translate the message
            translated_message = GoogleTranslator(source='auto', target=target_lang).translate(message)

            # Send the message to the target client
            if target_client in clients:
                await clients[target_client].send_text(f"From {client_id}: {translated_message}")
            else:
                await websocket.send_text(f"User {target_client} is not connected.")
    except WebSocketDisconnect:
        # Remove client on disconnect
        del clients[client_id]

@app.get("/")
async def read_root():
    return HTMLResponse("<h1>WebSocket Chat Server is running</h1>")
