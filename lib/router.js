class Router {
  constructor() {
    this.routes = [];
  }

  addRoute(name, path, method, callback) {
    this.routes.push({
      name,
      path,
      method,
      callback,
    });
  }

  addRoutes(routes) {
    for (const route of routes) {
      let { name, path, method, callback } = route;
      this.routes.push({
        name,
        path,
        method,
        callback,
      });
    }
  }

  resolveRequest(request, response) {
    const route = this.routes.find((route) => {
      let res = this.matchPath(route.path, request.url);
      if (res.matched) {
        request.params = res.params;
        console.log(response.params);
        return res;
      }
    });
    if (!route) {
      response.json({
        Success: false,
      });
    }

    route.callback(request, response);
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
