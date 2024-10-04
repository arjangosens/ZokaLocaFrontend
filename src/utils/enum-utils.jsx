import CampsiteType from "../enums/campsite-type.jsx";
import SurroundingProximity from "../enums/SurroundingProximity.jsx";

export default class EnumUtils {
    static translateCampsiteType(type) {
        switch (type) {
            case CampsiteType.BUILDING:
                return "Gebouw";
            case CampsiteType.FIELD:
                return "Kampeerveld";
            default:
                return "Onbekend";
        }
    }

    static translateSurroundingProximity(proximity) {
        switch (proximity) {
            case SurroundingProximity.UNKNOWN:
                return "Onbekend";
            case SurroundingProximity.NOT_IN_PROXIMITY:
                return "Niet in de buurt";
            case SurroundingProximity.WALKING_DISTANCE:
                return "Loopafstand";
            case SurroundingProximity.CYCLING_DISTANCE:
                return "Fietsafstand";
            default:
                return "Onbekend";
        }
    }
}