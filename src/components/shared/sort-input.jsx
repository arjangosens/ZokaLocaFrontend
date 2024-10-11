import PropTypes from "prop-types";

export default function SortInput({ fields, selectedField, sortOrder, onSortChange }) {
    const swapSortOrder = () => {
        const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
        onSortChange(selectedField, newSortOrder);
    };

    const handleFieldChange = (e) => {
        const newField = e.target.value;
        onSortChange(newField, sortOrder);
    };

    return (
        <div className="input-group input-group-sm">
            <select className="form-select" value={selectedField} onChange={handleFieldChange}>
                {fields.map((field) => (
                    <option key={field.key} value={field.key}>{field.label}</option>
                ))}
            </select>
            <button className="btn btn-dark" onClick={swapSortOrder}>
                <i className={`fa-solid ${sortOrder === 'asc' ? 'fa-caret-up' : 'fa-caret-down'}`}></i>
            </button>
        </div>
    );
}

SortInput.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    })).isRequired,
    selectedField: PropTypes.string.isRequired,
    sortOrder: PropTypes.oneOf(["asc", "desc"]).isRequired,
    onSortChange: PropTypes.func.isRequired
};