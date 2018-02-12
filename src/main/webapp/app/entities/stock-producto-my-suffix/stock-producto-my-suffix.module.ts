import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HaoSharedModule } from '../../shared';
import {
    StockProductoMySuffixService,
    StockProductoMySuffixPopupService,
    StockProductoMySuffixComponent,
    StockProductoMySuffixDetailComponent,
    StockProductoMySuffixDialogComponent,
    StockProductoMySuffixPopupComponent,
    StockProductoMySuffixDeletePopupComponent,
    StockProductoMySuffixDeleteDialogComponent,
    stockProductoRoute,
    stockProductoPopupRoute,
    StockProductoMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...stockProductoRoute,
    ...stockProductoPopupRoute,
];

@NgModule({
    imports: [
        HaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StockProductoMySuffixComponent,
        StockProductoMySuffixDetailComponent,
        StockProductoMySuffixDialogComponent,
        StockProductoMySuffixDeleteDialogComponent,
        StockProductoMySuffixPopupComponent,
        StockProductoMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        StockProductoMySuffixComponent,
        StockProductoMySuffixDialogComponent,
        StockProductoMySuffixPopupComponent,
        StockProductoMySuffixDeleteDialogComponent,
        StockProductoMySuffixDeletePopupComponent,
    ],
    providers: [
        StockProductoMySuffixService,
        StockProductoMySuffixPopupService,
        StockProductoMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaoStockProductoMySuffixModule {}
