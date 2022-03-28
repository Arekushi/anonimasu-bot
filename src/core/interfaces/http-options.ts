import { AxiosRequestHeaders } from 'axios';

type Params = {
  [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>
};

type Observer = 'body' | 'events' | 'response';

type ResponseType = 'arraybuffer' | 'blob' | 'json' | 'text';


export interface HTTPOptions {
  body?: any;
  headers?: AxiosRequestHeaders;
  params?: Params;
  observe?: Observer;
  responseType?: ResponseType;
  reportProgress?: boolean;
  withCredentials?: boolean;
}
