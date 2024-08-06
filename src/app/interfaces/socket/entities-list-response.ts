import { LaboratoryMemberResponse } from "../laboratory/laboratory-member-response";
import { PharmacyRepresentativeResponse } from "../pharmacy_representative/pharmacy-representative-response";

export interface EntitiesListResponse {
    pharmacyRepresentatives: PharmacyRepresentativeResponse[]
    laboratoryMembers: LaboratoryMemberResponse[]
}
