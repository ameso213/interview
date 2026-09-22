import { Routes, Route } from "react-router-dom";
import UserListScreen from "./screens/UserListScreen";
import UserDetailScreen from "./screens/UserDetailScreen";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UserListScreen />} />
        <Route path="/users/:id" element={<UserDetailScreen />} />
      </Routes>
    </div>
  );
}

export default App;