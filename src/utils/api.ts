import axios, { AxiosRequestConfig } from "axios";

interface IRequestOptions {
  url: string;
  body?: Record<string, any>;
  headers?: Record<string, string>;
}

interface Response<T> {
  status: "success" | "fail";
  results: number;
  data: T;
  message: string;
}

export class ApiService {
  private static API_URL = process.env.API_URL ?? "";
  private static API_URL_GOB = process.env.API_URL_GOB ?? "";

  private static async request<T>(
    options: AxiosRequestConfig
  ): Promise<Response<T>> {
    try {
      const response = await axios(options);
      return response.data;
    } catch (error: any) {
      const { response } = error;
      return JSON.stringify({ error }) as any;
    }
  }

  /**
   * Realiza una petición GET a la URL especificada.
   *
   * @param {IRequestOptions} options - Opciones de la solicitud, como la URL y las cabeceras.
   * @returns {Promise} Una promesa que resuelve en los datos de la respuesta.
   */
  public static async get<T>({
    url,
    headers = {},
  }: IRequestOptions): Promise<Response<T>> {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: `${this.API_URL}${url}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
      },
    };
    return this.request<T>(options);
  }

  public static async getDepartments<T>({
    url,
    headers = {},
  }: IRequestOptions): Promise<Response<T>> {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: `https://api.npoint.io/253f0ee259ef1620a547/departamentos`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
      },
    };
    return this.request<T>(options);
  }

  /**
   * Realiza una petición POST a la URL especificada.
   *
   * @param {IRequestOptions} options - Opciones de la solicitud, como la URL, el cuerpo y las cabeceras.
   * @returns {Promise} Una promesa que resuelve en los datos de la respuesta.
   */
  public static async post<T>({
    url,
    body = {},
    headers = {},
  }: IRequestOptions): Promise<Response<T>> {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: `http://localhost:7121/api/v1/${url}`,
      data: body,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        ...headers,
      },
    };
    return this.request<T>(options);
  }
}
