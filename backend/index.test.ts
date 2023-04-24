const request = require("supertest")("https://jsonplaceholder.typicode.com");
const expect = require("chai").expect;

// The index.ts has a set of endpoints which has to be tested for its API.
// There are a few endpoints which includes 2 post, 1 get and 1 delete request

// The Below test is performed to fetch "https://jsonplaceholder.typicode.com/todos" 
// which returns a list of Todo items 
describe("GET /todos", function () {
  it("returns all the todo items from the API link", async function () {
    const response = await request.get("/todos");

    expect(response.status).to.eql(200);
    expect(response.body.length).to.eql(200);
  });
});

// The Below test is performed to post data to "https://jsonplaceholder.typicode.com/todos" 
// which returns a status of 201 to confirm the post request successful 
describe("POST /todos", function () {
  it("add the record of todo item", async function () {
    const response = await request
      .post("/todos")
      .send({ userId: 11,
      id: 201,
      title: "Calculate the Area of Square",
      completed: true
  });

    expect(response.status).to.eql(201);

    const attributes = response.body;

    expect(attributes.userId).to.eql(11);
    expect(attributes.id).to.eql(201);
    expect(attributes.title).to.eql('Calculate the Area of Square');
    expect(attributes.completed).to.eql(true);

  });
});

// The Below test is performed to delete a record from "https://jsonplaceholder.typicode.com/todos" 
// which returns an empty object {}
describe("DELETE /todos", function () {
  it("delete the record from todo items", async function () {
    const response = await request
      .post("/todos")
      .send({ userId: 11,
      id: 201,
      title: "Calculate the Area of Square",
      completed: true
  });

    expect(response.status).to.eql(201);

    const deleteId = response.body.id;

    const deleteResponse = await request.delete(`/todos/${deleteId}`)
    expect(deleteResponse.body).to.eql({})
  });
});
