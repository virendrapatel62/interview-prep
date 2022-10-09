import { Fragment, useEffect, useId, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

import { getFakeData } from "../data/fakeStudents";

export const BulkDataHandler = () => {
  const [studentsList, setStudentsList] = useState();
  const [studentsLength, setStudentsLength] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(null);
  const [limit, setLimit] = useState(20);

  const dbRef = useRef();

  function handleOnchange({ target: { value } }) {
    console.log({ value });
    setSearch(value);
  }
  useEffect(() => {
    var gfgDb = openDatabase("mydb", "1.0", "Test DB", 2 * 1024 * 1024);
    dbRef.current = gfgDb;

    readStudentLength();
    readData();
  }, []);

  const readData = () => {
    console.log("Searching...");

    const offset = page * limit;
    let query = `SELECT * FROM STUDENTS  LIMIT ${limit} OFFSET ${offset} `;

    if (search) {
      query = `SELECT * FROM STUDENTS where name like '%${search}%' LIMIT ${limit} OFFSET ${offset} `;
    }
    transaction((tx) => {
      tx.executeSql(
        query,
        [],
        function (tx, { rows }) {
          setStudentsList(rows);
        },
        null
      );
    });
  };

  useEffect(() => {
    readData();
  }, [page, search, limit]);

  function transaction(callback) {
    dbRef.current.transaction(callback);
  }

  function createdb() {
    transaction(function (tx) {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS STUDENTS (id unique, name , age )"
      );
    });
  }

  function saveStudent() {
    dbRef.current.transaction((tx) => {
      getFakeData(10000).forEach(({ id, name, age }) => {
        tx.executeSql(
          `INSERT INTO STUDENTS (id, name,age) VALUES (? , ? , ?)`,
          [id, name, age],
          function (tx, { rowsAffected, insertId }) {},
          function (tx, error) {
            console.log(error);
          }
        );
      });

      readStudentLength();
    });
  }

  const readStudentLength = () => {
    transaction((tx) => {
      tx.executeSql(
        "select count(*) as length from STUDENTS",
        [],
        function (tx, { rows: [{ length }] }) {
          setStudentsLength((c) => length);
        }
      );
    });
  };

  return (
    <Fragment>
      <button onClick={createdb}>Create Table</button>
      <hr />
      <button onClick={saveStudent}>Save Random Students</button>{" "}
      <h5>Already Have {studentsLength} Records In DB</h5>
      <hr />
      <hr />
      {page}
      <button>Prev Page</button>
      <button onClick={() => setPage(page + 1)}>Next Page</button>
      <hr />
      <input
        type="text"
        placeholder="Search"
        onChange={handleOnchange}
        value={search}
      />
      <input
        type="text"
        placeholder="Limit"
        onChange={({ target: { value } }) => setLimit(+value)}
        value={limit}
      />
      <hr />
      <h4>Searching for {search}</h4>
      <ol>
        {!!studentsList?.length &&
          new Array(studentsList.length).fill().map((e, i) => {
            const student = studentsList.item(i);
            return (
              <li
                style={{ display: "inline-flex", minWidth: 200 }}
                key={student?.id}
              >
                {i + 1} : {student?.name}
              </li>
            );
          })}
      </ol>
    </Fragment>
  );
};
