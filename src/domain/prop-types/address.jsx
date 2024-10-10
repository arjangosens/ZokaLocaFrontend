import PropTypes from "prop-types";

const AddressPropTypes = PropTypes.shape({
    street: PropTypes.string,
    houseNumber: PropTypes.string,
    city: PropTypes.string.isRequired,
    zipcode: PropTypes.string,
    country: PropTypes.string.isRequired,
    distanceInKm: PropTypes.number,
});

export default AddressPropTypes;