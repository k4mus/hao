import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { DireccionMySuffixComponent } from './direccion-my-suffix.component';
import { DireccionMySuffixDetailComponent } from './direccion-my-suffix-detail.component';
import { DireccionMySuffixPopupComponent } from './direccion-my-suffix-dialog.component';
import { DireccionMySuffixDeletePopupComponent } from './direccion-my-suffix-delete-dialog.component';

@Injectable()
export class DireccionMySuffixResolvePagingParams implements Resolve<any> {

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

export const direccionRoute: Routes = [
    {
        path: 'direccion-my-suffix',
        component: DireccionMySuffixComponent,
        resolve: {
            'pagingParams': DireccionMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Direccions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'direccion-my-suffix/:id',
        component: DireccionMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Direccions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const direccionPopupRoute: Routes = [
    {
        path: 'direccion-my-suffix-new',
        component: DireccionMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Direccions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'direccion-my-suffix/:id/edit',
        component: DireccionMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Direccions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'direccion-my-suffix/:id/delete',
        component: DireccionMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Direccions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
