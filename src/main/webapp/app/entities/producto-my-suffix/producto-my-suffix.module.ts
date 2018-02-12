import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HaoSharedModule } from '../../shared';
import {
    ProductoMySuffixService,
    ProductoMySuffixPopupService,
    ProductoMySuffixComponent,
    ProductoMySuffixDetailComponent,
    ProductoMySuffixDialogComponent,
    ProductoMySuffixPopupComponent,
    ProductoMySuffixDeletePopupComponent,
    ProductoMySuffixDeleteDialogComponent,
    productoRoute,
    productoPopupRoute,
    ProductoMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...productoRoute,
    ...productoPopupRoute,
];

@NgModule({
    imports: [
        HaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProductoMySuffixComponent,
        ProductoMySuffixDetailComponent,
        ProductoMySuffixDialogComponent,
        ProductoMySuffixDeleteDialogComponent,
        ProductoMySuffixPopupComponent,
        ProductoMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ProductoMySuffixComponent,
        ProductoMySuffixDialogComponent,
        ProductoMySuffixPopupComponent,
        ProductoMySuffixDeleteDialogComponent,
        ProductoMySuffixDeletePopupComponent,
    ],
    providers: [
        ProductoMySuffixService,
        ProductoMySuffixPopupService,
        ProductoMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaoProductoMySuffixModule {}
