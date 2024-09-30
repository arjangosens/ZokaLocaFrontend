import PropTypes from "prop-types";

export default function PersonLimit({limit}) {
    return (
        <div className="d-flex">
            <p className="mb-0"><i className="fa-solid fa-users"></i> {limit.minimum} - {limit.maximum}</p>
        </div>
    );


}

PersonLimit.propTypes = {
    limit: PropTypes.shape({
        minimum: PropTypes.number.isRequired,
        maximum: PropTypes.number.isRequired,
    }).isRequired,
};