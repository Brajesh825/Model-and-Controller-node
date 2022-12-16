class Crud {
  constructor(schema, name) {
    this.dataList = new Array();
    (this.name = "Task"), (this.schema = ["taskName", "status"]);
  }
  // to be implemented
  Create = async (request, response) => {
    request.body.data.id = Date.now();
    this.dataList.push(request.body.data);
    response.json(this.dataList);
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
