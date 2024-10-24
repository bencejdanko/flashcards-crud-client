import { FreshContext } from "$fresh/server.ts";

export const handler = (_req: Request, _ctx: FreshContext): Response => {
    if (_req.headers.get("upgrade") !== "websocket") {
        return new Response(null, { status: 400 });
    }

    const { socket, response } = Deno.upgradeWebSocket(_req);

    socket.onmessage = (e) => {
        console.log("Recieved message from client: ", e.data);

        socket.send(e.data);
    };

    socket.onerror = (e) => {
        console.error("Socket error:", e);
    };

    socket.onclose = () => {
        console.log("Socket closed");
    };

    return response;
};
