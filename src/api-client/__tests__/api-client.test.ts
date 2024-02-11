import api from "../api";


describe("end points test", () => {
  it('api client must have base url ', async () => {
    expect(api.defaults.baseURL).toEqual("https://dummyjson.com/");
  });
});
