import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/original">Original</Link>
          </li>
          <li>
            <Link to="/clone">Clone</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout