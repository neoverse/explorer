let server = false;

export function setServer(val) {
  server = !!val;
}

export function isServer() {
  return server;
}
