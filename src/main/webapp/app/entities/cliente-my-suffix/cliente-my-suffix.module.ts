import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HaoSharedModule } from '../../shared';
import {
    ClienteMySuffixService,
    ClienteMySuffixPopupService,
    ClienteMySuffixComponent,
    ClienteMySuffixDetailComponent,
    ClienteMySuffixDialogComponent,
    ClienteMySuffixPopupComponent,
    ClienteMySuffixDeletePopupComponent,
    ClienteMySuffixDeleteDialogComponent,
    clienteRoute,
    clientePopupRoute,
    ClienteMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...clienteRoute,
    ...clientePopupRoute,
];

@NgModule({
    imports: [
        HaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ClienteMySuffixComponent,
        ClienteMySuffixDetailComponent,
        ClienteMySuffixDialogComponent,
        ClienteMySuffixDeleteDialogComponent,
        ClienteMySuffixPopupComponent,
        ClienteMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ClienteMySuffixComponent,
        ClienteMySuffixDialogComponent,
        ClienteMySuffixPopupComponent,
        ClienteMySuffixDeleteDialogComponent,
        ClienteMySuffixDeletePopupComponent,
    ],
    providers: [
        ClienteMySuffixService,
        ClienteMySuffixPopupService,
        ClienteMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaoClienteMySuffixModule {}
