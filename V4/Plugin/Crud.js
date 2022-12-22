import { Plugin } from "../lib/plugin.js";
class Crud extends Plugin {
  constructor(name, schema, responseModel) {
    super()
    this.dataList = new Array();
    this.name = name;
    this.schema = schema;
    this.responses = responseModel;
    this.core = {
      Create: async (request, response) => {
        request.body.data.id = Date.now();
        let res = this.dataList.push(request.body.data);
        let receivedData = request.body.data;
        if (res) {
          let statusCode = this.responses.Create.onSuccess.statusCode;
          let message = this.responses.Create.onSuccess.message;
          let data = this.dataList;
          response.status(statusCode).json({
            message,
            data,
          });

          return true;
        } else {
          let statusCode = this.responses.Create.onFailure.statusCode;
          let message = this.responses.Create.onFailure.message;
          let data = data;

          response.status(statusCode).json({
            message,
          });
          return false;
        }
      },
      Update: async (request, response) => {},
      DeleteAll: async (request, response) => {},
      DeleteOne: async (request, response) => {
        let list = [];
        console.log(request.params.id);
        for (const item of this.dataList) {
          if (item.id != request.params.id) {
            list.push(item);
          }
        }
        this.dataList = list;
        response.json(this.dataList);
      },
      GetAll: async (request, response) => {
        return this.dataList;
      },
      GetOne: async (request, response) => {
        return this.dataList
      },
    };
    this.plugins = {};
  }

}

export { Crud };
