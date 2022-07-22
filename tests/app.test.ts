import supertest from "supertest";
import app from "../src/app.js";
import prisma from "../src/config/db.js";
import * as userFactory from "./factories/userFactory.js";
import * as noteFactory from "./factories/noteFactory.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "Users" CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Notes" CASCADE`;
});

describe("User tests suite", () => {
  it("given email and password, create user", async () => {
    const login = userFactory.createLogin();
    const response = await supertest(app).post(`/signup`).send(login);
    expect(response.status).toBe(201);

    const user = await prisma.users.findFirst({
      where: { email: login.email },
    });
    expect(user.email).toBe(login.email);
  });
});

describe("Notes test suite", () => {
  it("create a note", async () => {
    const login = userFactory.createLogin();
    await userFactory.createUser(login);
    let response = await supertest(app).post(`/signin`).send(login);
    const token = response.text;

    const note = noteFactory.noteBody();
    response = await supertest(app)
      .post("/create-note")
      .send(note)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(201);
    const savedNote = await prisma.notes.findFirst({
      where: { title: note.title },
    });
    expect(savedNote).not.toBeNull();
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
