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
// Create Task
const Create = {
  name: "Create",
  model: {
    tasks: [],
  },
  view(model) {},
  controller: {
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
};
// Delete One
const DeleteOne = {
  name: "DeleteOne",
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
// Get All
const GetOne = {
  name: "GetOne",
  model: {
    tasks: [],
  },
  view(model) {
    if (model && !model[0]) {
      return `<h3>Not Fount</h3>`;
    }
    let item = model[0];

    let html = `
    <ul>
      <li>
        name : ${item?.name}
      </li>
      <li>
        status : ${item?.name}
      </li>
      <li>
        id : ${item.id}
      </li>
    </ul>`

    console.log(html);

    return html;
  },
  controller: {
    name: "GetOne",
    path: "/Task/GetOne/:id",
    method: "Get",
    callback: plugins.crud.call,
  },
};

const Task = {
  Create,
  DeleteOne,
  GetOne,
};

export { Task };
