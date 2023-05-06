import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import Logo from "../img/logo-no-background.png";

const Navi = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img
            alt="SLVNT Logo"
            src={Logo}
            style={{ width: 100, height: 110 }}
          />
        </Link>
        {user && (
          <div className="dash-link">
            <Link to="/">
              <h2>DASHBOARD</h2>
            </Link>
          </div>
        )}
        {user && (
          <div className="teams-link">
            <Link to="/groups">
              <h2>TEAMS</h2>
            </Link>
          </div>
        )}
        {user && (
          <div className="completed-link">
            <Link to="tasks/completed">
              <h2>ARCHIVE</h2>
            </Link>
          </div>
        )}
        <nav>
          {user && (
            <div>
              <span style={{ padding: 10 }}>{user.email}</span>
              <button onClick={handleClick}>LOGOUT</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">LOGIN</Link>
              <Link to="/signup">JOIN</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navi;
