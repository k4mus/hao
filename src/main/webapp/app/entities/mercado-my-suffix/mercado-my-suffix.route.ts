import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { MercadoMySuffixComponent } from './mercado-my-suffix.component';
import { MercadoMySuffixDetailComponent } from './mercado-my-suffix-detail.component';
import { MercadoMySuffixPopupComponent } from './mercado-my-suffix-dialog.component';
import { MercadoMySuffixDeletePopupComponent } from './mercado-my-suffix-delete-dialog.component';

@Injectable()
export class MercadoMySuffixResolvePagingParams implements Resolve<any> {

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

export const mercadoRoute: Routes = [
    {
        path: 'mercado-my-suffix',
        component: MercadoMySuffixComponent,
        resolve: {
            'pagingParams': MercadoMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mercados'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'mercado-my-suffix/:id',
        component: MercadoMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mercados'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mercadoPopupRoute: Routes = [
    {
        path: 'mercado-my-suffix-new',
        component: MercadoMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mercados'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mercado-my-suffix/:id/edit',
        component: MercadoMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mercados'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mercado-my-suffix/:id/delete',
        component: MercadoMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mercados'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
