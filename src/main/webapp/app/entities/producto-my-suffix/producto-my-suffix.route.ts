import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ProductoMySuffixComponent } from './producto-my-suffix.component';
import { ProductoMySuffixDetailComponent } from './producto-my-suffix-detail.component';
import { ProductoMySuffixPopupComponent } from './producto-my-suffix-dialog.component';
import { ProductoMySuffixDeletePopupComponent } from './producto-my-suffix-delete-dialog.component';

@Injectable()
export class ProductoMySuffixResolvePagingParams implements Resolve<any> {

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

export const productoRoute: Routes = [
    {
        path: 'producto-my-suffix',
        component: ProductoMySuffixComponent,
        resolve: {
            'pagingParams': ProductoMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Productos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'producto-my-suffix/:id',
        component: ProductoMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Productos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productoPopupRoute: Routes = [
    {
        path: 'producto-my-suffix-new',
        component: ProductoMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Productos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'producto-my-suffix/:id/edit',
        component: ProductoMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Productos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'producto-my-suffix/:id/delete',
        component: ProductoMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Productos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
