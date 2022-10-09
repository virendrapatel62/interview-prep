import { useEffect, useLayoutEffect, useState } from "react";
import { useRef } from "react";
import "./App.css";
import { MyButton } from "./components/MyButton";
import { FriendsOfFriend } from "./components/RecursiveList";
import { Routing } from "./components/Routing";
import { friends } from "./data/list";
function App() {
  return (
    <div style={{ padding: "10px" }}>
      <Routing />
    </div>
  );
}

export default App;
