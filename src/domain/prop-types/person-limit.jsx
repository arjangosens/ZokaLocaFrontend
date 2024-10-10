import PropTypes from "prop-types";

const PersonLimitPropTypes = PropTypes.shape({
    minimum: PropTypes.number,
    maximum: PropTypes.number,
});

export default PersonLimitPropTypes;