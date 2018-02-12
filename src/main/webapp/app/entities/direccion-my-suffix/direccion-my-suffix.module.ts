import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HaoSharedModule } from '../../shared';
import {
    DireccionMySuffixService,
    DireccionMySuffixPopupService,
    DireccionMySuffixComponent,
    DireccionMySuffixDetailComponent,
    DireccionMySuffixDialogComponent,
    DireccionMySuffixPopupComponent,
    DireccionMySuffixDeletePopupComponent,
    DireccionMySuffixDeleteDialogComponent,
    direccionRoute,
    direccionPopupRoute,
    DireccionMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...direccionRoute,
    ...direccionPopupRoute,
];

@NgModule({
    imports: [
        HaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DireccionMySuffixComponent,
        DireccionMySuffixDetailComponent,
        DireccionMySuffixDialogComponent,
        DireccionMySuffixDeleteDialogComponent,
        DireccionMySuffixPopupComponent,
        DireccionMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        DireccionMySuffixComponent,
        DireccionMySuffixDialogComponent,
        DireccionMySuffixPopupComponent,
        DireccionMySuffixDeleteDialogComponent,
        DireccionMySuffixDeletePopupComponent,
    ],
    providers: [
        DireccionMySuffixService,
        DireccionMySuffixPopupService,
        DireccionMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaoDireccionMySuffixModule {}
