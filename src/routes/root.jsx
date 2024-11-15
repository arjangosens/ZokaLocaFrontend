import Navbar from "../components/navbar.jsx";
import {Outlet, ScrollRestoration} from "react-router-dom";
import useTokenExpirationCheck from "../hooks/use-token-expiration-check.jsx";

export default function Root() {
    useTokenExpirationCheck();
  return (
      <>
          <Navbar/>
          <div className="container-fluid">
              <ScrollRestoration/>
              <div className="nav-size"></div> {/* Navbar spacer element */}
              <Outlet/>
          </div>
      </>
  )
}