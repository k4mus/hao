import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CarroMySuffix } from './carro-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CarroMySuffix>;

@Injectable()
export class CarroMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/carros';

    constructor(private http: HttpClient) { }

    create(carro: CarroMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(carro);
        return this.http.post<CarroMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(carro: CarroMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(carro);
        return this.http.put<CarroMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CarroMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CarroMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CarroMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CarroMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CarroMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CarroMySuffix[]>): HttpResponse<CarroMySuffix[]> {
        const jsonResponse: CarroMySuffix[] = res.body;
        const body: CarroMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CarroMySuffix.
     */
    private convertItemFromServer(carro: CarroMySuffix): CarroMySuffix {
        const copy: CarroMySuffix = Object.assign({}, carro);
        return copy;
    }

    /**
     * Convert a CarroMySuffix to a JSON which can be sent to the server.
     */
    private convert(carro: CarroMySuffix): CarroMySuffix {
        const copy: CarroMySuffix = Object.assign({}, carro);
        return copy;
    }
}
