import PropTypes from 'prop-types';
import {backendApi} from "../../../utils/backend-api.jsx";
import { useEffect, useState } from "react";
export default function CampsiteFacilitiesForm({initialFacilities, onFacilitiesChange}) {
    const [facilities, setFacilities] = useState(initialFacilities || []);
    const [allFacilities, setAllFacilities] = useState([]);

    useEffect(() => {
        backendApi.get("/facilities")
            .then(response => {
                setAllFacilities(response.data);
            })
            .catch(error => console.error("Error fetching facilities:", error));
    }, []);

    const handleCheckboxChange = (facility) => (e) => {
        const updatedFacilities = e.target.checked
            ? [...facilities, facility]
            : facilities.filter(f => f.id !== facility.id);
        setFacilities(updatedFacilities);
        onFacilitiesChange(updatedFacilities);
    }

    return (
        <div className="row">
            {allFacilities.map((facility) => (
                <div key={facility.id} className="col-6 col-lg-4 mb-3">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={`facility-${facility.id}`}
                            checked={facilities.some((f) => f.id === facility.id)}
                            onChange={handleCheckboxChange(facility)}
                        />
                        <label className="form-check-label" htmlFor={`facility-${facility.id}`}>
                            {facility.name}
                        </label>
                    </div>
                </div>
            ))}
        </div>
    );
}

CampsiteFacilitiesForm.propTypes = {
    initialFacilities: PropTypes.array,
    onFacilitiesChange: PropTypes.func.isRequired,
};