import { Crud } from "../Plugin/Crud.js";

let crud = new Crud("Task", {
  name: {
    name: String,
  },
  status: {
    status: Boolean,
  },
});

let Tasks = [
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

export { Tasks };
