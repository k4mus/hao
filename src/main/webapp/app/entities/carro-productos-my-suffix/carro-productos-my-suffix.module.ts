import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HaoSharedModule } from '../../shared';
import {
    CarroProductosMySuffixService,
    CarroProductosMySuffixPopupService,
    CarroProductosMySuffixComponent,
    CarroProductosMySuffixDetailComponent,
    CarroProductosMySuffixDialogComponent,
    CarroProductosMySuffixPopupComponent,
    CarroProductosMySuffixDeletePopupComponent,
    CarroProductosMySuffixDeleteDialogComponent,
    carroProductosRoute,
    carroProductosPopupRoute,
    CarroProductosMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...carroProductosRoute,
    ...carroProductosPopupRoute,
];

@NgModule({
    imports: [
        HaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CarroProductosMySuffixComponent,
        CarroProductosMySuffixDetailComponent,
        CarroProductosMySuffixDialogComponent,
        CarroProductosMySuffixDeleteDialogComponent,
        CarroProductosMySuffixPopupComponent,
        CarroProductosMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CarroProductosMySuffixComponent,
        CarroProductosMySuffixDialogComponent,
        CarroProductosMySuffixPopupComponent,
        CarroProductosMySuffixDeleteDialogComponent,
        CarroProductosMySuffixDeletePopupComponent,
    ],
    providers: [
        CarroProductosMySuffixService,
        CarroProductosMySuffixPopupService,
        CarroProductosMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaoCarroProductosMySuffixModule {}
