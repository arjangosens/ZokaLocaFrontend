import PersonLimitPropTypes from "../../domain/prop-types/person-limit.jsx";

export default function PersonLimit({limit}) {
    return (
        <div className="d-flex">
            <p className="mb-0"><i className="fa-solid fa-users"></i> {limit.minimum} - {limit.maximum}</p>
        </div>
    );


}

PersonLimit.propTypes = {
    limit: PersonLimitPropTypes.isRequired
}