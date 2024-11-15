import PropTypes from "prop-types";

export default function CampsiteAmenity({icon, prefix, amount, unit}) {
    const prefixString = prefix ? `${prefix}: ` : '';
    const amountElement = amount ? <span>{amount}</span> : <span className="text-danger">x</span>;
    const unitString = unit ? ` ${unit}` : '';

    return (
        <span><i className={icon}></i> {prefixString}{amountElement}{unitString}</span>
    );
}

CampsiteAmenity.propTypes = {
    icon: PropTypes.string.isRequired,
    prefix: PropTypes.string,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    unit: PropTypes.string
};