class Plugin {
  constructor() {
    this.core = {};
    this.plugins = {};
  }

  call = async (name, params) => {
    const func = this.core[name] || this.plugins[name];
    const res = await func(...params);
    return res;
  };
  register(plugin) {
    const { name, exec } = plugin;
    this.plugins[name] = exec;
  }
}

export { Plugin };
