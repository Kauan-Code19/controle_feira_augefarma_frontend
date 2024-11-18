import { Role } from "../../shared/enums/role";

export interface LoginResponse {
    token: string,
    role: Role
}
