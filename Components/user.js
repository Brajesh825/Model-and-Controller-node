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
    callback: crud.Create,
  },
  {
    name: "Delete",
    path: "/User/Delete/:id",
    method: "Delete",
    callback: crud.DeleteOne,
  },
  {
    name: "Update",
    path: "/User/Update/:id",
    method: "PATCH",
    callback: crud.Update,
  },
  {
    name: "Get All",
    path: "/User/GetALl",
    method: "POST",
    callback: crud.GetAll,
  },
  {
    name: "Get One",
    path: "/User/GetOne/id",
    method: "POST",
    callback: crud.GetOne,
  },
];


export { User};