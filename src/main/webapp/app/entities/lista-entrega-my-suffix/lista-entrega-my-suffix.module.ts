import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HaoSharedModule } from '../../shared';
import {
    ListaEntregaMySuffixService,
    ListaEntregaMySuffixPopupService,
    ListaEntregaMySuffixComponent,
    ListaEntregaMySuffixDetailComponent,
    ListaEntregaMySuffixDialogComponent,
    ListaEntregaMySuffixPopupComponent,
    ListaEntregaMySuffixDeletePopupComponent,
    ListaEntregaMySuffixDeleteDialogComponent,
    listaEntregaRoute,
    listaEntregaPopupRoute,
    ListaEntregaMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...listaEntregaRoute,
    ...listaEntregaPopupRoute,
];

@NgModule({
    imports: [
        HaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ListaEntregaMySuffixComponent,
        ListaEntregaMySuffixDetailComponent,
        ListaEntregaMySuffixDialogComponent,
        ListaEntregaMySuffixDeleteDialogComponent,
        ListaEntregaMySuffixPopupComponent,
        ListaEntregaMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ListaEntregaMySuffixComponent,
        ListaEntregaMySuffixDialogComponent,
        ListaEntregaMySuffixPopupComponent,
        ListaEntregaMySuffixDeleteDialogComponent,
        ListaEntregaMySuffixDeletePopupComponent,
    ],
    providers: [
        ListaEntregaMySuffixService,
        ListaEntregaMySuffixPopupService,
        ListaEntregaMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaoListaEntregaMySuffixModule {}
