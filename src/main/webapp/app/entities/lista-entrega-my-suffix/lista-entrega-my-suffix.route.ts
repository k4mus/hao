import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ListaEntregaMySuffixComponent } from './lista-entrega-my-suffix.component';
import { ListaEntregaMySuffixDetailComponent } from './lista-entrega-my-suffix-detail.component';
import { ListaEntregaMySuffixPopupComponent } from './lista-entrega-my-suffix-dialog.component';
import { ListaEntregaMySuffixDeletePopupComponent } from './lista-entrega-my-suffix-delete-dialog.component';

@Injectable()
export class ListaEntregaMySuffixResolvePagingParams implements Resolve<any> {

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

export const listaEntregaRoute: Routes = [
    {
        path: 'lista-entrega-my-suffix',
        component: ListaEntregaMySuffixComponent,
        resolve: {
            'pagingParams': ListaEntregaMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ListaEntregas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'lista-entrega-my-suffix/:id',
        component: ListaEntregaMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ListaEntregas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const listaEntregaPopupRoute: Routes = [
    {
        path: 'lista-entrega-my-suffix-new',
        component: ListaEntregaMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ListaEntregas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'lista-entrega-my-suffix/:id/edit',
        component: ListaEntregaMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ListaEntregas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'lista-entrega-my-suffix/:id/delete',
        component: ListaEntregaMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ListaEntregas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
