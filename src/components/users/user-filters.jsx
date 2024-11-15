import PropTypes from "prop-types";
import {useForm} from "react-hook-form";
import {useEffect} from "react";

export default function UserFilters({filters, onFiltersChange, clearAllFilters}) {
    const {register, setValue, reset, handleSubmit, formState: {errors}} = useForm();

    useEffect(() => {
        if (filters) {
            Object.keys(filters).forEach(key => {
                setValue(`${key}`, filters[key]);
            });
        }
    }, [filters, setValue]);

    const onSubmit = (data) => {
        onFiltersChange(data);
    };

    const clearFilters = () => {
        clearAllFilters();
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/*First name*/}
            <div className="mb-3">
                <label htmlFor="firstName" className="form-label mb-0">Voornaam:</label>
                <input type="text" placeholder="Voornaam" className="form-control form-control-sm"
                       id="firstName" {...register("firstName")} />
            </div>

            {/*Last name*/}
            <div className="mb-3">
                <label htmlFor="lastName" className="form-label mb-0">Achternaam:</label>
                <input type="text" placeholder="Achternaam" className="form-control form-control-sm"
                       id="lastName" {...register("lastName")} />
            </div>

            {/*Email*/}
            <div className="mb-3">
                <label htmlFor="email" className="form-label mb-0">E-mailadres:</label>
                <input type="text" placeholder="E-mailadres" className="form-control form-control-sm"
                       id="email" {...register("email")} />
            </div>

            {/*Role*/}
            <div className="mb-3">
                <label htmlFor="role" className="form-label mb-0">Rol:</label>
                <select className="form-select form-select-sm" id="role" {...register("role")}>
                    <option value="">Alles</option>
                    <option value="VOLUNTEER">Vrijwilliger</option>
                    <option value="ADMIN">Administrator</option>
                </select>
            </div>

            <div className="mt-4 mb-5">
                <button type="submit" className="btn btn-primary me-2" onClick={handleSubmit(onSubmit)}>Pas toe</button>
                <button type={"button"} onClick={clearFilters} className={"btn btn-danger"}>Reset</button>
            </div>
        </form>
    );
}

UserFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    onFiltersChange: PropTypes.func.isRequired,
    clearAllFilters: PropTypes.func.isRequired
};