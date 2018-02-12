import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HaoSharedModule } from '../../shared';
import {
    RepartidorMySuffixService,
    RepartidorMySuffixPopupService,
    RepartidorMySuffixComponent,
    RepartidorMySuffixDetailComponent,
    RepartidorMySuffixDialogComponent,
    RepartidorMySuffixPopupComponent,
    RepartidorMySuffixDeletePopupComponent,
    RepartidorMySuffixDeleteDialogComponent,
    repartidorRoute,
    repartidorPopupRoute,
    RepartidorMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...repartidorRoute,
    ...repartidorPopupRoute,
];

@NgModule({
    imports: [
        HaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RepartidorMySuffixComponent,
        RepartidorMySuffixDetailComponent,
        RepartidorMySuffixDialogComponent,
        RepartidorMySuffixDeleteDialogComponent,
        RepartidorMySuffixPopupComponent,
        RepartidorMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        RepartidorMySuffixComponent,
        RepartidorMySuffixDialogComponent,
        RepartidorMySuffixPopupComponent,
        RepartidorMySuffixDeleteDialogComponent,
        RepartidorMySuffixDeletePopupComponent,
    ],
    providers: [
        RepartidorMySuffixService,
        RepartidorMySuffixPopupService,
        RepartidorMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaoRepartidorMySuffixModule {}
