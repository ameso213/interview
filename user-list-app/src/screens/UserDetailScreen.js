import { useEffect, useState, useCallback } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { fetchUserById } from "../api/userApi";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import "./UserDetailScreen.css";

export default function UserDetailScreen() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(state?.user || null);
  const [status, setStatus] = useState(state?.user ? "success" : "loading");
  const [error, setError] = useState(null);

  const loadUser = useCallback(() => {
    setStatus("loading");
    setError(null);

    fetchUserById(id)
      .then((data) => {
        setUser(data);
        setStatus("success");
      })
      .catch((err) => {
        setError(err.message || "Something went wrong.");
        setStatus("error");
      });
  }, [id]);

  useEffect(() => {
    if (!state?.user) {
      loadUser();
    }
  }, [state, loadUser]);

  return (
    <div className="user-detail-screen">
      <button
        type="button"
        className="user-detail-screen__back"
        onClick={() => navigate(-1)}
      >
        ‹ Back
      </button>

      {status === "loading" && <Loader label="Loading user…" />}
      {status === "error" && (
        <ErrorMessage message={error} onRetry={loadUser} />
      )}

      {status === "success" && user && (
        <div className="user-detail-screen__card">
          <h1>{user.name}</h1>
          <p className="user-detail-screen__email">{user.email}</p>

          <dl>
            <dt>Username</dt>
            <dd>{user.username}</dd>

            <dt>Phone</dt>
            <dd>{user.phone}</dd>

            <dt>Website</dt>
            <dd>{user.website}</dd>

            {user.address && (
              <>
                <dt>Address</dt>
                <dd>
                  {user.address.street}, {user.address.city}
                </dd>
              </>
            )}

            {user.company && (
              <>
                <dt>Company</dt>
                <dd>{user.company.name}</dd>
              </>
            )}
          </dl>
        </div>
      )}
    </div>
  );
}