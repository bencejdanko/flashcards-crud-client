import { FreshContext } from "$fresh/server.ts";
import type { ChangeSet } from "https://esm.sh/v135/@codemirror/state@6.4.1/dist/index.js";
const kv = await Deno.openKv("data.db");

import { Buffer, Signal, Change } from "../../models/socket_models.ts";

const clients = new Set<WebSocket>();

export const handler = (
    _req: Request,
    _ctx: FreshContext,
): Response => {
    if (_req.headers.get("upgrade") !== "websocket") {
        return new Response(null, { status: 400 });
    }

    const { socket, response } = Deno.upgradeWebSocket(_req);
    clients.add(socket);

    kv.get(["documents", "test"]).then((result) => {
        const data = result.value as string;
        const b: Buffer = {
            signal: Signal.INIT,
            value: data,
        };

        socket.send(JSON.stringify(b));
    });

    socket.onmessage = async (e) => {
        const buffer: Buffer = JSON.parse(e.data);

        if (buffer.signal === Signal.INIT) {
            const data = (await kv.get(["documents", "test"])).value as string;
            const b: Buffer = {
                signal: Signal.INIT,
                value: data,
            };

            socket.send(JSON.stringify(b));

            return;
        }

        if (buffer.signal === Signal.UPDATE) {


            //await kv.set(["documents", "test"], buffer.value);
            //const data = (await kv.get(["documents", "test"])).value as string;


            const changes = buffer.value as Change[];

            let doc = (await kv.get(["documents", "test"])).value as string;


            console.log("Received changes: ", changes);

            changes.forEach((change: Change) => {
                console.log(JSON.stringify(change));
                const [offset, text] = change.change;
                const start = doc.slice(0, offset);
                const end = doc.slice(offset + text.length);
                doc = start + text + end;
            });

            await kv.set(["documents", "test"], { value: doc });
            doc = (await kv.get(["documents", "test"])).value as string;

            const b: Buffer = {
                signal: Signal.UPDATE,
                value: doc,
            };

            for (const client of clients) {
                if (client !== socket && client.readyState === WebSocket.OPEN) {
                    console.log("Sending update to client: ", b);
                    client.send(JSON.stringify(b));
                }
            }

            return
        }
    };

    socket.onerror = (e) => {
        console.error("Socket error:", e);
    };

    socket.onclose = () => {
        console.log("Socket closed");
    };

    return response;
};
