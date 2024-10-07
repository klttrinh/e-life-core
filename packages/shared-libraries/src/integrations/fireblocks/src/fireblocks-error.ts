export default class FireBlocksError extends Error {
  private statusCode: number;

  private fireblocksCode: number;

  constructor(message, fireblocksCode, statusCode) {
    super(message);
    this.name = 'FireBlocksError';
    this.message = message;
    this.statusCode = statusCode;
    this.fireblocksCode = fireblocksCode;
  }
}
