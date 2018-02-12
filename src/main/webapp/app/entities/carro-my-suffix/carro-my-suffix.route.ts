import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CarroMySuffixComponent } from './carro-my-suffix.component';
import { CarroMySuffixDetailComponent } from './carro-my-suffix-detail.component';
import { CarroMySuffixPopupComponent } from './carro-my-suffix-dialog.component';
import { CarroMySuffixDeletePopupComponent } from './carro-my-suffix-delete-dialog.component';

@Injectable()
export class CarroMySuffixResolvePagingParams implements Resolve<any> {

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

export const carroRoute: Routes = [
    {
        path: 'carro-my-suffix',
        component: CarroMySuffixComponent,
        resolve: {
            'pagingParams': CarroMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Carros'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'carro-my-suffix/:id',
        component: CarroMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Carros'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const carroPopupRoute: Routes = [
    {
        path: 'carro-my-suffix-new',
        component: CarroMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Carros'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'carro-my-suffix/:id/edit',
        component: CarroMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Carros'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'carro-my-suffix/:id/delete',
        component: CarroMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Carros'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
