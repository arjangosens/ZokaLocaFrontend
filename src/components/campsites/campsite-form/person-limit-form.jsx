import {useFormContext} from "react-hook-form";
import {useEffect} from "react";
import PropTypes from 'prop-types';
export default function PersonLimitForm({personLimit}) {
    const {register, formState: {errors}, setValue} = useFormContext();

    useEffect(() => {
        if (personLimit) {
            Object.keys(personLimit).forEach(key => {
                setValue(`personLimit.${key}`, personLimit[key]);
            });
        }
    }, [personLimit, setValue]);

    return (
        <div className="row">
            <div className="col-6 mb-3">
                <label>Minimaal</label>
                <input
                    className={"form-control" + (errors.personLimit?.minimum ? " is-invalid" : "")}
                    placeholder="Minimaal"
                    type="number"
                    {...register("personLimit.minimum")}
                />
            </div>
            <div className="col-6 mb-3">
                <label>Maximaal</label>
                <input
                    className={"form-control" + (errors.personLimit?.maximum ? " is-invalid" : "")}
                    placeholder="Maximaal"
                    type="number"
                    {...register("personLimit.maximum")}
                />
            </div>
        </div>
    );
}

PersonLimitForm.propTypes = {
    personLimit: PropTypes.object
};