const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");

beforeAll(async () => {
  await sequelize.sync();   // ✅ CREATE TABLES
});

afterAll(async () => {
  await sequelize.close();  // ✅ CLEANUP
});


describe("Health API", () => {
  it("should return 200 and status ok", async () => {
    const res = await request(app).get("/health");

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});

describe("Full Export API", () => {
  it("should trigger full export", async () => {
    const res = await request(app)
      .post("/exports/full")
      .set("X-Consumer-ID", "test-consumer");

    expect(res.statusCode).toBe(202);
  });
});

describe("Incremental Export API", () => {
  it("should trigger incremental export", async () => {
    const res = await request(app)
      .post("/exports/incremental")
      .set("X-Consumer-ID", "test-consumer");

    expect(res.statusCode).toBe(202);
  });
});

describe("Delta Export API", () => {
  it("should trigger delta export", async () => {
    const res = await request(app)
      .post("/exports/delta")
      .set("X-Consumer-ID", "test-consumer");

    expect(res.statusCode).toBe(202);
  });
});

describe("Watermark API", () => {
  it("should return 404 for new consumer", async () => {
    const res = await request(app)
      .get("/exports/watermark")
      .set("X-Consumer-ID", "new-consumer");

    expect(res.statusCode).toBe(404);
  });
});