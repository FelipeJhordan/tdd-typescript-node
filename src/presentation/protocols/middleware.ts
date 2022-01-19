import { HttpRequest, HttpResponse } from '.'

export interface Middleware {
    handle(http: HttpRequest): Promise<HttpResponse>
}
