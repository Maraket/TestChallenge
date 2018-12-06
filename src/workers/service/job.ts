export interface Job {
    driverLicenseRequired: string;
    requiredCertificates: string[];
    location: {
        longitude: string,
        latitude: string,
    };
    billRate: string;
    workersRequired: number;
    startDate: string;
    about: string;
    jobTitle: string;
    company: string;
    guid: string;
    jobId: number;
}