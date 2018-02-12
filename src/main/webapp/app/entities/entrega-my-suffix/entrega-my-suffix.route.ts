import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { EntregaMySuffixComponent } from './entrega-my-suffix.component';
import { EntregaMySuffixDetailComponent } from './entrega-my-suffix-detail.component';
import { EntregaMySuffixPopupComponent } from './entrega-my-suffix-dialog.component';
import { EntregaMySuffixDeletePopupComponent } from './entrega-my-suffix-delete-dialog.component';

@Injectable()
export class EntregaMySuffixResolvePagingParams implements Resolve<any> {

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

export const entregaRoute: Routes = [
    {
        path: 'entrega-my-suffix',
        component: EntregaMySuffixComponent,
        resolve: {
            'pagingParams': EntregaMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Entregas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'entrega-my-suffix/:id',
        component: EntregaMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Entregas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const entregaPopupRoute: Routes = [
    {
        path: 'entrega-my-suffix-new',
        component: EntregaMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Entregas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'entrega-my-suffix/:id/edit',
        component: EntregaMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Entregas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'entrega-my-suffix/:id/delete',
        component: EntregaMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Entregas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
