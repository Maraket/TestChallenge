export interface Day {
    title: string;
    dayIndex: number;
}

export interface Name {
    last: string;
    first: string;
}

export interface Worker {
    rating: number;
    isActive: boolean;
    certificates: string[];
    skills: string[];
    jobSearchAddress: {
        unit: string;
        maxJobDistance: number;
        longitude: string;
        latitude: string;
    };
    transportation: string;
    hasDriversLicense: boolean;
    availability: Day | null [];
    phone: string;
    email: string;
    name: Name;
    age: number;
    guid: string;
    userId: number;
}