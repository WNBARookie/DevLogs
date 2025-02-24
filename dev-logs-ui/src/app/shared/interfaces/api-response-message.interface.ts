export interface ApiResponseMessage {
    summary: string;
    details: string;
    status: number;
    instance: string;
    timestamp: Date;
    token?: string;
}