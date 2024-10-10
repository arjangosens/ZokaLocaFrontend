import PropTypes from "prop-types";
import {useEffect} from "react";
import {FormProvider, useForm} from "react-hook-form";
import AddressForm from "./address-form.jsx";
import PersonLimitForm from "./person-limit-form.jsx";
import ExternalSourcesForm from "./external-sources-form.jsx";
import CampsiteAmenitiesForm from "./campsite-amenities-form.jsx";
import CampsitePropTypes from "../../../domain/prop-types/campsite.jsx";
import CampsiteFacilitiesForm from "./campsite-facilities-form.jsx";
import CampsiteSurroundingsForm from "./campsite-surroundings-form.jsx";
import CampsitePriceForm from "./campsite-price-form.jsx";

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

    const handleExternalSourcesChange = (updatedSources) => {
        setValue("externalSources", updatedSources);
    };

    const handleFacilitiesChange = (updatedFacilities) => {
        setValue("facilities", updatedFacilities);
    }

    const handleSurroundingsChange = (updatedSurroundings) => {
        setValue("surroundings", updatedSurroundings);
    }

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
                        <label>Beschrijving</label>
                        <textarea
                            rows={5}
                            className={"form-control" + (methods.formState.errors.description ? " is-invalid" : "")}
                            placeholder="Beschrijving"
                            {...methods.register("description")}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center">Praktisch</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mb-3">
                        <div className="card">
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
                    <div className="col-12 col-md-6 mb-3">
                        <div className="card">
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
                    <div className="col-12 col-md-6 mb-3">
                        <div className="card">
                            <div className="card-header">
                                <i className="fa-solid fa-users"></i> Aantal personen
                            </div>
                            <div className="card-body">
                                <PersonLimitForm limit={campsite?.personLimit}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mb-3">
                        <div className="card">
                            <div className="card-header">
                                <i className="fa-solid fa-euro"></i> Prijs
                            </div>
                            <div className="card-body">
                                <CampsitePriceForm price={campsite?.price}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mb-3">
                        <div className="card">
                            <div className="card-header">
                                <i className="fa-solid fa-globe"></i> Externe bronnen
                            </div>
                            <div className="card-body">
                                <ExternalSourcesForm initialExternalSources={campsite?.externalSources}
                                                     onExternalSourcesChange={handleExternalSourcesChange}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center">Voorzieningen</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mb-3">
                        <div className="card">
                            <div className="card-header">
                                Algemeen
                            </div>
                            <div className="card-body">
                                <CampsiteAmenitiesForm campsite={campsite}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mb-3">
                        <div className="card">
                            <div className="card-header">
                                Overig
                            </div>
                            <div className="card-body">
                                <CampsiteFacilitiesForm initialFacilities={campsite?.facilities}
                                                        onFacilitiesChange={handleFacilitiesChange}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mb-3">
                        <div className="card">
                            <div className="card-header">
                                Omgeving
                            </div>
                            <div className="card-body">
                                <CampsiteSurroundingsForm initialSurroundings={campsite?.surroundings}
                                                          onSurroundingsChange={handleSurroundingsChange}/>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary mb-5" type="submit">Opslaan</button>
            </form>
        </FormProvider>
    );
}

CampsiteForm.propTypes = {
    campsite: CampsitePropTypes,
    onSubmit: PropTypes.func.isRequired,
};