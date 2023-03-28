const { test, expect } = require("@jest/globals");
const server = require("./server");
const request = require("supertest");

const apiMock = jest.fn((app, repository) => {
  app.get("/error", (req, res, next) => {
    throw new Error("Mock Error");
  });
});

test("Server Start", async () => {
  const app = await server.start(apiMock);
  expect(app).toBeTruthy();
});

test("Health Check", async () => {
  process.env.PORT = 3004;
  const app = await server.start(apiMock);
  const response = await request(app).get("/health");
  expect(response.status).toEqual(200);
});

test("Error Check", async () => {
  process.env.PORT = 6000;
  const app = await server.start(apiMock);
  const response = await request(app).get("/error");
  expect(response.status).toEqual(500);
});

test("Server Stop", async () => {
  const isStoped = await server.stop();
  expect(isStoped).toBeTruthy();
});
