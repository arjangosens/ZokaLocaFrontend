import {Link, useLoaderData, useNavigate} from "react-router-dom";
import DeleteUserModal from "../../components/users/delete-user-modal.jsx";
import {useState} from "react";
import EnumUtils from "../../utils/enum-utils.jsx";

export default function UserDetails() {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const {user} = useLoaderData();
    const navigate = useNavigate();

    const handleDeleteBtnClicked = () => {
        setShowDeleteModal(true);
    }

    const handleModalClosed = () => {
        setShowDeleteModal(false);
    }

    const handleUserDeleted = () => {
        setShowDeleteModal(false);
        navigate("/users");
    }

    return (
        <>
            <div className="toolbar fixed-top">
                <Link to="./edit" className=" btn btn-sm btn-dark"><i
                    className="fa-solid fa-pencil"></i></Link>
                <button className="btn btn-danger btn-sm ms-2"
                        onClick={() => handleDeleteBtnClicked(user)}>
                    <i className="fa-solid fa-trash"></i></button>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <div className="nav-size"></div>
                        <h1 className="page-header-margin"><i
                            className="fa-solid fa-user"></i> {user.firstName} {user.lastName}</h1>
                        <hr/>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <div className="card text-bg-light ">
                            <div className="card-header">
                                <i className="fa-solid fa-id-card"></i> Algemeen
                            </div>
                            <div className="card-body d-flex flex-column">
                                <span><b>Naam:</b> {user.firstName} {user.lastName}</span>
                                <span><b>E-mailadres:</b> {user.email}</span>
                                <span><b>Rol:</b> {EnumUtils.translateUserRole(user.role)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card text-bg-light ">
                            <div className="card-header">
                                <i className="fa-solid fa-users-between-lines"></i> Speltakken
                            </div>
                            <div className="card-body">
                                {(!user.branches || user.branches.length === 0) && <span>(Geen)</span>}
                                {user.branches && <div className="list-group">
                                    {user.branches.map(branch => (
                                        <Link to={`/branches/${branch.id}`} className="list-group-item list-group-item-action" key={branch.id}>{branch.name}</Link>
                                    ))}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showDeleteModal && <DeleteUserModal user={user} isShown={showDeleteModal} onClose={handleModalClosed}
                                                 onUserDeleted={handleUserDeleted}/>}
        </>
    );
}