import Navbar from "../components/navbar.jsx";
import {Outlet, ScrollRestoration} from "react-router-dom";

export default function Root() {
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