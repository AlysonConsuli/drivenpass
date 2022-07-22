import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import prisma from "../../src/config/db.js";
import { UserInsertData } from "../../src/services/authService.js";

export const createLogin = (email = "test@test.com", passwordLength = 10) => {
  return {
    email,
    password: faker.internet.password(passwordLength),
  };
};

export const createUser = async (login: UserInsertData) => {
  const user = await prisma.users.create({
    data: {
      email: login.email,
      password: bcrypt.hashSync(login.password, 10),
    },
  });

  return { ...user, plainPassword: login.password };
};
