import { map } from 'rxjs/operators';
import { HTTPOptions } from '@core/interfaces/http-options';
import { HttpService } from './http.service';
import { Response } from '@core/interfaces/http-response';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { firstValueFrom } from 'rxjs';

import { RouteProcessingAspect } from '@core/aspects/route-processing.aspect';


export abstract class Service {
    constructor(
        protected http: HttpService,
        protected url: string
    ) {
        this.http = http;
        this.url = url;
    }

    @UseAspect(Advice.Before, RouteProcessingAspect)
    get<T>(route: string, options?: HTTPOptions, getAll = false): Promise<Response<T> | T> {
        return firstValueFrom(
            this.http.get<T>(`${this.url}/${route}`, options).pipe(
                map((res: Response<T>) => {
                    return getAll ? res : res.data;
                })
            )
        );
    }

    @UseAspect(Advice.Before, RouteProcessingAspect)
    post<T>(route: string, body?: any, options?: HTTPOptions, getAll = false): Promise<Response<T> | T> {
        return firstValueFrom(
            this.http.post<T>(`${this.url}/${route}`, body, options).pipe(
                map((res: Response<T>) => {
                    return getAll ? res : res.data;
                })
            )
        );
    }

    @UseAspect(Advice.Before, RouteProcessingAspect)
    put<T>(route: string, body: any, options?: HTTPOptions, getAll = false): Promise<Response<T> | T> {
        return firstValueFrom(
            this.http.put<T>(`${this.url}/${route}`, body, options).pipe(
                map((res: Response<T>) => {
                    return getAll ? res : res.data;
                })
            )
        );
    }

    @UseAspect(Advice.Before, RouteProcessingAspect)
    delete<T>(route: string, options?: HTTPOptions, getAll = false): Promise<Response<T> | T> {
        return firstValueFrom(
            this.http.delete<T>(`${this.url}/${route}`, options).pipe(
                map((res: Response<T>) => {
                    return getAll ? res : res.data;
                })
            )
        );
    }

    @UseAspect(Advice.Before, RouteProcessingAspect)
    patch<T>(route: string, body: any, options?: HTTPOptions, getAll = false): Promise<Response<T> | T> {
        return firstValueFrom(
            this.http.patch<T>(`${this.url}/${route}`, body, options).pipe(
                map((res: Response<T>) => {
                    return getAll ? res : res.data;
                })
            )
        );
    }
}
