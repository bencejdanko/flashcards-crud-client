Major dependencies

- dockerview.dev

## Code editor live-editing structure

Live code editing is problem with various solutions and tradeoffs. There is the issue of client performance, server resources, offline edits, offline syncing, cloud updates, versioning, and reconciling changes. However, live edits and saves are almost ubiquitious in any contemporary, professional editing application.

### WebSockets

Summarily, I believe WebSockets to be a poor choice for code editors, because they add a layer of programatic complexity and unscalability that is unnecessary.

Essentially, Websockets will open an open two-way communications channel between the client and server. The server must allocate and monitor this resource constantly, iterating through it's list of open channels to send and listen to messages. 

This is not scalable, as it's not stateless.

### SSE (Server Side Events)

A unidirectional form of WebSockets; only the server can push data to clients.

This is stateless, as there is no need to track a connection or state changes on the client.

## Creating a sophisticated saving structure

The client subscribes to the resource using SSE. The client makes local changes, and these are saved to local storage. Periodically, an interval saves the localstorage contents to the server.