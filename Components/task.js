import { Crud } from "../Plugin/Crud.js";

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

let crud = new Crud("Task", taskSchema, taskResponseModel);
let Task = [
  {
    name: "Create",
    path: "/Task/Create",
    method: "POST",
    callback: crud.Create,
  },
  {
    name: "Delete",
    path: "/Task/Delete/:id",
    method: "Delete",
    callback: crud.DeleteOne,
  },
  {
    name: "Update",
    path: "/Task/Update/:id",
    method: "PATCH",
    callback: crud.Update,
  },
  {
    name: "Get All",
    path: "/Task/GetALl",
    method: "POST",
    callback: crud.GetAll,
  },
  {
    name: "Get One",
    path: "/Task/GetOne/id",
    method: "POST",
    callback: crud.GetOne,
  },
];

export { Task };
