import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HaoSharedModule } from '../../shared';
import {
    EntregaMySuffixService,
    EntregaMySuffixPopupService,
    EntregaMySuffixComponent,
    EntregaMySuffixDetailComponent,
    EntregaMySuffixDialogComponent,
    EntregaMySuffixPopupComponent,
    EntregaMySuffixDeletePopupComponent,
    EntregaMySuffixDeleteDialogComponent,
    entregaRoute,
    entregaPopupRoute,
    EntregaMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...entregaRoute,
    ...entregaPopupRoute,
];

@NgModule({
    imports: [
        HaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EntregaMySuffixComponent,
        EntregaMySuffixDetailComponent,
        EntregaMySuffixDialogComponent,
        EntregaMySuffixDeleteDialogComponent,
        EntregaMySuffixPopupComponent,
        EntregaMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        EntregaMySuffixComponent,
        EntregaMySuffixDialogComponent,
        EntregaMySuffixPopupComponent,
        EntregaMySuffixDeleteDialogComponent,
        EntregaMySuffixDeletePopupComponent,
    ],
    providers: [
        EntregaMySuffixService,
        EntregaMySuffixPopupService,
        EntregaMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaoEntregaMySuffixModule {}
