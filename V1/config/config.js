const Config = {
  name: "Ehh Test",
  port: "4000",
  Core: {
    imports: {
      pre: {
        Http: "http",
        Process: "process",
      },
      post: {
        Router: "/lib/router.js",
        Request: "/lib/request.js",
        Response: "/lib/response.js",
        Parser: "/lib/parser.js",
      },
    },
  },
  Components: {
    Task: "/Components/task.js",
    // User: "/Components/user.js",
  },
};

export { Config };
