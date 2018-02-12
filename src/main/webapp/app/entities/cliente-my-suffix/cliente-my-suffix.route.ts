import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ClienteMySuffixComponent } from './cliente-my-suffix.component';
import { ClienteMySuffixDetailComponent } from './cliente-my-suffix-detail.component';
import { ClienteMySuffixPopupComponent } from './cliente-my-suffix-dialog.component';
import { ClienteMySuffixDeletePopupComponent } from './cliente-my-suffix-delete-dialog.component';

@Injectable()
export class ClienteMySuffixResolvePagingParams implements Resolve<any> {

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

export const clienteRoute: Routes = [
    {
        path: 'cliente-my-suffix',
        component: ClienteMySuffixComponent,
        resolve: {
            'pagingParams': ClienteMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clientes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cliente-my-suffix/:id',
        component: ClienteMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clientes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const clientePopupRoute: Routes = [
    {
        path: 'cliente-my-suffix-new',
        component: ClienteMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clientes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cliente-my-suffix/:id/edit',
        component: ClienteMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clientes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cliente-my-suffix/:id/delete',
        component: ClienteMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clientes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
