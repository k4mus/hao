import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HaoSharedModule } from '../../shared';
import {
    RutaMySuffixService,
    RutaMySuffixPopupService,
    RutaMySuffixComponent,
    RutaMySuffixDetailComponent,
    RutaMySuffixDialogComponent,
    RutaMySuffixPopupComponent,
    RutaMySuffixDeletePopupComponent,
    RutaMySuffixDeleteDialogComponent,
    rutaRoute,
    rutaPopupRoute,
    RutaMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...rutaRoute,
    ...rutaPopupRoute,
];

@NgModule({
    imports: [
        HaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RutaMySuffixComponent,
        RutaMySuffixDetailComponent,
        RutaMySuffixDialogComponent,
        RutaMySuffixDeleteDialogComponent,
        RutaMySuffixPopupComponent,
        RutaMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        RutaMySuffixComponent,
        RutaMySuffixDialogComponent,
        RutaMySuffixPopupComponent,
        RutaMySuffixDeleteDialogComponent,
        RutaMySuffixDeletePopupComponent,
    ],
    providers: [
        RutaMySuffixService,
        RutaMySuffixPopupService,
        RutaMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaoRutaMySuffixModule {}
