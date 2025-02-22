export class ApiResponse {
  summary: string;
  details: string;
  status: number;
  instance: string;
  timeStamp: Date;
  token?: string;

  constructor(summary: string, details: string, status: number, instance: string, token?: string) {
    this.summary = summary;
    this.details = details;
    this.status = status;
    this.instance = instance;
    this.timeStamp = new Date();
    this.token = token;
  }

  static badRequest(summary: string, details: string, status: number, instance: string) {
    return new ApiResponse(summary, details, status, instance);
  }

  static internal(summary: string, details: string, status: number, instance: string) {
    return new ApiResponse(summary, details, 500, instance);
  }

  static goodRequest(summary: string, details: string, status: number, instance: string, token?: string) {
    return new ApiResponse(summary, details, 200, instance, token);
  }
}

