import { Crud } from "../Plugin/Crud.js";
import { Auth } from "../Plugin/Auth.js";

// task Template
const taskTemplate = (task) => `
<section >
  <h3> ${task.name} </h3>  
  <h4> ${task.status} </h4>  
</section>
`;

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

// Defining Task Routes
// Create Task
const Create = {
  name: "Create",
  entity: "Task",
  model: {
    tasks: [],
  },
  view(model) {},
  controller: {
    name: "Create",
    path: "/Task/Create",
    method: "POST",
    // middleWare: [
    //   {
    //     callback: plugins.auth.call,
    //     name: "isAuthenticated",
    //     args: ["user", "admin", "moderator"],
    //   },
    // ],
    callback: plugins.crud.call,
  },
};
// Delete One Task
const DeleteOne = {
  name: "DeleteOne",
  entity: "Task",
  model: {
    tasks: [],
  },
  view(model) {},
  controller: {
    name: "DeleteOne",
    path: "/Task/Delete/:id",
    method: "Delete",
    callback: plugins.crud.call,
  },
};
// Get One Task
const GetOne = {
  name: "GetOne",
  entity: "Task",
  model: {
    tasks: [],
  },
  view(model) {
    if (!model) {
      return {
        html: `<h3>Not Found</h3>`,
        json: { message: "Not Found" },
      };
    }
    let json = model;
    let html = taskTemplate(json);

    return {
      html,
      json,
    };
  },
  controller: {
    name: "GetOne",
    path: "/Task/GetOne/:id",
    method: "Get",
    callback: plugins.crud.call,
  },
};
// Get All Task
const GetAll = {
  name: "GetAll",
  entity: "Task",
  model: {
    tasks: [],
  },
  view(model) {
    if (!model) {
      return {
        html: `<h3>Not Found</h3>`,
        json: { message: "List is Empty" },
      };
    }
    let json = model;
    let html = "";
    for (const task of model) {
      html += taskTemplate(task);
    }
    return {
      html,
      json,
    };
  },
  controller: {
    name: "GetAll",
    path: "/Task/GetAll",
    method: "Get",
    callback: plugins.crud.call,
  },
};

const Task = {
  Create,
  DeleteOne,
  GetOne,
  GetAll,
};

export { Task };
