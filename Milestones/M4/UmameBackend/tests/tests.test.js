const request = require("supertest");
const app = require("../app");
const Recipe = require("../models/recipe");
const User = require("../models/user");

describe("Creating a new collection", () => {
  it("valid request", async () => {
    const response = await request(app).post("/collection/create").send({
      userID: "653d7711fa73521ba58e532a",
      recipeID: "653e953eba8bd6face7a7ea8",
      name: "Test Collection",
    });

    try {
      await User.updateOne(
        { email: "mehtabkhalid2501@gmail.com" },
        { $pull: { recipeCollection: { name: "Test Collection" } } }
      );
    } catch {
      console.log("Could not delete test collection");
    }

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Success");
  });
});

//invalid id
describe("Creating a new collection", () => {
  it("invalid ID", async () => {
    const response = await request(app).post("/collection/create").send({
      userID: "xxxxxxxxxxxxxxxxxxxxxxxxx",
      recipeID: "653e953eba8bd6face7a7ea8",
      name: "Test Collection",
    });

    expect(response.status).toBe(500);
  });
});

//invalid recipe
describe("Creating a new collection", () => {
  it("invalid recipeID", async () => {
    const response = await request(app).post("/collection/create").send({
      userID: "653d7711fa73521ba58e532a",
      recipeID: "xxxxxxxxxxxxxxxxxxxxxxxxx",
      name: "Test Collection",
    });

    expect(response.status).toBe(500);
  });
});

describe("Visiting home page", () => {
  it("valid request", async () => {
    const response = await request(app).get("/home");

    expect(response.status).toBe(200);
    expect(response.body.recipes).toBeDefined();
  });
});

describe("Creating account", () => {
  it("valid request", async () => {
    const response = await request(app).post("/signup").send({
      name: "Test User",
      username: "test123",
      email: "testEmail@mail.com",
      password: "testPass",
    });

    try {
      await User.deleteOne({ email: "testEmail@mail.com" });
    } catch {
      console.log("Could not delete test email");
    }

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("Boolean", true);
  });
});

//invalid email
describe("Creating account", () => {
  it("invalid/existing email", async () => {
    const response = await request(app).post("/signup").send({
      name: "Test User",
      username: "test123",
      email: "mehtabkhalid2501@gmail.com",
      password: "testPass",
    });

    expect(response.status).toBe(422);
    expect(response.body.Boolean).toBeUndefined();
  });
});

describe("Posting recipe", () => {
  it("valid request", async () => {
    const response = await request(app).post("/post").send({
      name: "Test Recipe",
      recipeOwner: "653d7711fa73521ba58e532a",
    });

    try {
      await Recipe.deleteOne({ name: "Test Recipe" });
    } catch {
      console.log("Could not delete test recipe");
    }

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Success");
  });
});

//invalid user id
describe("Posting recipe", () => {
  it("invalid user id", async () => {
    const response = await request(app).post("/post").send({
      name: "Test Recipe",
      recipeOwner: "xxxxxxxxxxxxxxxxxxxxxxxxx",
    });

    expect(response.status).toBe(500);
  });
});

//name
describe("Searching recipes", () => {
  it("valid request: name", async () => {
    const response = await request(app).post("/search").send({
      searchTerm: "pizza",
      searchType: "name"
    });

    expect(response.status).toBe(200);
    expect(response.body.recipes).toBeDefined();
  });
});

//invalid name search
describe("Searching recipes", () => {
  it("invalid request: name", async () => {
    const response = await request(app).post("/search").send({
      searchTerm: "",
      searchType: "name"
    });

    expect(response.status).toBe(422);
  });
});

//tags
describe("Searching recipes", () => {
  it("valid request: tags", async () => {
    const response = await request(app).post("/search").send({
      searchTerm: "winter",
      searchType: "tag"
    });

    expect(response.status).toBe(200);
    expect(response.body.recipes).toBeDefined();
  });
});

//invalid tags search
describe("Searching recipes", () => {
  it("invalid request: tags", async () => {
    const response = await request(app).post("/search").send({
      searchTerm: "",
      searchType: "tag"
    });

    expect(response.status).toBe(422);
  });
});

//ingredients
describe("Searching recipes", () => {
  it("valid request: ingredient", async () => {
    const response = await request(app).post("/search").send({
      searchTerm: "chicken",
      searchType: "ingredient"
    });

    expect(response.status).toBe(200);
    expect(response.body.recipes).toBeDefined();
  });
});

//invalid ingredients search
describe("Searching recipes", () => {
  it("invalid request: ingredients", async () => {
    const response = await request(app).post("/search").send({
      searchTerm: "",
      searchType: "ingredient"
    });

    expect(response.status).toBe(422);
  });
});

//users
describe("Searching recipes", () => {
  it("valid request: user", async () => {
    const response = await request(app).post("/search").send({
      searchTerm: "Khalid",
      searchType: "user"
    });

    expect(response.status).toBe(200);
    expect(response.body.users).toBeDefined();
  });
});

//invalid users search
describe("Searching recipes", () => {
  it("invalid request: users", async () => {
    const response = await request(app).post("/search").send({
      searchTerm: "",
      searchType: "user"
    });

    expect(response.status).toBe(422);
  });
});

