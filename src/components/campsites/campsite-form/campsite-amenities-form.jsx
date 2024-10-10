import {useFormContext} from "react-hook-form";
import PropTypes from "prop-types";
import CampsitePropTypes from "../../../domain/prop-types/campsite.jsx";

export default function CampsiteAmenitiesForm({campsite}) {
    const {register, formState: {errors}, setValue, watch} = useFormContext();
    const campsiteType = watch("campsiteType");

    return (
        <>
            <div className="row">
                <div className="col-6 mb-3">
                    <label>Aantal toiletten</label>
                    <div className="input-group">
                        <span className="input-group-text"><i className="fa-solid fa-toilet"></i></span>

                        <input
                            type="number"
                            className="form-control"
                            {...register("numOfToilets")}
                        />
                    </div>
                </div>

                <div className="col-6 mb-3">
                    <label>Aantal douches</label>
                    <div className="input-group">
                        <span className="input-group-text"><i className="fa-solid fa-shower"></i></span>
                        <input
                            type="number"
                            className="form-control"
                            {...register("numOfShowers")}
                        />
                    </div>
                </div>

                <div className="col-6 mb-3">
                    <label>Aantal waterpunten</label>
                    <div className="input-group">
                        <span className="input-group-text"><i className="fa-solid fa-faucet-drip"></i></span>
                        <input
                            type="number"
                            className="form-control"
                            {...register("numOfWaterSources")}
                        />
                    </div>
                </div>

                {campsiteType === "BUILDING" && (
                    <>
                        <div className="col-6 mb-3">
                            <label>Aantal lokalen</label>
                            <div className="input-group">
                                <span className="input-group-text"><i className="fa-solid fa-door-closed"></i></span>
                                <input
                                    type="number"
                                    className="form-control"
                                    {...register("numOfRooms")}
                                />
                            </div>
                        </div>
                        <div className="col-6 mb-3">
                            <label>Aantal gedeelde ruimtes</label>
                            <div className="input-group">
                                <span className="input-group-text"><i className="fa-solid fa-door-open"></i></span>
                                <input
                                    type="number"
                                    className="form-control"
                                    {...register("numOfCommonAreas")}
                                />
                            </div>
                        </div>
                    </>
                )}
                {campsiteType === "FIELD" && (
                    <div className="col-6 mb-3">
                        <label>Grootte</label>
                        <div className="input-group">
                            <span className="input-group-text"><i className="fa-solid fa-maximize"></i></span>
                            <input
                                type="number"
                                className="form-control"
                                {...register("sizeSquareMeters")}
                            />
                            <span className="input-group-text">m²</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

CampsiteAmenitiesForm.propTypes = {
    campsite: CampsitePropTypes
};