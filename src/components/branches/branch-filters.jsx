import {useForm} from "react-hook-form";
import {useEffect} from "react";

export default function BranchFilters({filters, onFiltersChange, clearAllFilters}) {
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
            {/*Name*/}
            <div className="mb-3">
                <label htmlFor="firstName" className="form-label mb-0">Naam:</label>
                <input type="text" placeholder="Naam" className="form-control form-control-sm"
                       id="firstName" {...register("name")} />
            </div>

            <div className="mt-4 mb-5">
                <button type="submit" className="btn btn-primary me-2" onClick={handleSubmit(onSubmit)}>Pas toe</button>
                <button type={"button"} onClick={clearFilters} className={"btn btn-danger"}>Reset</button>
            </div>
        </form>
    );
}