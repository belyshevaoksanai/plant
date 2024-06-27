export interface IPlant {
    id: string;
    name: string;
    location_id: string;
    location: string;
    watering_date: string;
    days_between_watering: number;
}

export interface ILocation {
    id: string;
    name: string;
}
