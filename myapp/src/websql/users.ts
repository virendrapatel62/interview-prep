import { getFakeData } from "../data/fakeStudents";
import { Student } from "./types";

const DB_NAME = "mydb";
const databse = window.openDatabase(DB_NAME, "1.0", "Test DB", 100);

enum COLUMNS {
  id = "id",
  name = "name",
  age = "age",
}
const TABLE_NAME = "STUDENTS";
const QUERIES = {
  GET_COUNT: `SELECT COUNT(*) AS count FROM ${TABLE_NAME}`,
  CERATE_TABLE: `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (${COLUMNS.id} unique, ${COLUMNS.name} , ${COLUMNS.age} )`,
  INSERT_ONE_STUDENT: `INSERT INTO ${TABLE_NAME} (${COLUMNS.id}, ${COLUMNS.name},${COLUMNS.age}) VALUES (? , ? , ?)`,
  INSERT_MANY_STUDENT: (students: Student[]) => {
    let query = `INSERT INTO ${TABLE_NAME} 
    (${COLUMNS.id}, ${COLUMNS.name},${COLUMNS.age}) 
    VALUES ${students
      .map(({ id, name, age }) => {
        return ` ("${id}" , "${name}" , ${age})`;
      })
      .join(",")}`;

    return query;
  },
  GET_STUDENTS: (limit: number, offset: number, search?: string) => {
    let query = `SELECT * FROM STUDENTS  LIMIT ${limit} OFFSET ${offset} `;
    if (search) {
      query = `SELECT * FROM STUDENTS where name like '%${search}%' LIMIT ${limit} OFFSET ${offset} `;
    }

    return query;
  },
};

export const createStudentTable = () => {
  return new Promise<SQLResultSet>((resolve, reject) => {
    databse.transaction(function (transaction) {
      transaction.executeSql(
        QUERIES.CERATE_TABLE,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const getStudentCount = () => {
  return new Promise<number>((resolve, reject) => {
    databse.transaction((transaction) => {
      transaction.executeSql(
        QUERIES.GET_COUNT,
        [],
        (_, result) => {
          const count: number = result.rows.item(0).count;
          resolve(count);
        },
        (_m, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const saveStudent = (students: Student[]) => {
  const query = QUERIES.INSERT_MANY_STUDENT(students);
  return new Promise<SQLResultSet>((resolve, reject) => {
    databse.transaction((tranaction) => {
      tranaction.executeSql(
        query,
        [],
        // [id, name, age],
        (_, result) => resolve(result),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const getStudent = (search: string = "", limit = 20, page = 1) => {
  const offset = (page - 1) * limit;

  return new Promise<SQLResultSet>((resolve, reject) => {
    databse.transaction((transaction) => {
      transaction.executeSql(
        QUERIES.GET_STUDENTS(limit, offset, search),
        [],
        (_, result) => resolve(result),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};
