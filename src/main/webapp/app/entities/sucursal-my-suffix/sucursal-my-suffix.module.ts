import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HaoSharedModule } from '../../shared';
import {
    SucursalMySuffixService,
    SucursalMySuffixPopupService,
    SucursalMySuffixComponent,
    SucursalMySuffixDetailComponent,
    SucursalMySuffixDialogComponent,
    SucursalMySuffixPopupComponent,
    SucursalMySuffixDeletePopupComponent,
    SucursalMySuffixDeleteDialogComponent,
    sucursalRoute,
    sucursalPopupRoute,
    SucursalMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...sucursalRoute,
    ...sucursalPopupRoute,
];

@NgModule({
    imports: [
        HaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SucursalMySuffixComponent,
        SucursalMySuffixDetailComponent,
        SucursalMySuffixDialogComponent,
        SucursalMySuffixDeleteDialogComponent,
        SucursalMySuffixPopupComponent,
        SucursalMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        SucursalMySuffixComponent,
        SucursalMySuffixDialogComponent,
        SucursalMySuffixPopupComponent,
        SucursalMySuffixDeleteDialogComponent,
        SucursalMySuffixDeletePopupComponent,
    ],
    providers: [
        SucursalMySuffixService,
        SucursalMySuffixPopupService,
        SucursalMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaoSucursalMySuffixModule {}
