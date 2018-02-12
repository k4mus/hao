import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HaoSharedModule } from '../../shared';
import {
    MercadoMySuffixService,
    MercadoMySuffixPopupService,
    MercadoMySuffixComponent,
    MercadoMySuffixDetailComponent,
    MercadoMySuffixDialogComponent,
    MercadoMySuffixPopupComponent,
    MercadoMySuffixDeletePopupComponent,
    MercadoMySuffixDeleteDialogComponent,
    mercadoRoute,
    mercadoPopupRoute,
    MercadoMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...mercadoRoute,
    ...mercadoPopupRoute,
];

@NgModule({
    imports: [
        HaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MercadoMySuffixComponent,
        MercadoMySuffixDetailComponent,
        MercadoMySuffixDialogComponent,
        MercadoMySuffixDeleteDialogComponent,
        MercadoMySuffixPopupComponent,
        MercadoMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        MercadoMySuffixComponent,
        MercadoMySuffixDialogComponent,
        MercadoMySuffixPopupComponent,
        MercadoMySuffixDeleteDialogComponent,
        MercadoMySuffixDeletePopupComponent,
    ],
    providers: [
        MercadoMySuffixService,
        MercadoMySuffixPopupService,
        MercadoMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaoMercadoMySuffixModule {}
