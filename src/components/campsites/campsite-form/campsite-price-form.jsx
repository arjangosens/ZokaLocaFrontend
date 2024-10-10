import {useFormContext} from "react-hook-form";
import {useEffect} from "react";
import CampsitePricePropTypes from "../../../domain/prop-types/campsite-price.jsx";
import PriceMode from "../../../domain/enums/price-mode.jsx";

export default function CampsitePriceForm({price}) {
    const {register, formState: {errors}, setValue, watch} = useFormContext();

    useEffect(() => {
        if (price) {
            Object.keys(price).forEach(key => {
                setValue(`price.${key}`, price[key]);
            });
        }
    }, [price, setValue]);

    return (
        <div className="row">
            <div className="col-6 mb-3">
                <label>Prijs</label>
                <div className="input-group">
                    <span className="input-group-text">€</span>
                    <input
                        className={"form-control" + (errors.price?.amount ? " is-invalid" : "")}
                        placeholder="0,00"
                        type="number"
                        step="0.01"
                        {...register("price.amount", {required: true})}
                    />
                    {errors.price?.amount && <div className="invalid-feedback">Prijs is verplicht</div>}
                </div>
            </div>
            <div className="col-6 mb-3">
                <label>Prijssoort</label>
                <select
                    className={"form-select" + (errors.price?.priceMode ? " is-invalid" : "")}
                    {...register("price.priceMode", {required: true})}>
                    <option value="">Kies prijssoort...</option>
                    <option value={PriceMode.CONSTANT}>Vaste prijs (per nacht)</option>
                    <option value={PriceMode.PER_PERSON}>Prijs per persoon (per nacht)</option>
                </select>
                {errors.price?.priceMode && <div className="invalid-feedback">Prijssoort is verplicht</div>}
            </div>
        </div>
    );
}

CampsitePriceForm.propTypes = {
    price: CampsitePricePropTypes
}