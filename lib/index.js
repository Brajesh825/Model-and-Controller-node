import { Importable } from "./interface/importables.js";
class Core extends Importable {
  constructor(config) {
    super(config.Core);
    this.config = config;
    this.Components = {};
  }

  construct() {
    this.classList = {};
    this.modules = {};
    this.functions = {};
    this.activeComponents = {};
    this.instances = {};

    // classifying classes
    this.classList["Router"] = this.imports["Router"]["Router"];
    this.classList["Parser"] = this.imports["Parser"]["Parser"];

    // classifying functions
    this.functions["request"] = this.imports["Request"]["request"];
    this.functions["response"] = this.imports["Response"]["response"];

    // working routes
    this.activeComponents["User"] = this.Components["User"]["User"];
    this.activeComponents["Task"] = this.Components["Task"]["Task"];

    // instances
    this.instances.router = new this.classList.Router();
    this.instances.parser = new this.classList.Parser();

  }

  async loadComponents() {
    let componentList = this.config.Components;
    for (const componentKey in componentList) {
      let component = await import(this.path + componentList[componentKey]);
      this.Components[componentKey] = component;
    }
  }

  async startComponents() {
    this.instances.router.addRoutes(this.activeComponents["User"]);
    this.instances.router.addRoutes(this.activeComponents["Task"]);
  }

  async init() {
    await this.importModules({ importType: "pre" });
    // setting the root path for our core
    this.setRoot(this.imports.Process.cwd());
    // post modules are modules which needs some pre modules to be used
    await this.importModules({ importType: "post" });
    await this.loadComponents();

    await this.construct();
    await this.startComponents();
  }

  async start() {
    await this.init();

    await this.startServer();
  }

  async startServer() {
    const server = this.imports.Http.createServer();
    server.on("request", async (req, res) => {
      this.functions.request(req);
      this.functions.response(res);
      await this.instances.parser.parse(req);
      this.instances.router.resolveRequest(req, res);
    });

    server.listen(this.config.port, () => {
      console.log("Server is listening on port 4000");
    });
  }
}

export { Core };
