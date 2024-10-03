import Navbar from "../components/navbar.jsx";
import {Outlet} from "react-router-dom";

export default function Root() {
  return (
      <>
          <Navbar/>
          <div className="container">
              <div className="nav-size"></div> {/* Navbar spacer element */}
              <Outlet/>
          </div>
      </>
  )
}