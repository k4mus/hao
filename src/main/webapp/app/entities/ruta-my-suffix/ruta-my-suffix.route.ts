import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { RutaMySuffixComponent } from './ruta-my-suffix.component';
import { RutaMySuffixDetailComponent } from './ruta-my-suffix-detail.component';
import { RutaMySuffixPopupComponent } from './ruta-my-suffix-dialog.component';
import { RutaMySuffixDeletePopupComponent } from './ruta-my-suffix-delete-dialog.component';

@Injectable()
export class RutaMySuffixResolvePagingParams implements Resolve<any> {

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

export const rutaRoute: Routes = [
    {
        path: 'ruta-my-suffix',
        component: RutaMySuffixComponent,
        resolve: {
            'pagingParams': RutaMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rutas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ruta-my-suffix/:id',
        component: RutaMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rutas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rutaPopupRoute: Routes = [
    {
        path: 'ruta-my-suffix-new',
        component: RutaMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rutas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ruta-my-suffix/:id/edit',
        component: RutaMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rutas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ruta-my-suffix/:id/delete',
        component: RutaMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rutas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
