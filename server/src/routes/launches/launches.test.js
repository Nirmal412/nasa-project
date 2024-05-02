const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("should respond with 200", async () => {
    // const response = await request(app).get("/launches");
    // expect(response.statusCode).toBe(200);

    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Test POST /launches", () => {
  const completeLaunchData = {
    mission: "MD155",
    rocket: "MD Appolo 11",
    target: "kepler-186 f",
    launchDate: "january 26 2030",
  };

  const launchDataWithoutDate = {
    mission: "MD155",
    rocket: "MD Appolo 11",
    target: "kepler-186 f",
  };

  const launchDataWithInvalidDate = {
    mission: "MD155",
    rocket: "MD Appolo 11",
    target: "kepler-186 f",
    launchDate: "hoo",
  };

  test("should respond with 201 created", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responceDate = new Date(response.body.launchDate).valueOf();

    expect(requestDate).toBe(responceDate);

    expect(response.body).toMatchObject(launchDataWithoutDate);
  });

  test("should catch missing required properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Missing required launch property",
    });
  });

  test("should catch invalid Dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid launch date",
    });
  });
});
