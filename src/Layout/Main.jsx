import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Components/Shared/Footer";
import NavBar from "../Components/Shared/NavBar";

const Main = () => {
  const location = useLocation();

  const withoutHeaderFooter =
    location.pathname.includes("login") || location.pathname.includes("signup");

  return (
    <div>
      {withoutHeaderFooter || <NavBar></NavBar>}
      <Outlet></Outlet>
      {withoutHeaderFooter || <Footer></Footer>}
    </div>
  );
};

export default Main;
