export interface ApiResponse<T> {
    statusCode: number;
    success: boolean;
    data: T | null;
    message: string;
    timestamp: string;
    path: string;
}
