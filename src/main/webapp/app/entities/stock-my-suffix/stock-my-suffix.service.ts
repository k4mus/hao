import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { StockMySuffix } from './stock-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<StockMySuffix>;

@Injectable()
export class StockMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/stocks';

    constructor(private http: HttpClient) { }

    create(stock: StockMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(stock);
        return this.http.post<StockMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(stock: StockMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(stock);
        return this.http.put<StockMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<StockMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<StockMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<StockMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StockMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: StockMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<StockMySuffix[]>): HttpResponse<StockMySuffix[]> {
        const jsonResponse: StockMySuffix[] = res.body;
        const body: StockMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to StockMySuffix.
     */
    private convertItemFromServer(stock: StockMySuffix): StockMySuffix {
        const copy: StockMySuffix = Object.assign({}, stock);
        return copy;
    }

    /**
     * Convert a StockMySuffix to a JSON which can be sent to the server.
     */
    private convert(stock: StockMySuffix): StockMySuffix {
        const copy: StockMySuffix = Object.assign({}, stock);
        return copy;
    }
}
