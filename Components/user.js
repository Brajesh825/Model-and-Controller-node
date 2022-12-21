import { Crud } from "../Plugin/Crud.js";

let crud = new Crud("User", {
  name: {
    type: String,
  },
  email: {
    type: Boolean,
  },
  password: {
    type: String,
  },
});

let User = [
  {
    name: "Create",
    path: "/User/Create",
    method: "POST",
    callback: crud.call,
  },
  {
    name: "Delete",
    path: "/User/Delete/:id",
    method: "Delete",
    callback: crud.call,
  },
  {
    name: "Update",
    path: "/User/Update/:id",
    method: "PATCH",
    callback: crud.call,
  },
  {
    name: "GetAll",
    path: "/User/GetALl",
    method: "POST",
    callback: crud.call,
  },
  {
    name: "GetOne",
    path: "/User/GetOne/id",
    method: "POST",
    callback: crud.call,
  },
];

export { User };
