import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HaoSharedModule } from '../../shared';
import {
    ComercioMySuffixService,
    ComercioMySuffixPopupService,
    ComercioMySuffixComponent,
    ComercioMySuffixDetailComponent,
    ComercioMySuffixDialogComponent,
    ComercioMySuffixPopupComponent,
    ComercioMySuffixDeletePopupComponent,
    ComercioMySuffixDeleteDialogComponent,
    comercioRoute,
    comercioPopupRoute,
    ComercioMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...comercioRoute,
    ...comercioPopupRoute,
];

@NgModule({
    imports: [
        HaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ComercioMySuffixComponent,
        ComercioMySuffixDetailComponent,
        ComercioMySuffixDialogComponent,
        ComercioMySuffixDeleteDialogComponent,
        ComercioMySuffixPopupComponent,
        ComercioMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ComercioMySuffixComponent,
        ComercioMySuffixDialogComponent,
        ComercioMySuffixPopupComponent,
        ComercioMySuffixDeleteDialogComponent,
        ComercioMySuffixDeletePopupComponent,
    ],
    providers: [
        ComercioMySuffixService,
        ComercioMySuffixPopupService,
        ComercioMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaoComercioMySuffixModule {}
