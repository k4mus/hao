import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HaoSharedModule } from '../../shared';
import {
    StockMySuffixService,
    StockMySuffixPopupService,
    StockMySuffixComponent,
    StockMySuffixDetailComponent,
    StockMySuffixDialogComponent,
    StockMySuffixPopupComponent,
    StockMySuffixDeletePopupComponent,
    StockMySuffixDeleteDialogComponent,
    stockRoute,
    stockPopupRoute,
    StockMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...stockRoute,
    ...stockPopupRoute,
];

@NgModule({
    imports: [
        HaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StockMySuffixComponent,
        StockMySuffixDetailComponent,
        StockMySuffixDialogComponent,
        StockMySuffixDeleteDialogComponent,
        StockMySuffixPopupComponent,
        StockMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        StockMySuffixComponent,
        StockMySuffixDialogComponent,
        StockMySuffixPopupComponent,
        StockMySuffixDeleteDialogComponent,
        StockMySuffixDeletePopupComponent,
    ],
    providers: [
        StockMySuffixService,
        StockMySuffixPopupService,
        StockMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaoStockMySuffixModule {}
