import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { StockProductoMySuffixComponent } from './stock-producto-my-suffix.component';
import { StockProductoMySuffixDetailComponent } from './stock-producto-my-suffix-detail.component';
import { StockProductoMySuffixPopupComponent } from './stock-producto-my-suffix-dialog.component';
import { StockProductoMySuffixDeletePopupComponent } from './stock-producto-my-suffix-delete-dialog.component';

@Injectable()
export class StockProductoMySuffixResolvePagingParams implements Resolve<any> {

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

export const stockProductoRoute: Routes = [
    {
        path: 'stock-producto-my-suffix',
        component: StockProductoMySuffixComponent,
        resolve: {
            'pagingParams': StockProductoMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StockProductos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'stock-producto-my-suffix/:id',
        component: StockProductoMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StockProductos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stockProductoPopupRoute: Routes = [
    {
        path: 'stock-producto-my-suffix-new',
        component: StockProductoMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StockProductos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stock-producto-my-suffix/:id/edit',
        component: StockProductoMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StockProductos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stock-producto-my-suffix/:id/delete',
        component: StockProductoMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StockProductos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
