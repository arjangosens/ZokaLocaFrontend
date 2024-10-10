import PropTypes from "prop-types";

export default function CampsitePrice({price}) {
    return (
        <div className="d-flex">
            <p className="mb-0"><i className="fa-solid fa-euro-sign"></i> {price.amount.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {getModeName(price.priceMode)}</p>
        </div>
    );
}

function getModeName(priceMode) {
    switch (priceMode) {
        case "CONSTANT":
            return "per nacht";
        case "PER_PERSON":
            return "per persoon";
        default:
            return "onbekend";
    }
}

CampsitePrice.propTypes = {
    price: PropTypes.shape({
        amount: PropTypes.number.isRequired,
        priceMode: PropTypes.oneOf(["CONSTANT", "PER_PERSON"]).isRequired
    }).isRequired
};