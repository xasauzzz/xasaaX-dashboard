import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="wrapper clear">
      <Header />
      <Outlet />
    </div>
  );
};

export { Layout };
