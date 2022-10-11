import {
  ChangeEventHandler,
  Fragment,
  SyntheticEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { getFakeData } from "../data/fakeStudents";
import {
  createStudentTable,
  getStudent,
  getStudentCount,
  saveStudent,
} from "../websql/users";

export const BulkDataHandler = () => {
  const [studentsListSQLResultSet, setStudentsListSQLResultSet] =
    useState<SQLResultSet>();
  const [studentCount, setStudentCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(40);

  useEffect(() => {
    createStudentTable().then(() => {
      console.log("Table Created...");
      getStudentCount().then(setStudentCount);
      getStudent(search, limit, page).then((result) => {
        setStudentsListSQLResultSet(result);
      });
    });
  }, []);

  useEffect(() => {
    getStudent(search, limit, page).then((result) => {
      setStudentsListSQLResultSet(result);
    });
  }, [page, search, limit]);

  const handleSaveStudent = () => {
    saveStudent(getFakeData(100000)).then((result) => {
      console.log({ rowsAffected: result.rowsAffected });
      getStudentCount().then(setStudentCount);
    });
  };

  const handleOnchange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setSearch(value);
  };

  const handlePageChange = (value: number) => {
    setPage((page) => {
      if (page + value < 1) return page;

      return page + value;
    });
  };

  const handleLimitChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setLimit(isNaN(+value) ? 40 : +value);
  };

  return (
    <Fragment>
      <div>
        <button onClick={handleSaveStudent}>Save 50 Random Students</button>
        <h5>We Have {studentCount} Records In DB</h5>
      </div>
      <hr />
      <div>
        <button onClick={() => handlePageChange(-1)}>Prev Page</button>
        <span>Current Page : {page}</span>
        <button onClick={() => handlePageChange(1)}>Next Page</button>
      </div>
      <hr />
      <div>
        <input
          type="text"
          placeholder="Search"
          onChange={handleOnchange}
          value={search}
        />
        <input
          type="text"
          placeholder="Limit"
          onChange={handleLimitChange}
          value={limit}
        />
      </div>
      <hr />
      <h4>Searching for {search}</h4>
      <ol>
        {!!studentsListSQLResultSet?.rows.length &&
          new Array(studentsListSQLResultSet.rows.length)
            .fill(null)
            .map((e, i) => {
              const student = studentsListSQLResultSet.rows.item(i);
              return (
                <li
                  style={{ display: "inline-flex", minWidth: 200 }}
                  key={student?.id}
                >
                  {(page - 1) * limit + (i + 1)} : {student?.name}
                </li>
              );
            })}
      </ol>
    </Fragment>
  );
};
