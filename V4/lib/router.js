class Router {
  constructor() {
    this.routes = [];
    this.views = {};
  }
  addRoute(controller) {
    const { name, path, method, middleWare, callback } = controller;
    this.routes.push({
      name,
      path,
      method,
      middleWare,
      callback,
    });
  }
  addRoutes(routes) {
    for (const route of routes) {
      let { name, path, method, middleWare, callback } = route;
      this.routes.push({
        name,
        path,
        method,
        middleWare,
        callback,
      });
    }
  }
  addView(name, exec) {
    this.views[name] = exec;
  }

  async resolveRequest(request, response) {
    const route = this.routes.find((route) => {
      let res = this.matchPath(route.path, request.url);
      if (res.matched) {
        request.params = res.params;
        console.log(response.params);
        return res;
      }
    });
    if (!route) {
      return response.json({
        Success: false,
      });
    }

    // Middle Ware Handling
    let middlewares = route?.middleWare;
    if (middlewares) {
      for (let i = 0; i < middlewares.length; i++) {
        const middleWare = middlewares[i];
        let res = await middleWare.callback(
          middleWare.name,
          [request, response],
          middleWare.args
        );
        if (res) {
          continue;
        } else {
          return response.status(400).json({ success: false });
        }
      }
    }

    // last method
    let res = await route.callback(route.name, [request, response]);

    if (!response.headerSent) {
      let result = this.views["GetOne"](res);

      return response.end(res);
    }
  }
  matchPath = (setupPath, currentPath) => {
    const setupPathArray = setupPath.split("/");
    const currentPathArray = currentPath.split("/");
    const setupArrayLength = setupPathArray.length;
    let match = true;
    let params = {};
    for (let i = 0; i < setupArrayLength; i++) {
      var route = setupPathArray[i];
      var path = currentPathArray[i];
      if (route[0] === ":") {
        params[route.substr(1)] = path;
      } else if (route === "*") {
        break;
      } else if (route !== path) {
        match = false;
        break;
      }
    }
    return match ? { matched: true, params } : { matched: false };
  };
}
export { Router };
