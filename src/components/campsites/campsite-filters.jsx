import PropTypes from "prop-types";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import FacilityCheckboxes from "./facility-checkboxes.jsx";

export default function CampsiteFilters({filters, onFiltersChange}) {
    const {register, setValue, reset, handleSubmit, formState: {errors}} = useForm();

    useEffect(() => {
        if (filters) {
            Object.keys(filters).forEach(key => {
                setValue(`${key}`, filters[key]);
            });
        }
    }, [filters, setValue]);

    const onSubmit = (data) => {
        console.log("Filters submitted");
        console.log(data);
        onFiltersChange(data);
    };

    const clearFilters = () => {
        console.log("Clearing filters");
        onFiltersChange({});
        reset();
    };

    const handleFacilityToggled = (facilityId) => {
        const updatedFacilityIds = filters?.facilityIds?.includes(facilityId)
            ? filters.facilityIds.filter(id => id !== facilityId)
            : [...(filters?.facilityIds || []), facilityId];
        onFiltersChange({...filters, facilityIds: updatedFacilityIds});
    }

    return (
        <form>
            {/*Name*/}
            <div className="mb-3">
                <label htmlFor="name" className="form-label mb-0">Naam:</label>
                <input type="text" placeholder="Naam" className="form-control form-control-sm"
                       id="name" {...register("name")} />
            </div>


            {/*Campsite type*/}
            <div className="mb-3">
                <label htmlFor="campsiteType" className="form-label mb-0">Soort locatie:</label>
                <select className="form-select form-select-sm" id="campsiteType" {...register("campsiteType")}>
                    <option value="">Alles</option>
                    <option value="BUILDING">Gebouw</option>
                    <option value="FIELD">Kampeerveld</option>
                </select>
            </div>

            {/*Distance range*/}
            <div className="mb-3">
                <label htmlFor="distance" className="form-label mb-0">Afstand vanaf Gilze (km):</label>
                <div className="input-group input-group-sm">
                    <input type="number" placeholder="Min" className="form-control form-control-sm"
                           id="distanceMin" {...register("minDistanceInKm")} />
                    <span className="input-group-text">-</span>
                    <input type="number" placeholder="Max" className="form-control form-control-sm"
                           id="distanceMax" {...register("maxDistanceInKm")} />
                </div>
            </div>

            {/*Number of people*/}
            <div className="mb-3">
                <label htmlFor="numOfPeople" className="form-label mb-0">Aantal personen:</label>
                <div className="input-group input-group-sm">
                    <span className="input-group-text"><i className="fa-solid fa-users"></i></span>
                    <input id="numOfPeople" type="number" placeholder="Aantal personen"
                           className="form-control form-control-sm"
                           {...register("numOfPeople")} />
                </div>
            </div>

            {/*Min number of toilets*/}
            <div className="mb-3">
                <label htmlFor="minNumOfToilets" className="form-label mb-0">Min. aantal toiletten:</label>
                <div className="input-group input-group-sm">
                    <span className="input-group-text"><i className="fa-solid fa-toilet"></i></span>
                    <input id="minNumOfToilets" type="number" placeholder="Min. aantal toiletten"
                           className="form-control form-control-sm"
                           {...register("minNumOfToilets")} />
                </div>
            </div>

            {/*Min number of showers*/}
            <div className="mb-3">
                <label htmlFor="minNumOfShowers" className="form-label mb-0">Min. aantal douches:</label>
                <div className="input-group input-group-sm">
                    <span className="input-group-text"><i className="fa-solid fa-shower"></i></span>
                    <input id="minNumOfShowers" type="number" placeholder="Min. aantal douches"
                           className="form-control form-control-sm"
                           {...register("minNumOfShowers")} />
                </div>
            </div>

            {/*Min number of water sources*/}
            <div className="mb-3">
                <label htmlFor="minNumOfWaterSources" className="form-label mb-0">Min. aantal waterpunten:</label>
                <div className="input-group input-group-sm">
                    <span className="input-group-text"><i className="fa-solid fa-faucet-drip"></i></span>
                    <input id="minNumOfWaterSources" type="number" placeholder="Min. aantal waterpunten"
                           className="form-control form-control-sm"
                           {...register("minNumOfWaterSources")} />
                </div>
            </div>

            {/*minNumOfRooms*/}
            <div className="mb-3">
                <label htmlFor="minNumOfRooms" className="form-label mb-0">Min. aantal lokalen: <small></small></label>
                <div className="input-group input-group-sm">
                    <span className="input-group-text"><i className="fa-solid fa-house"></i></span>
                    <span className="input-group-text"><i className="fa-solid fa-door-closed"></i></span>
                    <input id="minNumOfRooms" type="number" placeholder="Aantal lokalen"
                           className="form-control form-control-sm"
                           {...register("minNumOfRooms")} />
                </div>
            </div>

            {/*minNumOfCommonAreas*/}
            <div className="mb-3">
                <label htmlFor="minNumOfCommonAreas" className="form-label mb-0">Min. aantal gedeelde
                    ruimtes: <small></small></label>
                <div className="input-group input-group-sm">
                    <span className="input-group-text"><i className="fa-solid fa-house"></i></span>
                    <span className="input-group-text"><i className="fa-solid fa-door-open"></i></span>
                    <input id="minNumOfCommonAreas" type="number" placeholder="Aantal gedeelde ruimtes"
                           className="form-control form-control-sm"
                           {...register("minNumOfCommonAreas")} />
                </div>
            </div>

            {/*minSizeSquareMeters*/}
            <div className="mb-3">
                <label htmlFor="minSizeSquareMeters" className="form-label mb-0">Min. grootte kampeerveld (m²):</label>
                <div className="input-group input-group-sm">
                    <span className="input-group-text"><i className="fa-solid fa-campground"></i></span>
                    <span className="input-group-text"><i className="fa-solid fa-maximize"></i></span>
                    <input id="minSizeSquareMeters" type="number" placeholder="Min. grootte"
                           className="form-control form-control-sm"
                           {...register("minSizeSquareMeters")} />
                </div>
            </div>

            {/* Facilities */}
            <p className="mb-0">Overige voorzieningen:</p>
            <FacilityCheckboxes onFacilityToggled={handleFacilityToggled} selectedFacilityIds={filters?.facilityIds}/>



            <div className="mt-4 mb-5">
                <button type="submit" className="btn btn-primary me-2" onClick={handleSubmit(onSubmit)}>Pas toe</button>
                <button type={"button"} onClick={clearFilters} className={"btn btn-danger"}>Reset</button>
            </div>
        </form>
    );
}

CampsiteFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    onFiltersChange: PropTypes.func.isRequired,
}