import { ClientResponse } from "../client/client-response";
import { LaboratoryResponse } from "../laboratory/laboratory-response";

export interface EntitiesListResponse {
    clients: ClientResponse[]
    laboratories: LaboratoryResponse[]
}
