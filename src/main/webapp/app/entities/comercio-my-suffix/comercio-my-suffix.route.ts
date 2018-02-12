import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ComercioMySuffixComponent } from './comercio-my-suffix.component';
import { ComercioMySuffixDetailComponent } from './comercio-my-suffix-detail.component';
import { ComercioMySuffixPopupComponent } from './comercio-my-suffix-dialog.component';
import { ComercioMySuffixDeletePopupComponent } from './comercio-my-suffix-delete-dialog.component';

@Injectable()
export class ComercioMySuffixResolvePagingParams implements Resolve<any> {

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

export const comercioRoute: Routes = [
    {
        path: 'comercio-my-suffix',
        component: ComercioMySuffixComponent,
        resolve: {
            'pagingParams': ComercioMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comercios'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'comercio-my-suffix/:id',
        component: ComercioMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comercios'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const comercioPopupRoute: Routes = [
    {
        path: 'comercio-my-suffix-new',
        component: ComercioMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comercios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'comercio-my-suffix/:id/edit',
        component: ComercioMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comercios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'comercio-my-suffix/:id/delete',
        component: ComercioMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comercios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
