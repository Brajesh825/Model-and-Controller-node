import http from "http";
import { Router } from "./router.js";
import { request } from "./request.js";
import { response } from "./response.js";
import { Parser } from "./parser.js";

const server = http.createServer();
const router = new Router();
const parser = new Parser();

import { Tasks } from "./Components/task.js";
router.addRoutes(Tasks);

import { Users } from "./Components/user.js";
router.addRoutes(Users);

server.on("request", async (req, res) => {
  request(req);
  response(res);
  await parser.parse(req);
  router.resolveRequest(req, res);
});

server.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
