import { Crud } from "../Plugin/Crud.js";
import { Auth } from "../Plugin/Auth.js";

const Task = new Object();

// task model
Task.model = {
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
Task.response = {
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
Task.plugins = {
  crud: new Crud("Task", Task.model, Task.response),
  auth: new Auth(),
};

// task controllers
Task.controller = [
  {
    name: "Create",
    path: "/Task/Create",
    method: "POST",
    middleWare: [
      {
        callback: Task.plugins.auth.call,
        name: "isAuthenticated",
        args: ["user", "admin", "moderator"],
      },
    ],
    callback: Task.plugins.crud.call,
  },
  {
    name: "DeleteOne",
    path: "/Task/Delete/:id",
    method: "Delete",
    callback: Task.plugins.crud.call,
  },
  {
    name: "Update",
    path: "/Task/Update/:id",
    method: "PATCH",
    callback: Task.plugins.crud.call,
  },
  {
    name: "GetAll",
    path: "/Task/GetALl",
    method: "POST",
    callback: Task.plugins.crud.call,
  },
  {
    name: "GetOne",
    path: "/Task/GetOne/id",
    method: "POST",
    callback: Task.plugins.crud.call,
  },
];

// console.log(Task);

export { Task };
