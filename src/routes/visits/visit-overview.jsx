import {useAuth} from "../../providers/auth-provider.jsx";
import {useEffect, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
import {backendApi} from "../../utils/backend-api.jsx";
import CampsiteIcon from "../../components/campsites/campsite-icon.jsx";
import VisitRatingBadge from "../../components/visits/visit-rating-badge.jsx";
import AuthenticatedImage from "../../components/shared/authenticated-image.jsx";
import useBranch from "../../hooks/use-branch.jsx";

export default function VisitOverview() {
    const {loggedInUser, refreshUserInfo} = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const [visits, setVisits] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {selectedBranch, updateBranch} = useBranch();

    const getVisits = async (branchId) => {
        setErrorMsg(null);
        setIsLoading(true);
        setVisits([]);
        try {
            const response = await backendApi.get(`/visits/branch/${branchId}`);
            setVisits(response.data);
        } catch (error) {
            console.error("Failed to fetch visits: ", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        refreshUserInfo().then(() => {
            updateBranch(null);
        });
    }, []);

    useEffect(() => {
        if (selectedBranch) {
            getVisits(selectedBranch.id).then();
        }
    }, [selectedBranch]);

    return (<>
        <div className="toolbar fixed-top d-flex align-items-center">
            <div className="flex-shrink-1 me-auto">
                {/*Branch select*/}
                <select
                    className="form-select"
                    value={selectedBranch?.id}
                    onChange={(e) => {
                        setSearchParams({branchId: e.target.value});
                        updateBranch(e.target.value);
                    }}
                >
                    {loggedInUser.branches.map(branch => (
                        <option key={branch.id} value={branch.id}>{branch.name}</option>
                    ))}
                </select>
            </div>
        </div>

        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="nav-size"></div>
                    <h1 className="text-center page-header-margin">Bezoeken</h1>
                    <hr/>
                    {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                    {isLoading && <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    }
                    {!isLoading && visits.length === 0 && <div className="text-center">Geen bezoeken gevonden</div>}
                    {!isLoading && visits.length > 0 && visits.map((visit) => (
                        <div className="card mb-2 zoom" key={visit.id}>
                            <div className="row g-0">
                                <div className="col-4 col-lg-2 flex-shrink-1">
                                    <div className="visit-overview-item-image-container">
                                        <AuthenticatedImage imageId={visit.campsite?.thumbnailId}
                                                            alt={"Campsite thumbnail"}
                                                            placeholder={"/images/thumbnail-placeholder.jpg"}/>
                                    </div>
                                    {/*<img src="https://placehold.co/1920x1080"*/}
                                    {/*     className="visit-image img-fluid rounded-start" alt="..."/>*/}
                                </div>
                                <div className="col-8 col-lg-10 d-flex flex-column">
                                    <div className="card-body flex-grow-1">
                                        <div className="d-flex">
                                            <h6 className="card-title flex-grow-1"><CampsiteIcon
                                                campsiteType={visit.campsite.campsiteType}/> {visit.campsite.name}</h6>
                                            <h6><VisitRatingBadge rating={visit.rating}/></h6>
                                        </div>
                                        <h6 className="card-title"><i
                                            className="fa-solid fa-city"></i> {visit.campsite.address.city}</h6>
                                        <h6 className="card-title"><i
                                            className="fa-solid fa-calendar"></i> {new Date(visit.arrivalDate).toLocaleDateString()} t/m {new Date(visit.departureDate).toLocaleDateString()}
                                        </h6>
                                    </div>
                                </div>
                                <Link className="stretched-link" to={`/campsites/${visit.campsiteId}`}></Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>)
}