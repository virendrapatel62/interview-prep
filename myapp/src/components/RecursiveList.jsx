import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { Title } from "../utils/Title";

export const FriendsOfFriend = ({ list: friends }) => {
  return (
    <Fragment>
      <Title>Recursive List Example</Title>

      <ol>
        {friends.map(({ name, friends }) => {
          return (
            <li>
              {name}
              {!!friends.length && <FriendsOfFriend list={friends} />}
            </li>
          );
        })}
      </ol>
    </Fragment>
  );
};
