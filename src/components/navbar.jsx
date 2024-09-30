import {Link} from "react-router-dom";

export default function Navbar() {
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
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to={"campsites"} className="nav-link" aria-current="page">Locaties</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}