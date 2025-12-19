import axios, { AxiosError } from "axios";

class ApiError extends Error {
  constructor(message, response) {
    super(message);
    this.response = response;
  }
}

export class ApiService {
  _getError(err) {
    if (err instanceof AxiosError) {
      return new ApiError(
        err.response.data?.error?.message ?? err.message,
        err.response,
      );
    } else {
      return new ApiError(err.message, err.response);
    }
  }

  _wrapper1(method, url) {
    return async () => {
      try {
        const response = await method(url);

        return {
          __state: "success",
          ...response,
        };
      } catch (err) {
        return {
          __state: "error",
          data: this._getError(err),
        };
      }
    };
  }

  _wrapper2(method, url, payload) {
    return async () => {
      try {
        const response = await method(url, payload);

        return {
          __state: "success",
          ...response,
        };
      } catch (err) {
        return {
          __state: "error",
          data: this._getError(err),
        };
      }
    };
  }

  $get(url) {
    return this._wrapper1(axios.get, url)();
  }

  $post(url, payload) {
    return this._wrapper2(axios.post, url, payload)();
  }

  $put(url, payload) {
    return this._wrapper2(axios.put, url, payload)();
  }

  $delete(url) {
    return this._wrapper1(axios.delete, url)();
  }
}
