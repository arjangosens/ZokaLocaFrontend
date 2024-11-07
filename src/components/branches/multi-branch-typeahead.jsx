import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {AsyncTypeahead} from "react-bootstrap-typeahead";
import {backendApi} from "../../utils/backend-api.jsx";
import 'react-bootstrap-typeahead/css/Typeahead.css';

export default function MultiBranchTypeahead({initialSelectedBranches = [], onSelectedBranchesChange, disabled = false}) {
    const [allBranches, setAllBranches] = useState([]);
    const [selectedBranches, setSelectedBranches] = useState(initialSelectedBranches);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const searchBranches = async (name) => {
        setIsLoading(true);
        const queryParamString = name ? `?name=${name}` : "";
        try {
            const response = await backendApi.get(`/branches${queryParamString}`);
            setAllBranches(response.data.content);
            setErrorMsg(null);
        } catch (error) {
            console.error("Error fetching branches: ", error);
            setErrorMsg("Er is een fout opgetreden bij het ophalen van de speltakken. Probeer het later opnieuw.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleBranchSelection = (selected) => {
        setSelectedBranches(selected);
        onSelectedBranchesChange(selected);
    };

    const filterBy = () => true;

    useEffect(() => {
        searchBranches(undefined).then();
    }, []);

    return (
        <>
            <AsyncTypeahead
                id="branch-typeahead"
                labelKey="name"
                filterBy={filterBy}
                multiple={true}
                options={allBranches}
                placeholder="Zoek speltakken..."
                emptyLabel={isLoading ? "Laden..." : "Geen speltakken gevonden"}
                isLoading={isLoading}
                minLength={0}
                selected={selectedBranches}
                onChange={handleBranchSelection}
                onSearch={searchBranches}
                disabled={disabled}
            />

            {errorMsg && <div className="text-danger">{errorMsg}</div>}
        </>
    );
}

MultiBranchTypeahead.propTypes = {
    initialSelectedBranches: PropTypes.array,
    onSelectedBranchesChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};