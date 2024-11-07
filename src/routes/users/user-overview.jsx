import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
import {backendApi} from "../../utils/backend-api.jsx";
import SortInput from "../../components/shared/sort-input.jsx";
import FilterButton from "../../components/shared/filter-button.jsx";
import Pagination from "../../components/shared/pagination.jsx";
import UserFilters from "../../components/users/user-filters.jsx";

export default function UserOverview() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [sortField, setSortField] = useState(searchParams.get("sortBy") || "name");
    const [sortOrder, setSortOrder] = useState(searchParams.get("sortOrder") || "asc");
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(searchParams.get("page") || "1");
    const [filters, setFilters] = useState({});

    const sortFields = [
        {key: "firstName", label: "Voornaam"},
        {key: "lastName", label: "Achternaam"},
        {key: "email", label: "E-mailadres"},
        {key: "role", label: "Rol"}
    ];

    const setSingleSearchParam = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set(key, value);
        setSearchParams(newParams);
    };

    const onSortChanged = (field, order) => {
        setSortField(field);
        setSortOrder(order);
        const newParams = new URLSearchParams(searchParams);
        newParams.set("sortBy", field);
        newParams.set("sortOrder", order);
        setSearchParams(newParams);
        fetchUsers(field, order, currentPage, filters);
    };

    const onPaginationChanged = (page) => {
        setCurrentPage(page);
        setSingleSearchParam("page", page);
        fetchUsers(sortField, sortOrder, page, filters);
    }

    const onFiltersChanged = (filters) => {
        setFilters(filters);

        const newParams = new URLSearchParams(searchParams);
        Object.keys(filters).forEach(key => {
            if (filters[key] !== "" && filters[key] !== null && filters[key] !== undefined) {
                if (Array.isArray(filters[key])) {
                    if (filters[key].length > 0) {
                        newParams.set(key, filters[key].join(","));
                    } else {
                        newParams.delete(key);
                    }
                } else {
                    newParams.set(key, filters[key]);
                }
            } else {
                newParams.delete(key);
            }
        });
        setSearchParams(newParams);

        fetchUsers(sortField, sortOrder, currentPage, filters);
    };

    const clearAllFilters = () => {
        setSearchParams(new URLSearchParams());
        setFilters({});
        fetchUsers(sortField, sortOrder, 1, {});
    };

    const getRoleName = (role) => {
        switch (role) {
            case "VOLUNTEER":
                return "Vrijwilliger";
            case "ADMIN":
                return "Administrator";
            default:
                return "Onbekend";
        }
    }

    const fetchUsers = (field, order, currentPage, filters) => {
        setIsLoading(true);
        setError(null);
        setUsers([]);
        setTotalPages(0);

        const actualPage = currentPage - 1;
        const searchParams = new URLSearchParams();

        if (filters !== null && filters !== undefined && Object.keys(filters).length > 0) {
            Object.keys(filters).forEach(key => {
                if (filters[key] !== "" && filters[key] !== null && filters[key] !== undefined) {
                    searchParams.append(key, filters[key]);
                }
            });
        }

        const visualSearchParams = new URLSearchParams(searchParams);

        if (field !== "name" || order !== "asc") {
            visualSearchParams.append("sortBy", field);
            visualSearchParams.append("sortOrder", order);
        }

        if (parseInt(currentPage) !== 1) {
            visualSearchParams.append("page", currentPage);
        }

        setSearchParams(visualSearchParams);

        searchParams.append("sortBy", field);
        searchParams.append("sortOrder", order);
        searchParams.append("page", actualPage);

        backendApi.get(`/users?${searchParams.toString()}`)
            .then((response) => {
                setUsers(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError(error);
                setCurrentPage(1);
            }).finally(() => {
            setIsLoading(false);
        });
    };

    useEffect(() => {
        const initialFilters = {};
        searchParams.forEach((value, key) => {
            initialFilters[key] = value;
        });
        setFilters(initialFilters);
        fetchUsers(sortField, sortOrder, currentPage, initialFilters);
    }, []);

    return (
        <>
            {/* Filter offcanvas */}
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="campsiteFilterOffcanvas"
                 aria-labelledby="campsiteFilterOffcanvasLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="campsiteFilterOffcanvasLabel">Filters</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas"
                            aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <UserFilters filters={filters} onFiltersChange={onFiltersChanged}
                                 clearAllFilters={clearAllFilters}></UserFilters>
                </div>
            </div>
            <div className="toolbar fixed-top d-flex align-items-center">
                <div className="flex-shrink-1 me-auto">
                    <SortInput
                        fields={sortFields}
                        selectedField={sortField}
                        sortOrder={sortOrder}
                        onSortChange={onSortChanged}
                    />
                </div>

                {/* Filter button */}
                <div className="d-xxl-none">
                    <FilterButton targetId="campsiteFilterOffcanvas" areFiltersActive={false}/>
                </div>

                <Link to="/users/register" className="ms-2 btn btn-sm btn-dark">
                    <i className="fa-solid fa-plus"></i>
                </Link>
            </div>
            <div className="row">
                {/* Large screen filters */}
                <div className="d-none d-xxl-block col-xxl-2 border-end">
                    <div className="nav-size"></div>
                    <h2 className="page-header-margin ">Filters</h2>
                    <UserFilters filters={filters} onFiltersChange={onFiltersChanged}
                                 clearAllFilters={clearAllFilters}></UserFilters>
                </div>

                <div className="col-12 col-xxl-10 border-start">
                    <div className="row">
                        <div className="col text-center">
                            <div className="nav-size"></div>
                            <h1 className="page-header-margin">Gebruikers</h1>
                            <hr/>
                            {totalPages > 1 && (
                                <div className="d-flex justify-content-center">
                                    <Pagination currentPage={Number(currentPage)} totalPages={totalPages}
                                                onPageChange={onPaginationChanged}/>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            {isLoading && <div className="spinner-border mx-auto" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>}
                            {error && <div className="text-center">Error: {error.message}</div>}
                            {!isLoading && !error && users.length === 0 &&
                                <div className="text-center">Geen gebruikers gevonden</div>}

                            {users.length > 0 && (
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>Voornaam</th>
                                        <th>Achternaam</th>
                                        <th>E-mailadres</th>
                                        <th>Rol</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.email}</td>
                                            <td>{getRoleName(user.role)}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        {totalPages > 1 && (
                            <div className="d-flex justify-content-center">
                                <Pagination currentPage={Number(currentPage)} totalPages={totalPages}
                                            onPageChange={onPaginationChanged}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

UserOverview.propTypes = {
    filters: PropTypes.object.isRequired,
    onFiltersChange: PropTypes.func.isRequired,
    clearAllFilters: PropTypes.func.isRequired
};