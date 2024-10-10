import { useEffect, useState } from "react";
import CampsiteCard from "../../components/campsites/campsite-card.jsx";
import { Link, useSearchParams } from "react-router-dom";
import { backendApi } from "../../utils/backend-api.jsx";
import SortInput from "../../components/shared/sort-input.jsx";
import Pagination from "../../components/shared/pagination.jsx";

export default function CampsiteOverview() {
    const [campsites, setCampsites] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [sortField, setSortField] = useState(searchParams.get("sortBy") || "name");
    const [sortOrder, setSortOrder] = useState(searchParams.get("sortOrder") || "asc");
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(searchParams.get("page") || "1");

    const sortFields = [
        { key: "name", label: "Naam" },
        { key: "address.distanceInKm", label: "Afstand" },
        { key: "price.amount", label: "Prijs" }
    ];

    const setSingleSearchParam = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set(key, value);
        setSearchParams(newParams);
    };

    const onSortChanged = (field, order) => {
        setSortField(field);
        setSortOrder(order);
        console.log(`onSortChanged: ${field} - ${order}`);
        const newParams = new URLSearchParams(searchParams);
        newParams.set("sortBy", field);
        newParams.set("sortOrder", order);
        setSearchParams(newParams);
        fetchCampsites(field, order, currentPage);
    };

    const onPaginationChanged = (page) => {
        setCurrentPage(page);
        console.log(`onPaginationChanged: ${page}`);
        setSingleSearchParam("page", page);
        fetchCampsites(sortField, sortOrder, page);
    }

    const fetchCampsites = (field, order, currentPage) => {
        setIsLoading(true);
        setError(null);
        setCampsites([]);
        setTotalPages(0);

        const actualPage = currentPage - 1;
        const searchParams = new URLSearchParams();
        searchParams.append("sortBy", field);
        searchParams.append("sortOrder", order);
        searchParams.append("page", actualPage);

        backendApi.get(`/campsites?${searchParams.toString()}`)
            .then((response) => {
                setCampsites(response.data.content);
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
        fetchCampsites(sortField, sortOrder, currentPage);
    }, []);

    return (
        <>
            <div className="toolbar fixed-top d-flex align-items-center">
                <div className="flex-shrink-1">
                    <SortInput
                        fields={sortFields}
                        selectedField={sortField}
                        sortOrder={sortOrder}
                        onSortChange={onSortChanged}
                    />
                </div>

                <Link to="/campsites/create" className="ms-auto btn btn-dark">
                    <i className="fa-solid fa-plus"></i>
                </Link>
            </div>
            <div className="row">
                <div className="col text-center">
                    <div className="nav-size"></div>
                    <h1 className="page-header-margin">Kamplocaties</h1>
                    <hr />
                    { totalPages > 1 && (
                        <div className="d-flex justify-content-center">
                            <Pagination currentPage={Number(currentPage)} totalPages={totalPages}
                                        onPageChange={onPaginationChanged}/>
                        </div>
                    )}


                </div>
            </div>
            <div className="row">
                {isLoading && <div className="spinner-border mx-auto" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>}
                {error && <div className="text-center">Error: {error.message}</div>}
                {!isLoading && !error && campsites.length === 0 &&
                    <div className="text-center">Geen kamplocaties gevonden</div>}

                {campsites.map((campsite) => (
                    <div className="col-6 col-lg-4 col-xl-3 mb-2" key={campsite.id}>
                        <CampsiteCard campsite={campsite} />
                    </div>
                ))}
            </div>
            <div className="row">
                { totalPages > 1 && (
                    <div className="d-flex justify-content-center">
                        <Pagination currentPage={Number(currentPage)} totalPages={totalPages}
                                    onPageChange={onPaginationChanged}/>
                    </div>
                )}
            </div>
        </>
    );
}