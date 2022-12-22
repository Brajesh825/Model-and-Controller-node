import { Plugin } from "../lib/plugin.js";

// Crud Plugin for a single group of entities
class Crud extends Plugin {
  constructor(name, schema, responseModel) {
    super();
    // dataStore
    this.dataList = {};
    // data storage of entity
    this.dataList[name] = [];
    // name of entity on which crud is performed
    this.name = name;
    // schema to validated data with
    this.schema = schema;
    // response model to send responses
    this.responses = responseModel;
    this.core = {
      Create: async (request, response) => {
        //Incoming Data
        let receivedData = request.body.data;
        // Setting ID
        receivedData.id = Date.now().toString();
        // Validator Work for input
        // to be done
        // Inserting into database
        let res = this.dataList[this.name].push(request.body.data);
        // if failed to insert
        if (!res) {
          // Setting status code
          let statusCode = this.responses.Create.onFailure.statusCode;
          // Setting Message
          let message = this.responses.Create.onFailure.message;
          // Sending response
          response.status(statusCode).json({
            message,
          });
          // returning false to signify that the operation failed
          return false;
        }
        // Setting status Code
        let statusCode = this.responses.Create.onSuccess.statusCode;
        // Setting Message
        let message = this.responses.Create.onSuccess.message;
        // Senfing Response
        response.status(statusCode).json({
          message,
          data: receivedData,
        });
        // returning false to signify that the operation was successfull
        return true;
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
      // Get All Item Contained within datalist
      GetAll: async (request, response) => {
        return this.dataList[this.name];
      },
      // return one item contained wthin datalist
      GetOne: async (request, response) => {
        let id = request.params.id;
        let res;
        for (const item of this.dataList) {
          if (item.id == request.params.id) {
            res = item;
            break;
          }
        }
        return res;
      },
    };
    this.plugins = {};
  }
}

export { Crud };
