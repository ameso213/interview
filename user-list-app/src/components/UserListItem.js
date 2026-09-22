import { useNavigate } from "react-router-dom";
import "./UserListItem.css";

function initialsFor(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export default function UserListItem({ user }) {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/users/${user.id}`, { state: { user } });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      goToDetail();
    }
  };

  return (
    <li
      className="user-item"
      role="button"
      tabIndex={0}
      onClick={goToDetail}
      onKeyDown={handleKeyDown}
      aria-label={`View details for ${user.name}`}
    >
      <span className="user-item__avatar" aria-hidden="true">
        {initialsFor(user.name)}
      </span>
      <span className="user-item__text">
        <span className="user-item__name">{user.name}</span>
        <span className="user-item__email">{user.email}</span>
      </span>
      <span className="user-item__chevron" aria-hidden="true">
        ›
      </span>
    </li>
  );
}