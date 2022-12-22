import { Plugin } from "../lib/plugin.js";

class Auth extends Plugin {
  constructor() {
    super()
    
    this.core = {
      isAuthenticated: (req, res, data) => {
        return true;
      },
    };
  }
  call = async (fun, rr, data) => {
    let func = this.core[fun] || this.plugins[fun];
    // ... rr means request and response
    let res = await func(...rr, data);
    return res;
  };
}

export { Auth };
