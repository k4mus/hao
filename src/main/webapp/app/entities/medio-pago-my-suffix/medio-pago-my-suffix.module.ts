import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HaoSharedModule } from '../../shared';
import {
    MedioPagoMySuffixService,
    MedioPagoMySuffixPopupService,
    MedioPagoMySuffixComponent,
    MedioPagoMySuffixDetailComponent,
    MedioPagoMySuffixDialogComponent,
    MedioPagoMySuffixPopupComponent,
    MedioPagoMySuffixDeletePopupComponent,
    MedioPagoMySuffixDeleteDialogComponent,
    medioPagoRoute,
    medioPagoPopupRoute,
    MedioPagoMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...medioPagoRoute,
    ...medioPagoPopupRoute,
];

@NgModule({
    imports: [
        HaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MedioPagoMySuffixComponent,
        MedioPagoMySuffixDetailComponent,
        MedioPagoMySuffixDialogComponent,
        MedioPagoMySuffixDeleteDialogComponent,
        MedioPagoMySuffixPopupComponent,
        MedioPagoMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        MedioPagoMySuffixComponent,
        MedioPagoMySuffixDialogComponent,
        MedioPagoMySuffixPopupComponent,
        MedioPagoMySuffixDeleteDialogComponent,
        MedioPagoMySuffixDeletePopupComponent,
    ],
    providers: [
        MedioPagoMySuffixService,
        MedioPagoMySuffixPopupService,
        MedioPagoMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaoMedioPagoMySuffixModule {}
