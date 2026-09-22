import { useEffect, useState, useCallback } from "react";
import { fetchUsers } from "../api/userApi";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import UserListItem from "../components/UserListItem";
import "./UserListScreen.css";

export default function UserListScreen() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  const loadUsers = useCallback(() => {
    setStatus("loading");
    setError(null);

    fetchUsers()
      .then((data) => {
        setUsers(data);
        setStatus("success");
      })
      .catch((err) => {
        setError(err.message || "Something went wrong.");
        setStatus("error");
      });
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <div className="user-list-screen">
      <header className="user-list-screen__header">
        <h1>Directory</h1>
        <p>{status === "success" ? `${users.length} people` : "\u00A0"}</p>
      </header>

      {status === "loading" && <Loader label="Fetching users…" />}

      {status === "error" && (
        <ErrorMessage message={error} onRetry={loadUsers} />
      )}

      {status === "success" && (
        <ul className="user-list-screen__list">
          {users.map((user) => (
            <UserListItem key={user.id} user={user} />
          ))}
        </ul>
      )}
    </div>
  );
}