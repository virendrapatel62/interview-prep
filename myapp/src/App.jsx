import { useEffect } from "react";
import { useRef } from "react";
import "./App.css";
import { MyButton } from "./components/MyButton";
import { FriendsOfFriend } from "./components/RecursiveList";
import { friends } from "./data/list";
function App() {
  const ref = useRef();

  console.log(ref.current);

  useEffect(() => {
    console.log(ref.current);
  }, []);
  return (
    <div style={{ padding: "10px" }} onClick={() => console.log(ref.current)}>
      <MyButton ref={ref}>ForWord Ref Example</MyButton>

      <h1>List Of friends of friends</h1>

      <FriendsOfFriend list={friends} />
    </div>
  );
}

export default App;
