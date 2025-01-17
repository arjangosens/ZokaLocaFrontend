import {useEffect, useState} from "react";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {backendApi} from "../../utils/backend-api.jsx";
import SortInput from "../../components/shared/sort-input.jsx";
import FilterButton from "../../components/shared/filter-button.jsx";
import Pagination from "../../components/shared/pagination.jsx";
import UserFilters from "../../components/users/user-filters.jsx";
import EnumUtils from "../../utils/enum-utils.jsx";
import {useAuth} from "../../providers/auth-provider.jsx";

export default function UserOverview() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [sortField, setSortField] = useState(searchParams.get("sortBy") || "firstName");
    const [sortOrder, setSortOrder] = useState(searchParams.get("sortOrder") || "asc");
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(searchParams.get("page") || "1");
    const [filters, setFilters] = useState({});
    const {loggedInUser} = useAuth();
    const navigate = useNavigate();

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

    const navigateToDetails = (user) => {
        navigate(`./${user.id}`);
    }

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

        if (field !== "firstName" || order !== "asc") {
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
        if (loggedInUser) {
            const initialFilters = {};
            searchParams.forEach((value, key) => {
                initialFilters[key] = value;
            });
            setFilters(initialFilters);
            fetchUsers(sortField, sortOrder, currentPage, initialFilters);
        }
    }, [loggedInUser]);

    return (
        <>
            <header className="toolbar fixed-top d-flex align-items-center" data-cy="toolbar">
                <div className="flex-shrink-1 me-auto">
                    <SortInput
                        fields={sortFields}
                        selectedField={sortField}
                        sortOrder={sortOrder}
                        onSortChange={onSortChanged}
                        data-cy="sort-input"
                    />
                </div>

                <div className="d-xxl-none">
                    <FilterButton targetId="campsiteFilterOffcanvas" areFiltersActive={false} data-cy="filter-button"/>
                </div>

                <Link to="/users/register" className="ms-2 btn btn-sm btn-dark" data-cy="register-link">
                    <i className="fa-solid fa-plus"></i>
                </Link>
            </header>

            <main className="row" data-cy="main-content">
                <aside className="d-none d-xxl-block col-xxl-2 border-end" data-cy="filters-sidebar">
                    <div className="nav-size"></div>
                    <h2 className="page-header-margin">Filters</h2>
                    <UserFilters filters={filters} onFiltersChange={onFiltersChanged}
                                 clearAllFilters={clearAllFilters} data-cy="user-filters"/>
                </aside>

                <section className="col-12 col-xxl-10 border-start" data-cy="user-section">
                    <div className="row">
                        <div className="col text-center">
                            <div className="nav-size"></div>
                            <h1 className="page-header-margin">Gebruikers</h1>
                            <hr/>
                            {totalPages > 1 && (
                                <div className="d-flex justify-content-center">
                                    <Pagination currentPage={Number(currentPage)} totalPages={totalPages}
                                                onPageChange={onPaginationChanged} data-cy="pagination"/>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            {isLoading && <div className="text-center" data-cy="loading-spinner">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>}
                            {error && <div className="text-center" data-cy="error-message">Error: {error.message}</div>}
                            {!isLoading && !error && users.length === 0 &&
                                <div className="text-center" data-cy="no-users-message">Geen gebruikers gevonden</div>}

                            {users.length > 0 && (
                                <div className="table-responsive">
                                    <table className="table table-hover" data-cy="user-table">
                                        <thead>
                                        <tr>
                                            <th>Voornaam</th>
                                            <th>Achternaam</th>
                                            <th>E-mailadres</th>
                                            <th>Rol</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {users.map((user) => (
                                            <tr key={user.id} onClick={() => navigateToDetails(user)}
                                                className="cursor-pointer" data-cy={`user-row-${user.id}`}>
                                                <td>{user.firstName}</td>
                                                <td>{user.lastName}</td>
                                                <td>{user.email}</td>
                                                <td>{EnumUtils.translateUserRole(user.role)}</td>
                                                <td>
                                                    <div className="d-flex">
                                                        <Link to={`/users/${user.id}`}
                                                              className="btn btn-outline-dark btn-sm" data-cy={`user-details-link-${user.id}`}>
                                                            <i className="fa-solid fa-arrow-right"></i>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        {totalPages > 1 && (
                            <div className="d-flex justify-content-center">
                                <Pagination currentPage={Number(currentPage)} totalPages={totalPages}
                                            onPageChange={onPaginationChanged} data-cy="pagination-bottom"/>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <div className="offcanvas offcanvas-start" tabIndex="-1" id="campsiteFilterOffcanvas"
                 aria-labelledby="campsiteFilterOffcanvasLabel" data-cy="offcanvas">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="campsiteFilterOffcanvasLabel">Filters</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas"
                            aria-label="Close" data-cy="offcanvas-close-button"></button>
                </div>
                <div className="offcanvas-body">
                    <UserFilters filters={filters} onFiltersChange={onFiltersChanged}
                                 clearAllFilters={clearAllFilters} data-cy="offcanvas-user-filters"/>
                </div>
            </div>
        </>
    );
}