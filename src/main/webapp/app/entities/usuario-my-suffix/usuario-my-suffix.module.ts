import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HaoSharedModule } from '../../shared';
import {
    UsuarioMySuffixService,
    UsuarioMySuffixPopupService,
    UsuarioMySuffixComponent,
    UsuarioMySuffixDetailComponent,
    UsuarioMySuffixDialogComponent,
    UsuarioMySuffixPopupComponent,
    UsuarioMySuffixDeletePopupComponent,
    UsuarioMySuffixDeleteDialogComponent,
    usuarioRoute,
    usuarioPopupRoute,
    UsuarioMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...usuarioRoute,
    ...usuarioPopupRoute,
];

@NgModule({
    imports: [
        HaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UsuarioMySuffixComponent,
        UsuarioMySuffixDetailComponent,
        UsuarioMySuffixDialogComponent,
        UsuarioMySuffixDeleteDialogComponent,
        UsuarioMySuffixPopupComponent,
        UsuarioMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        UsuarioMySuffixComponent,
        UsuarioMySuffixDialogComponent,
        UsuarioMySuffixPopupComponent,
        UsuarioMySuffixDeleteDialogComponent,
        UsuarioMySuffixDeletePopupComponent,
    ],
    providers: [
        UsuarioMySuffixService,
        UsuarioMySuffixPopupService,
        UsuarioMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaoUsuarioMySuffixModule {}
