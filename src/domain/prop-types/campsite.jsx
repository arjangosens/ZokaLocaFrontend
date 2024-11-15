import PropTypes from 'prop-types';
import AddressPropTypes from "./address.jsx";
import PersonLimitPropTypes from "./person-limit.jsx";
import CampsitePricePropTypes from "./campsite-price.jsx";

const CampsitePropTypes = PropTypes.shape({
    name: PropTypes.string.isRequired,
    campsiteType: PropTypes.oneOf(['BUILDING', 'FIELD']),
    description: PropTypes.string,
    address: AddressPropTypes,
    personLimit: PersonLimitPropTypes,
    price: CampsitePricePropTypes,
    arrivalTime: PropTypes.string,
    departureTime: PropTypes.string,
    numOfToilets: PropTypes.number,
    numOfShowers: PropTypes.number,
    numOfWaterSources: PropTypes.number,
    surroundings: PropTypes.object,
    externalSources: PropTypes.object,
    facilities: PropTypes.arrayOf(PropTypes.object),
    campgroundId: PropTypes.number,
    numOfRooms: PropTypes.number,
    numOfCommonAreas: PropTypes.number,
    sizeSquareMeters: PropTypes.number,
});

export default CampsitePropTypes;