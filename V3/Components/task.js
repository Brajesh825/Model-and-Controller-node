import { Crud } from "../Plugin/Crud.js";
import { Auth } from "../Plugin/Auth.js";

// task schema
let schema = {
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  status: {
    type: Boolean,
  },
};

// task response
let response = {
  statusCode: "400",
  Create: {
    name: "Create",
    onSuccess: {
      statusCode: "201",
      message: "Task SuccessFully Created",
      return: ["id", "name", "status"],
    },
    onFailure: {
      statusCode: "400",
      message: "Task Failed To Create",
      return: [],
    },
  },
};

// task plugins
let plugins = {
  crud: new Crud("Task", schema, response),
  auth: new Auth(),
};

const Task = {
  model: {
    tasks: [],
  },
  view(model) {},
  controllers: [
    {
      name: "Create",
      path: "/Task/Create",
      method: "POST",
      middleWare: [
        {
          callback: plugins.auth.call,
          name: "isAuthenticated",
          args: ["user", "admin", "moderator"],
        },
      ],
      callback: plugins.crud.call,
    },
    {
      name: "DeleteOne",
      path: "/Task/Delete/:id",
      method: "Delete",
      callback: plugins.crud.call,
    },
    {
      name: "Update",
      path: "/Task/Update/:id",
      method: "PATCH",
      callback: plugins.crud.call,
    },
    {
      name: "GetAll",
      path: "/Task/GetALl",
      method: "POST",
      callback: plugins.crud.call,
    },
    {
      name: "GetOne",
      path: "/Task/GetOne/id",
      method: "POST",
      callback: plugins.crud.call,
    },
  ],
};

export { Task };
