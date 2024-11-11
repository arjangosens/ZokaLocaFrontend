import {Link, useLoaderData, useNavigate} from "react-router-dom";
import {useState} from "react";
import PropTypes from "prop-types";
import EnumUtils from "../../utils/enum-utils.jsx";
import DeleteUserModal from "../../components/users/delete-user-modal.jsx";

export default function BranchDetails() {
    const {branch} = useLoaderData();

    return (
        <>
            <div className="toolbar fixed-top">
                <Link to="./edit" className=" btn btn-sm btn-dark"><i
                    className="fa-solid fa-pencil"></i></Link>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <div className="nav-size"></div>
                        <h1 className="page-header-margin"><i
                            className="fa-solid fa-users-between-lines"></i> {branch.name}</h1>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card text-bg-light ">
                            <div className="card-header">
                                <i className="fa-solid fa-user"></i> Gebruikers
                            </div>
                            <div className="card-body">
                                {(!branch.users || branch.users.length === 0) && <span>(Geen)</span>}
                                {branch.users && <div className="list-group">
                                    {branch.users.map(user => (
                                        <Link to={`/users/${user.id}`} className="list-group-item list-group-item-action" key={user.id}>{user.firstName} {user.lastName}</Link>
                                    ))}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}