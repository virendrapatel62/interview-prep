import { Fragment } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { friends } from "../data/list";
import { Title } from "../utils/Title";
import { BulkDataHandler } from "./BulkDataHandle";
import { ForwardRef } from "./ForwardRef";
import { FriendsOfFriend } from "./RecursiveList";
import { UseReducer } from "./UseReducer";

const Links = () => {
  return (
    <div>
      <Title>Links </Title>
      <S.Link>
        <Link to={"/forward-ref"}>ForWord Ref Example</Link>
      </S.Link>
      <S.Link>
        <Link to={"/recursive-component"}>Recursive Component</Link>
      </S.Link>
      <S.Link>
        <Link to={"/bulk-data"}>Bulk Data</Link>
      </S.Link>
      <S.Link>
        <Link to={"/use-reducer"}>Use Reducer</Link>
      </S.Link>
    </div>
  );
};

export const Routing = () => {
  return (
    <Fragment>
      <S.Container>
        <BrowserRouter>
          <S.LinksWrapper>
            <Links />
          </S.LinksWrapper>
          <S.RouteWrapper>
            <Routes>
              <Route path="/forward-ref" element={<ForwardRef />} />
              <Route
                path="/recursive-component"
                element={<FriendsOfFriend list={friends} />}
              />
              <Route path="/bulk-data" element={<BulkDataHandler />} />
              <Route path="/use-reducer" element={<UseReducer />} />
            </Routes>
          </S.RouteWrapper>
        </BrowserRouter>
      </S.Container>
    </Fragment>
  );
};

const S = {
  Link: styled.div`
    margin: 10px;
    border-bottom: 1px solid gray;
    padding: 8px 0px;
    border-radius: 2px;

    a {
      text-decoration: none;
    }
  `,

  Container: styled.div`
    display: flex;
  `,

  RouteWrapper: styled.div`
    flex-grow: 1;
    padding: 10px;
  `,
  LinksWrapper: styled.div`
    border-right: 2px solid gray;
    min-width: 15%;
    min-height: 100vh;
  `,
};
