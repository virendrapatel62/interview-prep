import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";

export const getFakeData = (count) =>
  new Array(count).fill().map(() => ({
    id: uuid(),
    name: faker.name.fullName(),
    age: faker.datatype.number(100),
  }));
