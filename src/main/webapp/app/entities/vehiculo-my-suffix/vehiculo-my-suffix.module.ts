import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HaoSharedModule } from '../../shared';
import {
    VehiculoMySuffixService,
    VehiculoMySuffixPopupService,
    VehiculoMySuffixComponent,
    VehiculoMySuffixDetailComponent,
    VehiculoMySuffixDialogComponent,
    VehiculoMySuffixPopupComponent,
    VehiculoMySuffixDeletePopupComponent,
    VehiculoMySuffixDeleteDialogComponent,
    vehiculoRoute,
    vehiculoPopupRoute,
    VehiculoMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...vehiculoRoute,
    ...vehiculoPopupRoute,
];

@NgModule({
    imports: [
        HaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VehiculoMySuffixComponent,
        VehiculoMySuffixDetailComponent,
        VehiculoMySuffixDialogComponent,
        VehiculoMySuffixDeleteDialogComponent,
        VehiculoMySuffixPopupComponent,
        VehiculoMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        VehiculoMySuffixComponent,
        VehiculoMySuffixDialogComponent,
        VehiculoMySuffixPopupComponent,
        VehiculoMySuffixDeleteDialogComponent,
        VehiculoMySuffixDeletePopupComponent,
    ],
    providers: [
        VehiculoMySuffixService,
        VehiculoMySuffixPopupService,
        VehiculoMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaoVehiculoMySuffixModule {}
