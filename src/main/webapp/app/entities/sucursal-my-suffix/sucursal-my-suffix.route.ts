import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { SucursalMySuffixComponent } from './sucursal-my-suffix.component';
import { SucursalMySuffixDetailComponent } from './sucursal-my-suffix-detail.component';
import { SucursalMySuffixPopupComponent } from './sucursal-my-suffix-dialog.component';
import { SucursalMySuffixDeletePopupComponent } from './sucursal-my-suffix-delete-dialog.component';

@Injectable()
export class SucursalMySuffixResolvePagingParams implements Resolve<any> {

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

export const sucursalRoute: Routes = [
    {
        path: 'sucursal-my-suffix',
        component: SucursalMySuffixComponent,
        resolve: {
            'pagingParams': SucursalMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sucursals'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'sucursal-my-suffix/:id',
        component: SucursalMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sucursals'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sucursalPopupRoute: Routes = [
    {
        path: 'sucursal-my-suffix-new',
        component: SucursalMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sucursals'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sucursal-my-suffix/:id/edit',
        component: SucursalMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sucursals'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sucursal-my-suffix/:id/delete',
        component: SucursalMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sucursals'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
