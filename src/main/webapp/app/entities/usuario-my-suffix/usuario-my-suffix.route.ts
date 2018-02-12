import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { UsuarioMySuffixComponent } from './usuario-my-suffix.component';
import { UsuarioMySuffixDetailComponent } from './usuario-my-suffix-detail.component';
import { UsuarioMySuffixPopupComponent } from './usuario-my-suffix-dialog.component';
import { UsuarioMySuffixDeletePopupComponent } from './usuario-my-suffix-delete-dialog.component';

@Injectable()
export class UsuarioMySuffixResolvePagingParams implements Resolve<any> {

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

export const usuarioRoute: Routes = [
    {
        path: 'usuario-my-suffix',
        component: UsuarioMySuffixComponent,
        resolve: {
            'pagingParams': UsuarioMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Usuarios'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'usuario-my-suffix/:id',
        component: UsuarioMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Usuarios'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const usuarioPopupRoute: Routes = [
    {
        path: 'usuario-my-suffix-new',
        component: UsuarioMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Usuarios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'usuario-my-suffix/:id/edit',
        component: UsuarioMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Usuarios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'usuario-my-suffix/:id/delete',
        component: UsuarioMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Usuarios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
