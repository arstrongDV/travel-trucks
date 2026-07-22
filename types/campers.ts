export type From = 'alcove' | 'panel_van' | 'integrated' | 'semi_integrated';

export type Transmission = 'automatic' | 'manual';

export type Engine = 'diesel' | 'petrol' | 'hybrid' | 'electric';

export interface Campers {
    id: string;
    name: string;
    price: number;
    rating: number;
    location: string;
    form: From;
    length: string;
    width: string;
    height: string;
    tank: string;
    consumption: string;
    transmission: Transmission;
    engine: Engine;
    amenities: string[];
    coverImage: string;
    totalReviews: number;
}

interface CamperGallery {
    id: string;
    camperId: string;
    thumb: string;
    original: string;
    order: number;
}

export interface Camper extends Campers {
    gallery: CamperGallery[];
    createdAt: Date;
    updatedAt: Date;
}

export interface CamperReview {
    id: string,
    camperId: string,
    reviewer_name: string,
    reviewer_rating: number,
    comment: string,
    createdAt: Date
}