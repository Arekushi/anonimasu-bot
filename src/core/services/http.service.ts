import { HTTPOptions } from '@core/interfaces/http-options';
import { Response } from '@core/interfaces/http-response';
import { HTTPRequestType } from '@core/types/http-request.type';
import { Observable, throwError, from } from 'rxjs';
import { shareReplay, retry, delay, map, catchError } from 'rxjs/operators';
import { injectable } from 'tsyringe';
import axios, { AxiosResponse } from 'axios';


@injectable()
export class HttpService {

  constructor() { }

  public get<T>(
    url: string,
    options?: HTTPOptions
  ): Observable<Response<T>> {
    return this.request<T>(
      'GET',
      `${url}`,
      options
    );
  }

  public post<T>(
    url: string,
    body?: any,
    options?: HTTPOptions
  ): Observable<Response<T>> {
    return this.request<T>(
      'POST',
      `${url}`,
      { body, ...options }
    );
  }

  public put<T>(
    url: string,
    body: any,
    options?: HTTPOptions
  ): Observable<Response<T>> {
    return this.request<T>(
      'PUT',
      `${url}`,
      { body, ...options }
    );
  }

  public delete<T>(
    url: string,
    options?: HTTPOptions
  ): Observable<Response<T>> {
    return this.request<T>(
      'DELETE',
      `${url}`,
      options
    );
  }

  public patch<T>(
    url: string,
    body: any,
    options?: HTTPOptions
  ): Observable<Response<T>> {
    return this.request<T>(
      'PATCH',
      `${url}`,
      { body, ...options }
    );
  }

  private request<T>(
    type: HTTPRequestType,
    url: string,
    options: HTTPOptions = {}
  ): any {
    const {
      body,
      headers,
    } = options;

    return from(
        axios.request<T>({
            method: type,
            data: body,
            url,
            headers
        })
    )
    .pipe(
        shareReplay(),
        retry(0),
        delay(500),
        map((res: AxiosResponse<T, any>) => {
          return {
            ok: res.status >= 200 && res.status <= 299,
            statusCode: res.status,
            statusText: res.statusText,
            data: res.data
          };
        }),
        catchError(error => {
            return throwError(() => {
                return {
                    ok: error.ok,
                    statusCode: error.status,
                    statusText: error.statusText,
                    data: error.error,
                    name: error.name,
                    message: error.message
                };
            });
        })
      );
  }

}
