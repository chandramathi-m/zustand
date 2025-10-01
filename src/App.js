import { Routes, Route } from "react-router-dom";
import TodoList from "./TodoList";
import TicToc from "./TicToc";
import Counter from "./Counter";

const App = () => {

  return (
      <Routes>
        <Route path="/" element={<Counter />} />
        <Route path="/todo" element={<TodoList />} />
        <Route path="/tictoc" element={<TicToc />} />
      </Routes>
  )
}

export default App;
