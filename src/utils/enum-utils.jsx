import CampsiteType from "../domain/enums/campsite-type.jsx";
import SurroundingProximity from "../domain/enums/surrounding-proximity.jsx";
import UserRole from "../domain/enums/user-role.jsx";

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

    static translateUserRole(role) {
        switch (role) {
            case UserRole.ADMIN:
                return "Administrator";
            case UserRole.VOLUNTEER:
                return "Vrijwilliger";
            default:
                return "Onbekend";
        }
    }
}