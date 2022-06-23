export class Env {
  public environment: string
  public appAddress: string
  public backendUrl: string

  constructor() {
    this.environment = String(process.env.NODE_ENV || 'undefined');
    this.appAddress = String(process.env.APP_ADDRESS || 'http://localhost:8082');
    this.backendUrl = String(process.env.BACKEND_URL || '');
  }
}

export const env = new Env();
