import { Fragment } from "react";

export const FriendsOfFriend = ({ list: friends }) => {
  return (
    <Fragment>
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
