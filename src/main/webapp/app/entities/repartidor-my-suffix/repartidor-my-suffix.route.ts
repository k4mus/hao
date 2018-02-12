import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { RepartidorMySuffixComponent } from './repartidor-my-suffix.component';
import { RepartidorMySuffixDetailComponent } from './repartidor-my-suffix-detail.component';
import { RepartidorMySuffixPopupComponent } from './repartidor-my-suffix-dialog.component';
import { RepartidorMySuffixDeletePopupComponent } from './repartidor-my-suffix-delete-dialog.component';

@Injectable()
export class RepartidorMySuffixResolvePagingParams implements Resolve<any> {

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

export const repartidorRoute: Routes = [
    {
        path: 'repartidor-my-suffix',
        component: RepartidorMySuffixComponent,
        resolve: {
            'pagingParams': RepartidorMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Repartidors'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'repartidor-my-suffix/:id',
        component: RepartidorMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Repartidors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const repartidorPopupRoute: Routes = [
    {
        path: 'repartidor-my-suffix-new',
        component: RepartidorMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Repartidors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'repartidor-my-suffix/:id/edit',
        component: RepartidorMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Repartidors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'repartidor-my-suffix/:id/delete',
        component: RepartidorMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Repartidors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
