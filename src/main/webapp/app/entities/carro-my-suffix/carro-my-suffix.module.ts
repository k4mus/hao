import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HaoSharedModule } from '../../shared';
import {
    CarroMySuffixService,
    CarroMySuffixPopupService,
    CarroMySuffixComponent,
    CarroMySuffixDetailComponent,
    CarroMySuffixDialogComponent,
    CarroMySuffixPopupComponent,
    CarroMySuffixDeletePopupComponent,
    CarroMySuffixDeleteDialogComponent,
    carroRoute,
    carroPopupRoute,
    CarroMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...carroRoute,
    ...carroPopupRoute,
];

@NgModule({
    imports: [
        HaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CarroMySuffixComponent,
        CarroMySuffixDetailComponent,
        CarroMySuffixDialogComponent,
        CarroMySuffixDeleteDialogComponent,
        CarroMySuffixPopupComponent,
        CarroMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CarroMySuffixComponent,
        CarroMySuffixDialogComponent,
        CarroMySuffixPopupComponent,
        CarroMySuffixDeleteDialogComponent,
        CarroMySuffixDeletePopupComponent,
    ],
    providers: [
        CarroMySuffixService,
        CarroMySuffixPopupService,
        CarroMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaoCarroMySuffixModule {}
