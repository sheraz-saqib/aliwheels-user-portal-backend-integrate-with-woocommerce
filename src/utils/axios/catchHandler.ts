import { HttpException, HttpStatus } from '@nestjs/common';

export const catchHandler = (error: {
  response: { data: string | Record<string, any>; status: number };
  code: string;
  message: any;
}): HttpException => {
  // WooCommerce/API response
  if (error.response) {
    throw new HttpException(error.response.data, error.response.status);
  }

  // Request timeout

  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
    throw new HttpException(
      {
        statusCode: HttpStatus.REQUEST_TIMEOUT,
        message: 'Request timeout. The remote server took too long to respond.',

        code: error.code,
      },
      HttpStatus.REQUEST_TIMEOUT,
    );
  }

  // Connection reset

  if (error.code === 'ECONNRESET') {
    throw new HttpException(
      {
        statusCode: HttpStatus.BAD_GATEWAY,
        message: 'Connection was reset by the remote server.',

        code: error.code,
      },
      HttpStatus.BAD_GATEWAY,
    );
  }

  // DNS lookup failed

  if (error.code === 'ENOTFOUND') {
    throw new HttpException(
      {
        statusCode: HttpStatus.BAD_GATEWAY,
        message: 'Unable to resolve the remote host.',

        code: error.code,
      },
      HttpStatus.BAD_GATEWAY,
    );
  }

  // Connection refused

  if (error.code === 'ECONNREFUSED') {
    throw new HttpException(
      {
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: 'Remote server refused the connection.',

        code: error.code,
      },
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }

  // Network error

  if (error.code === 'ERR_NETWORK') {
    throw new HttpException(
      {
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: 'Network error. Please check your internet connection.',

        code: error.code,
      },
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }

  // Unknown error
  throw new HttpException(
    {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      message: error.message ?? 'Internal server error',

      code: error.code ?? 'UNKNOWN_ERROR',
    },
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
};
