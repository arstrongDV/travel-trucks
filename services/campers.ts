import { 
    Camper, 
    CamperReview, 
    Campers, 
    Engine, 
    Form, 
    Transmission 
} from "@/types/campers";

import nextServer from "./api";


export interface getCampersParams {
    page?: number;
    perPage?: number;
    location?: string;
    form?: Form;
    transmission?: Transmission;
    engine?: Engine;
}

interface getCampersResponse {
    page: number,
    perPage: number,
    total: number,
    totalPages: number,
    campers: Campers[]
}

interface getCampersFiltersResponse {
    forms: Form[],
    transmissions: Transmission[],
    engines: Engine[]
}

interface bookCamperPayload {
    name: string;
    email: string
}

export const getCampers = async (params?: getCampersParams): Promise<getCampersResponse> => {
    const res = await nextServer.get<getCampersResponse>('/campers', { params: params });
    return res.data;
}

export const getCampersFilters = async (): Promise<getCampersFiltersResponse> => {
    const res = await nextServer.get<getCampersFiltersResponse>('/campers/filters');
    return res.data;
}

export const getCamper = async (camperId: string): Promise<Camper> => {
    const res = await nextServer.get<Camper>(`/campers/${camperId}`);
    return res.data;
}

export const getCamperReviews = async (camperId: string): Promise<CamperReview> => {
    const res = await nextServer.get<CamperReview>(`/campers/${camperId}/reviews`);
    return res.data;
}

export const bookCamper = async (camperId: string, payload: bookCamperPayload): Promise<{ message: string }> => {
    const res = await nextServer.post<{ message: string }>(`/campers/${camperId}/booking-requests`, payload);
    return res.data;
}