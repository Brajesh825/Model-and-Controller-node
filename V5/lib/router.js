class Router {
  constructor() {
    this.routes = [];
    this.views = {};
  }
  addRoute(component) {
    const { name, path, method, middleWare, callback } = component?.controller;
    const entity = component.entity;
    this.routes.push({
      name,
      entity,
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
  addView(component) {
    // Checking whether this does component exist
    if (!this.views[component.entity]) {
      // creating views list for this component
      this.views[component.entity] = {};
    }
    // assigning function to views on actions on component
    this.views[component.entity][component.name] = component.view;
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
      console.log("Invalid Route");
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

    // Handling Controllers in schema
    let res = await route.callback(route.name, [request, response]);

    // Handling View
    // checking whether header is already sent
    if (!response.headerSent) {
      // Getting type of response
      let type = request?.query?.type || "HTML";

      // Calling Views
      let { json, html } = this.views[route.entity][route.name](res);
      if (type.toUpperCase() == "JSON") {
        // returning data as json
        return response.json(json);
      } else {
        // returning data as html
        response.setHeader("Content-Type", "text/html");
        return response.end(html);
      }
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
