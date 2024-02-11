import app from "../app";
import supertest from "supertest";
import {status_code} from "../status-codes";
import {NOT_IMPLEMENTED} from "../error-msgs";

const request = supertest(app);

console.log("testing");

describe("end points test", () => {
  it('root return "Hello, World!"', async () => {
    const response = await request.get("/");
    expect(response.status).toBe(status_code.SUCCESS);
    expect(response.text).toBe("Hello, World!");
  });
  it("products api return 200", async () => {
    const response = await request.get("/products");
    expect(response.status).toBe(status_code.SUCCESS);
  });
  it("POST products api return not-implimented ", async () => {
    const response = await request.post("/products");
    expect(response.body.err).toBe(NOT_IMPLEMENTED.err);
  });
  it("login invalid credentials return 403 ", async () => {
    const response = await request.post("/login");
    expect(response.status).toBe(status_code.NOT_AUTHORIZED);
  });
  it("login valid credentials return token ", async () => {
    const response = await request.post("/login").send({
      "username": "kminchelle",
      "password": "0lelplR"
    });
    expect(response.body.token).toBeTruthy();
  });
  it("unauthorized chart ", async () => {
    const response = await request.post("/cart").send({11:2});
    expect(response.status).toBe(status_code.NOT_AUTHORIZED);
  });
  it('add to chart flow with valid cred',async ()=>{
    const response = await request.post("/login").send({
      "username": "kminchelle",
      "password": "0lelplR"
    });
    const token = response.body.token
    const cartResponse = await request.post('/cart').set('authorization', token).send({11:2})
    expect(cartResponse.statusCode).toBe(status_code.SUCCESS)
  })
  it("unknown should return 404 ", async () => {
    const response = await request.get("/unkonwn");
    expect(response.status).toBe(404);
  });
});
