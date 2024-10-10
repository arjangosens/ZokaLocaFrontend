import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import AddressPropTypes from "../../../domain/prop-types/address.jsx";

export default function AddressForm({ address }) {
    const { register, formState: { errors }, setValue, watch } = useFormContext();
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
            .then(response => {
                const countryList = response.data.map(country => ({
                    code: country.cca2,
                    name: country.translations.nld.common
                }));
                setCountries(countryList);
            })
            .catch(error => console.error("Error fetching countries:", error));
    }, []);

    useEffect(() => {
        if (address) {
            Object.keys(address).forEach(key => {
                setValue(`address.${key}`, address[key]);
            });
        }
    }, [address, setValue]);

    const selectedCountry = watch("address.country");

    return (
        <div className="row">
            <div className="col-8 mb-3">
                <label>Straat</label>
                <input
                    className={"form-control" + (errors.address?.street ? " is-invalid" : "")}
                    placeholder="Straat"
                    type="text"
                    {...register("address.street")}
                />
            </div>
            <div className="col-4 mb-3">
                <label>Huisnummer</label>
                <input
                    className={"form-control" + (errors.address?.houseNumber ? " is-invalid" : "")}
                    placeholder="Huisnummer"
                    type="text"
                    {...register("address.houseNumber")}
                />
            </div>
            <div className="col-8 mb-3">
                <label>Stad<small className="text-danger">*</small></label>
                <input
                    className={"form-control" + (errors.address?.city ? " is-invalid" : "")}
                    placeholder="Stad"
                    type="text"
                    {...register("address.city", { required: true })}
                />
                {errors.address?.city && <div className="invalid-feedback">Dit veld is vereist</div>}
            </div>
            <div className="col-4 mb-3">
                <label>Postcode</label>
                <input
                    className={"form-control" + (errors.address?.zipcode ? " is-invalid" : "")}
                    placeholder="Postcode"
                    type="text"
                    {...register("address.zipcode")}
                />
            </div>
            <div className="col-12 mb-3">
                <label>Land<small className="text-danger">*</small></label>
                <select
                    className={"form-select" + (errors.address?.country ? " is-invalid" : "")}
                    {...register("address.country", { required: true })}
                    value={selectedCountry}
                >
                    <option value="">Selecteer...</option>
                    {countries.map(country => (
                        <option key={country.code} value={country.code}>
                            {country.name}
                        </option>
                    ))}
                </select>
                {errors.address?.country && <div className="invalid-feedback">Dit veld is vereist</div>}
            </div>
            <div className="col-12 mb-3">
                <label>Afstand vanaf Gilze</label>
                <div className="input-group">
                    <input
                        className={"form-control" + (errors.address?.distanceInKm ? " is-invalid" : "")}
                        placeholder="Afstand"
                        type="number"
                        {...register("address.distanceInKm")}
                    />
                    <span className="input-group-text">km</span>
                </div>

            </div>
        </div>
    );
}

AddressForm.propTypes = {
    address: AddressPropTypes,
    register: PropTypes.func,
    errors: PropTypes.object
};