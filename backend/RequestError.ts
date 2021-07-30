import util from 'util'

export class RequestError extends Error {
  title: string;
  errors: string[];
  status: number;

  constructor (title: string, message: string, status: number) {
    super(message);
    this.title = title;
    this.errors = [];
    this.status = status;
  }
}

export class ExtendedValidationError {
  title: string;
  message: string;
  errors: string[];
  status: number

  constructor (title: string, message: string) {
    this.title = title;
    this.message = message;
    this.status = 401;
  }

  [util.inspect.custom] (_depth, _opts) {
    let out = '';
    for (const error of this.errors) out += `\n    ${error}`;
    return `--------------------------------------------\n${this.title}\n  ${this.message}${out}`
  }
}
