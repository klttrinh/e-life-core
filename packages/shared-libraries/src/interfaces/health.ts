export interface HealthStatusReturnType {
  [key: string]: { status: 'up' | 'down' };
}
