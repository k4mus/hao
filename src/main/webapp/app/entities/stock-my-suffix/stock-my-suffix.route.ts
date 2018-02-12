import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { StockMySuffixComponent } from './stock-my-suffix.component';
import { StockMySuffixDetailComponent } from './stock-my-suffix-detail.component';
import { StockMySuffixPopupComponent } from './stock-my-suffix-dialog.component';
import { StockMySuffixDeletePopupComponent } from './stock-my-suffix-delete-dialog.component';

@Injectable()
export class StockMySuffixResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const stockRoute: Routes = [
    {
        path: 'stock-my-suffix',
        component: StockMySuffixComponent,
        resolve: {
            'pagingParams': StockMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stocks'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'stock-my-suffix/:id',
        component: StockMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stocks'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stockPopupRoute: Routes = [
    {
        path: 'stock-my-suffix-new',
        component: StockMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stocks'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stock-my-suffix/:id/edit',
        component: StockMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stocks'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stock-my-suffix/:id/delete',
        component: StockMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stocks'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
