// src/types/index.ts
export interface TokenPriceRequest {
  token: string;
  network: 'ethereum' | 'polygon';
  timestamp: number;
}

export interface ScheduleRequest {
  token: string;
  network: 'ethereum' | 'polygon';
}
