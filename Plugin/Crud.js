class Crud {
  constructor(name, schema, responseModel) {
    this.dataList = new Array();
    this.name = name;
    this.schema = schema;
    this.responses = responseModel;
  }
  // to be implemented
  Create = async (request, response) => {
    request.body.data.id = Date.now();
    let res = this.dataList.push(request.body.data);
    let receivedData = request.body.data;
    // successFully Created Task
    if (res) {
      let statusCode = this.responses.Create.onSuccess.statusCode;
      let message = this.responses.Create.onSuccess.message;
      let data = receivedData;

      response.status(statusCode).json({
        message,
        data,
      });
    } else {
      let statusCode = this.responses.Create.onFailure.statusCode;
      let message = this.responses.Create.onFailure.message;
      let data = data;

      response.status(statusCode).json({
        message,
      });
    }
  };
  // to be implemented
  Update = async (request, response) => {};
  // to be implemented
  DeleteAll = async (request, response) => {};
  // implemented and tested
  DeleteOne = async (request, response) => {
    let list = [];
    console.log(request.params.id);
    for (const item of this.dataList) {
      if (item.id != request.params.id) {
        list.push(item);
      }
    }
    this.dataList = list;
    response.json(this.dataList);
  };
  // to be implemented
  GetAll = async (request, response) => {};

  // to be implemented
  GetOne = async (request, response) => {};
}

export { Crud };
