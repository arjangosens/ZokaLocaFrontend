import {useEffect, useState} from "react";
import {backendApi} from "../../utils/backend-api.jsx";
import PropTypes from "prop-types";

export default function FacilityCheckboxes({selectedFacilityIds, onFacilityToggled}) {
    const [facilities, setFacilities] = useState([]);

    useEffect(() => {
        backendApi.get("/facilities")
            .then(response => {
                setFacilities(response.data);
            })
            .catch(error => console.error("Error fetching facilities:", error));
    }, []);


    return (<>
            {facilities.map((facility) => (
                    <div key={facility.id} className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={`facility-${facility.id}`}
                            checked={selectedFacilityIds?.includes(facility.id) || false}
                            onChange={() => onFacilityToggled(facility.id)}
                        />
                        <label className="form-check-label" htmlFor={`facility-${facility.id}`}>
                            {facility.name}
                        </label>
                    </div>
            ))}
    </>);
}

FacilityCheckboxes.propTypes = {
    selectedFacilityIds: PropTypes.array,
    onFacilityToggled: PropTypes.func.isRequired,
}