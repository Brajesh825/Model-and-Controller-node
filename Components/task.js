import { Crud } from "../Plugin/Crud.js";

class Auth {
  call = async (fun, rr, data) => {
    let res = await this[fun](...rr, data);
    return res;
  };

  isAuthenticated = (req, res, data) => {
    return true;
  };
}

let auth = new Auth();

let taskSchema = {
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

let taskResponseModel = {
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

const crud = new Crud("Task", taskSchema, taskResponseModel);

let Task = [
  {
    name: "Create",
    path: "/Task/Create",
    method: "POST",
    middleWare: [
      {
        callback: auth.call,
        name: "isAuthenticated",
        args: ["user", "admin", "moderator"],
      },
    ],
    callback: crud.call,
  },
  {
    name: "DeleteOne",
    path: "/Task/Delete/:id",
    method: "Delete",
    callback: crud.call,
  },
  {
    name: "Update",
    path: "/Task/Update/:id",
    method: "PATCH",
    callback: crud.call,
  },
  {
    name: "GetAll",
    path: "/Task/GetALl",
    method: "POST",
    callback: crud.call,
  },
  {
    name: "GetOne",
    path: "/Task/GetOne/id",
    method: "POST",
    callback: crud.call,
  },
];

export { Task };
