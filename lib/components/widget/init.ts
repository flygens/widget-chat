export class FlygensAgent {
  private static _instance: FlygensAgent;
  private _apiKey: string | null = null;
  private _initialized = false;

  private constructor() {}

  static get instance(): FlygensAgent {
    if (!FlygensAgent._instance) {
      FlygensAgent._instance = new FlygensAgent();
    }
    return FlygensAgent._instance;
  }

  setApiKey(apiKey: string): void {
    this._apiKey = apiKey;
    this._initialized = true;
  }

  getApiKey(): string | null {
    return this._apiKey;
  }

  get isInitialized(): boolean {
    return this._initialized;
  }
}

export const initFlygensWidget = (publicKey: string) => {
  FlygensAgent.instance.setApiKey(publicKey);
};
