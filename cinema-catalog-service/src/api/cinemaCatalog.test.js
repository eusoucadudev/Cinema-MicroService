const { test, expect, beforeAll, afterAll } = require("@jest/globals");
const server = require("../server/server");
const cinemaCatalog = require("./cinemaCatalog");
const request = require("supertest");
const repositoryMock = require("../repository/__mocks__/repository");

const adminToken = "1";

const guestToken = "2";

jest.mock("../node_modules/jsonwebtoken", () => {
  return {
    verify: (token) => {
      if (token === adminToken) return { userId: 1, profileId: 1 }; //ADMIN
      else if (token === guestToken) return { userId: 2, profileId: 2 }; //GUEST
      else throw new Error("Inválid Token!");
    },
  };
});

let app = null;

beforeAll(async () => {
  process.env.PORT = 3010;
  app = await server.start(cinemaCatalog, repositoryMock);
});

afterAll(async () => {
  await server.stop();
});

test("GET /cities 200 OK", async () => {
  const response = await request(app)
    .get("/cities")
    .set("authorization", `Bearer ${adminToken}`);
  expect(response.status).toEqual(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body.length).toBeTruthy();
});

test("GET /cities 401", async () => {
  const response = await request(app).get("/cities");
  expect(response.status).toEqual(401);
});

test("GET /cities 401 UNAUTHORIZED (token error)", async () => {
  const response = await request(app)
    .get("/cities")
    .set("authorization", `Bearer 3`);
  expect(response.status).toEqual(401);
});

test("GET /cities/:cityId/movies 200 OK", async () => {
  const testCityId = "1";
  const response = await request(app)
    .get(`/cities/${testCityId}/movies`)
    .set("authorization", `Bearer ${adminToken}`);
  expect(response.status).toEqual(200);
  expect(response.body).toBeTruthy();
});

test("GET /cities/:cityId/movies 401", async () => {
  const testCityId = "1";
  const response = await request(app).get(`/cities/${testCityId}/movies`);
  expect(response.status).toEqual(401);
});

test("GET /cities/:cityId/movies 404 NOT FOUND", async () => {
  const testCityId = "-1";
  const response = await request(app)
    .get(`/cities/${testCityId}/movies`)
    .set("authorization", `Bearer ${adminToken}`);
  expect(response.status).toEqual(404);
});

test("GET /cities/:cityId/movies/:movieId 200 OK", async () => {
  const testCityId = "1";
  const testMovieId = "1";
  const response = await request(app)
    .get(`/cities/${testCityId}/movies/${testMovieId}`)
    .set("authorization", `Bearer ${adminToken}`);
  expect(response.status).toEqual(200);
  expect(response.body).toBeTruthy();
});

test("GET /cities/:cityId/movies/:movieId 401", async () => {
  const testCityId = "1";
  const testMovieId = "1";
  const response = await request(app).get(
    `/cities/${testCityId}/movies/${testMovieId}`
  );
  expect(response.status).toEqual(401);
});

test("GET /cities/:cityId/movies/:movieId 404 NOT FOUND", async () => {
  const testCityId = "1";
  const testMovieId = "-1";
  const response = await request(app)
    .get(`/cities/${testCityId}/movies/${testMovieId}`)
    .set("authorization", `Bearer ${adminToken}`);
  expect(response.status).toEqual(404);
});

test("GET /cities/:cityId/cinemas 200 OK", async () => {
  const testCityId = "1";
  const response = await request(app)
    .get(`/cities/${testCityId}/cinemas`)
    .set("authorization", `Bearer ${adminToken}`);
  expect(response.status).toEqual(200);
  expect(response.body).toBeTruthy();
});

test("GET /cities/:cityId/cinemas 401", async () => {
  const testCityId = "1";
  const response = await request(app).get(`/cities/${testCityId}/cinemas`);
  expect(response.status).toEqual(401);
});

test("GET /cities/:cityId/cinemas 404 NOT FOUND", async () => {
  const testCityId = "-1";
  const response = await request(app)
    .get(`/cities/${testCityId}/cinemas`)
    .set("authorization", `Bearer ${adminToken}`);
  expect(response.status).toEqual(404);
});

test("GET /cinemas/:cinemaId/movies 200 OK", async () => {
  const testCinemaId = "1";
  const response = await request(app)
    .get(`/cinemas/${testCinemaId}/movies`)
    .set("authorization", `Bearer ${adminToken}`);
  expect(response.status).toEqual(200);
  expect(response.body).toBeTruthy();
});

test("GET /cinemas/:cinemaId/movies 401", async () => {
  const testCinemaId = "1";
  const response = await request(app).get(`/cinemas/${testCinemaId}/movies`);
  expect(response.status).toEqual(401);
});

test("GET /cinemas/:cinemaId/movies 404 NOT FOUND", async () => {
  const testCinemaId = "-1";
  const response = await request(app)
    .get(`/cinemas/${testCinemaId}/movies`)
    .set("authorization", `Bearer ${adminToken}`);
  expect(response.status).toEqual(404);
});

test("GET /cinemas/:cinemaId/movies/:movieId 200 OK", async () => {
  const testCinemaId = "1";
  const testMovieId = "1";
  const response = await request(app)
    .get(`/cinemas/${testCinemaId}/movies/${testMovieId}`)
    .set("authorization", `Bearer ${adminToken}`);
  expect(response.status).toEqual(200);
  expect(response.body).toBeTruthy();
});

test("GET /cinemas/:cinemaId/movies/:movieId 401", async () => {
  const testCinemaId = "1";
  const testMovieId = "1";
  const response = await request(app).get(
    `/cinemas/${testCinemaId}/movies/${testMovieId}`
  );
  expect(response.status).toEqual(401);
});

test("GET /cinemas/:cinemaId/movies/:movieId 404 NOT FOUND", async () => {
  const testCinemaId = "1";
  const testMovieId = "-1";
  const response = await request(app)
    .get(`/cinemas/${testCinemaId}/movies/${testMovieId}`)
    .set("authorization", `Bearer ${adminToken}`);
  expect(response.status).toEqual(404);
});
