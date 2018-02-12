import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CarroProductosMySuffixComponent } from './carro-productos-my-suffix.component';
import { CarroProductosMySuffixDetailComponent } from './carro-productos-my-suffix-detail.component';
import { CarroProductosMySuffixPopupComponent } from './carro-productos-my-suffix-dialog.component';
import { CarroProductosMySuffixDeletePopupComponent } from './carro-productos-my-suffix-delete-dialog.component';

@Injectable()
export class CarroProductosMySuffixResolvePagingParams implements Resolve<any> {

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

export const carroProductosRoute: Routes = [
    {
        path: 'carro-productos-my-suffix',
        component: CarroProductosMySuffixComponent,
        resolve: {
            'pagingParams': CarroProductosMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CarroProductos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'carro-productos-my-suffix/:id',
        component: CarroProductosMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CarroProductos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const carroProductosPopupRoute: Routes = [
    {
        path: 'carro-productos-my-suffix-new',
        component: CarroProductosMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CarroProductos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'carro-productos-my-suffix/:id/edit',
        component: CarroProductosMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CarroProductos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'carro-productos-my-suffix/:id/delete',
        component: CarroProductosMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CarroProductos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
