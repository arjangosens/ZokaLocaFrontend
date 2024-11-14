import {Link} from "react-router-dom";
import {useAuth} from "../providers/auth-provider.jsx";

export default function Navbar() {
    const {loggedInUser} = useAuth();

    return (
        <nav className="navbar navbar-expand-lg bg-primary fixed-top nav-size shadow-sm" data-bs-theme="dark">
            <div className="container-fluid">
                <Link to={"/"} className="navbar-brand">Zoka-Loca</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarToggler">
                    {loggedInUser ? (
                        <>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to={"campsites"} className="nav-link" aria-current="page">Kamplocaties</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"users"} className="nav-link">Gebruikers</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"branches"} className="nav-link">Speltakken</Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                       data-bs-toggle="dropdown" aria-expanded="false">
                                        {loggedInUser.firstName} {loggedInUser.lastName}
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end" data-bs-theme="light" aria-labelledby="userDropdown">
                                        <li><Link to={"/auth/logout"} className="dropdown-item">Uitloggen</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </>
                    ) : null}
                </div>
            </div>
        </nav>
    )
}