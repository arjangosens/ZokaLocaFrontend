import {Link, useLoaderData, useNavigate} from "react-router-dom";
import DeleteUserModal from "../../components/users/delete-user-modal.jsx";
import {useState} from "react";
import EnumUtils from "../../utils/enum-utils.jsx";
import PropTypes from "prop-types";

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
                <Link to="./edit" className=" btn btn-sm btn-dark" data-cy="edit-user-button"><i
                    className="fa-solid fa-pencil"></i></Link>
                <button className="btn btn-danger btn-sm ms-2"
                        onClick={() => handleDeleteBtnClicked(user)} data-cy="delete-user-button">
                    <i className="fa-solid fa-trash"></i></button>
            </div>

            <div className="container" data-cy="user-details-container">
                <div className="row">
                    <div className="col text-center">
                        <div className="nav-size"></div>
                        <h1 className="page-header-margin" data-cy="user-name-header"><i
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
                                <span data-cy="user-name"><b>Naam:</b> {user.firstName} {user.lastName}</span>
                                <span data-cy="user-email"><b>E-mailadres:</b> {user.email}</span>
                                <span data-cy="user-role"><b>Rol:</b> {EnumUtils.translateUserRole(user.role)}</span>
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
                                {(!user.branches || user.branches.length === 0) &&
                                    <span data-cy="no-branches">(Geen)</span>}
                                {user.branches && <div className="list-group" data-cy="user-branches">
                                    {user.branches.map(branch => (
                                        <Link to={`/branches/${branch.id}`}
                                              className="list-group-item list-group-item-action" key={branch.id}
                                              data-cy={`branch-${branch.id}`}>{branch.name}</Link>
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

UserDetails.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        branches: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
        }))
    })
}