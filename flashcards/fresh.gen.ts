// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_joke from "./routes/api/joke.ts";
import * as $api_socket from "./routes/api/socket.ts";
import * as $dashboard_index from "./routes/dashboard/index.tsx";
import * as $editor_index from "./routes/editor/index.tsx";
import * as $greet_name_ from "./routes/greet/[name].tsx";
import * as $index from "./routes/index.tsx";
import * as $Editor from "./islands/Editor.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/joke.ts": $api_joke,
    "./routes/api/socket.ts": $api_socket,
    "./routes/dashboard/index.tsx": $dashboard_index,
    "./routes/editor/index.tsx": $editor_index,
    "./routes/greet/[name].tsx": $greet_name_,
    "./routes/index.tsx": $index,
  },
  islands: {
    "./islands/Editor.tsx": $Editor,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
