import "expo-router/entry";

import { createServer, Response, Server } from "miragejs";

declare global {
  interface Window {
    server: Server;
  }
}

if (__DEV__) {
  if (window.server) {
    window.server.shutdown();
  }

  window.server = createServer({
    routes() {
      this.post("/login", (schema, request) => {
        const { username, password } = JSON.parse(request.requestBody);

        if (username !== "testuser" || password !== "password123") {
          return new Response(401, {}, { error: "Invalid credentials" });
        }

        return {
          accessToken: "access-token",
          refreshToken: "refresh-token",
          user: {
            id: "user-id",
          },
        };
      });
    },
  });
}
