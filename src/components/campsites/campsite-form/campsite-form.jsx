import PropTypes from "prop-types";
import {useEffect} from "react";
import {FormProvider, useForm} from "react-hook-form";
import AddressForm from "./address-form.jsx";

export default function CampsiteForm({campsite, onSubmit}) {
    const methods = useForm({
        mode: "all",
        defaultValues: {
            name: "",
            campsiteType: null,
            description: "",
            address: {
                street: "",
                houseNumber: "",
                city: "",
                zipcode: "",
                country: "",
                distanceInKm: 0
            },
            personLimit: {
                minimum: 0,
                maximum: 0
            },
            price: {
                priceMode: "",
                amount: 0
            },
            arrivalTime: "",
            departureTime: "",
            numOfToilets: 0,
            numOfShowers: 0,
            numOfWaterSources: 0,
            surroundings: new Map([["forest", ""], ["swimming pool", ""]]),
            externalSources: {},
            facilities: [],
            campgroundId: null,
            numOfRooms: 0,
            numOfCommonAreas: 0,
            sizeSquareMeters: 0
        }
    });

    const {setValue} = methods;

    useEffect(() => {
        if (campsite) {
            Object.keys(campsite).forEach(key => {
                setValue(key, campsite[key]);
            });
        }
    }, [campsite, setValue]);

    const onSubmitHandler = (data) => {
        onSubmit(data);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
                <div className="row">
                    <div className="col-12 col-md-6 mb-3">
                        <label>Naam<small className="text-danger">*</small></label>
                        <input
                            className={"form-control" + (methods.formState.errors.name ? " is-invalid" : "")}
                            placeholder="Naam"
                            type="text"
                            {...methods.register("name", {required: true})}
                        />
                        {methods.formState.errors.name && <div className="invalid-feedback">Dit veld is vereist</div>}
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <label>Soort locatie<small className="text-danger">*</small></label>
                        <select
                            className={"form-select" + (methods.formState.errors.campsiteType ? " is-invalid" : "")}
                            {...methods.register("campsiteType", {required: true})}>
                            <option value="">Selecteer...</option>
                            <option value="BUILDING">Gebouw</option>
                            <option value="FIELD">Kampeerveld</option>
                        </select>
                        {methods.formState.errors.campsiteType &&
                            <div className="invalid-feedback">Dit veld is vereist</div>}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mb-3">
                        <div className="card text-bg-light ">
                            <div className="card-header">
                                <i className="fa-solid fa-city"></i> Adres
                            </div>
                            <div className="card-body">
                                <AddressForm address={campsite?.address}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mb-3">
                        <div className="card text-bg-light ">
                            <div className="card-header">
                                <i className="fa-solid fa-clock"></i> Aankomst- en vertrektijden
                            </div>
                            <div className="card-body row">
                                <div className="col-6 mb-3">
                                    <label>Aankomsttijd</label>
                                    <input
                                        className={"form-control" + (methods.formState.errors.arrivalTime ? " is-invalid" : "")}
                                        placeholder="Aankomsttijd"
                                        type="time"
                                        {...methods.register("arrivalTime")}
                                    />
                                </div>
                                <div className="col-6 mb-3">
                                    <label>Vertrektijd</label>
                                    <input
                                        className={"form-control" + (methods.formState.errors.departureTime ? " is-invalid" : "")}
                                        placeholder="Vertrektijd"
                                        type="time"
                                        {...methods.register("departureTime")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary" type="submit">Opslaan</button>
            </form>
        </FormProvider>
    );
}

CampsiteForm.propTypes = {
    campsite: PropTypes.object,
    onSubmit: PropTypes.func.isRequired
};