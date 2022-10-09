import { Fragment } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { friends } from "../data/list";
import { Title } from "../utils/Title";
import { BulkDataHandler } from "./BulkDataHandle";
import { ForwardRef } from "./ForwardRef";
import { FriendsOfFriend } from "./RecursiveList";

const Links = () => {
  return (
    <Fragment>
      <Title>Links </Title>
      <ul style={{ listStyle: "none", marginBottom: 30 }}>
        <li style={{ margin: 10 }}>
          <Link to={"/forward-ref"}>ForWord Ref Example</Link>
        </li>
        <li style={{ margin: 10 }}>
          <Link to={"/recursive-component"}>Recursive Component</Link>
        </li>
        <li style={{ margin: 10 }}>
          <Link to={"/bulk-data"}>Bulk Data</Link>
        </li>
      </ul>
    </Fragment>
  );
};

export const Routing = () => {
  return (
    <div>
      <BrowserRouter>
        <Links />
        <Routes>
          <Route path="/forward-ref" element={<ForwardRef />} />
          <Route
            path="/recursive-component"
            element={<FriendsOfFriend list={friends} />}
          />
          <Route path="/bulk-data" element={<BulkDataHandler />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
