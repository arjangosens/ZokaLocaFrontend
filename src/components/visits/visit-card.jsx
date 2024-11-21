import PropTypes from "prop-types";
import VisitRatingBadge from "./visit-rating-badge.jsx";

export default function VisitCard({visit}) {
    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex align-items-start mb-2">
                    <h4 className="card-title flex-grow-1 mb-0 flex-grow-1">{visit.branch.name}</h4>
                    <h4 className="mb-0"><VisitRatingBadge rating={visit.rating} /></h4>
                    <button className="btn btn-sm btn-outline-dark ms-2"><i className="fa-solid fa-pencil"></i></button>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <span><i className="fa-solid fa-euro-sign"></i> {visit.price ?? "?"}</span>
                    <span><i className="fa-solid fa-users"></i> {visit.numOfPeople ?? "?"}</span>
                    <span><i className="fa-solid fa-calendar"></i> {visit.arrivalDate ?? "?"} - {visit.departureDate ?? "?"}</span>
                </div>
                <hr/>
                <h6>Plus- en minpunten</h6>
                <div className="mb-2">
                    {visit.pros.map((pro, index) => (<span className="badge text-bg-secondary me-1 mb-1" key={index}><i
                        className="fa-solid fa-plus"></i> {pro}</span>))}
                    {visit.cons.map((con, index) => (
                        <span className="badge text-bg-danger me-1 mb-1" key={index}><i
                            className="fa-solid fa-minus"></i> {con}</span>))}
                </div>
                <h6>Opmerkingen</h6>
                <p>{visit?.description}</p>
            </div>
        </div>
    );
}

VisitCard.propTypes = {
    visit: PropTypes.object.isRequired
};