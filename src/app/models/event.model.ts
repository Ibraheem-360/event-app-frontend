export interface Events {
    id?: number;
    title: string;
    description: string;
    location: string;
    eventDate: string;
    capacity: number;
    creator?: {
        id: number;
        username: string;
    };
}
