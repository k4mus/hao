import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { VehiculoMySuffixComponent } from './vehiculo-my-suffix.component';
import { VehiculoMySuffixDetailComponent } from './vehiculo-my-suffix-detail.component';
import { VehiculoMySuffixPopupComponent } from './vehiculo-my-suffix-dialog.component';
import { VehiculoMySuffixDeletePopupComponent } from './vehiculo-my-suffix-delete-dialog.component';

@Injectable()
export class VehiculoMySuffixResolvePagingParams implements Resolve<any> {

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

export const vehiculoRoute: Routes = [
    {
        path: 'vehiculo-my-suffix',
        component: VehiculoMySuffixComponent,
        resolve: {
            'pagingParams': VehiculoMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Vehiculos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'vehiculo-my-suffix/:id',
        component: VehiculoMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Vehiculos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vehiculoPopupRoute: Routes = [
    {
        path: 'vehiculo-my-suffix-new',
        component: VehiculoMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Vehiculos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vehiculo-my-suffix/:id/edit',
        component: VehiculoMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Vehiculos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vehiculo-my-suffix/:id/delete',
        component: VehiculoMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Vehiculos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
