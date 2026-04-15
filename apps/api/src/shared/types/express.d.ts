declare namespace Express {
  export interface Request {
    requestId?: string;
    auth?: {
      userId: number;
      employeeId?: number;
      roleCodes: string[];
      permissionCodes: string[];
    };
  }
}
