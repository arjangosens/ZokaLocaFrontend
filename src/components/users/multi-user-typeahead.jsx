import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {AsyncTypeahead} from "react-bootstrap-typeahead";
import {backendApi} from "../../utils/backend-api.jsx";
import 'react-bootstrap-typeahead/css/Typeahead.css';

export default function MultiUserTypeahead({initialSelectedUsers = [], onSelectedUsersChange, disabled = false}) {
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState(initialSelectedUsers);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const searchUsers = async (fullName) => {
        setIsLoading(true);
        const queryParamString = fullName ? `?fullName=${fullName}` : "";
        try {
            const response = await backendApi.get(`/users${queryParamString}`);
            setAllUsers(response.data.content);
            setErrorMsg(null);
        } catch (error) {
            console.error("Error fetching users: ", error);
            setErrorMsg("Er is een fout opgetreden bij het ophalen van de gebruikers. Probeer het later opnieuw.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUserSelection = (selected) => {
        const uniqueSelected = selected.filter((user, index, self) =>
            index === self.findIndex((u) => u.id === user.id)
        );
        setSelectedUsers(uniqueSelected);
        onSelectedUsersChange(uniqueSelected);
    };

    const filterBy = () => true;

    useEffect(() => {
        searchUsers(undefined).then();
    }, []);

    return (
        <>
            <AsyncTypeahead
                id="user-typeahead"
                labelKey={(option) => `${option.firstName} ${option.lastName}`}
                filterBy={filterBy}
                multiple={true}
                options={allUsers}
                placeholder="Zoek gebruikers..."
                emptyLabel={isLoading ? "Laden..." : "Geen gebruikers gevonden"}
                isLoading={isLoading}
                minLength={0}
                selected={selectedUsers}
                onChange={handleUserSelection}
                onSearch={searchUsers}
                disabled={disabled}
            />

            {errorMsg && <div className="text-danger">{errorMsg}</div>}
        </>
    );
}

MultiUserTypeahead.propTypes = {
    initialSelectedUsers: PropTypes.array,
    onSelectedUsersChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};