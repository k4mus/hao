import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { MedioPagoMySuffixComponent } from './medio-pago-my-suffix.component';
import { MedioPagoMySuffixDetailComponent } from './medio-pago-my-suffix-detail.component';
import { MedioPagoMySuffixPopupComponent } from './medio-pago-my-suffix-dialog.component';
import { MedioPagoMySuffixDeletePopupComponent } from './medio-pago-my-suffix-delete-dialog.component';

@Injectable()
export class MedioPagoMySuffixResolvePagingParams implements Resolve<any> {

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

export const medioPagoRoute: Routes = [
    {
        path: 'medio-pago-my-suffix',
        component: MedioPagoMySuffixComponent,
        resolve: {
            'pagingParams': MedioPagoMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MedioPagos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'medio-pago-my-suffix/:id',
        component: MedioPagoMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MedioPagos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const medioPagoPopupRoute: Routes = [
    {
        path: 'medio-pago-my-suffix-new',
        component: MedioPagoMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MedioPagos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'medio-pago-my-suffix/:id/edit',
        component: MedioPagoMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MedioPagos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'medio-pago-my-suffix/:id/delete',
        component: MedioPagoMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MedioPagos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
