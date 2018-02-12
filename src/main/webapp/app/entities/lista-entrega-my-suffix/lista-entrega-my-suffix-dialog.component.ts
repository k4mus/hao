import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ListaEntregaMySuffix } from './lista-entrega-my-suffix.model';
import { ListaEntregaMySuffixPopupService } from './lista-entrega-my-suffix-popup.service';
import { ListaEntregaMySuffixService } from './lista-entrega-my-suffix.service';

@Component({
    selector: 'jhi-lista-entrega-my-suffix-dialog',
    templateUrl: './lista-entrega-my-suffix-dialog.component.html'
})
export class ListaEntregaMySuffixDialogComponent implements OnInit {

    listaEntrega: ListaEntregaMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private listaEntregaService: ListaEntregaMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.listaEntrega.id !== undefined) {
            this.subscribeToSaveResponse(
                this.listaEntregaService.update(this.listaEntrega));
        } else {
            this.subscribeToSaveResponse(
                this.listaEntregaService.create(this.listaEntrega));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ListaEntregaMySuffix>>) {
        result.subscribe((res: HttpResponse<ListaEntregaMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ListaEntregaMySuffix) {
        this.eventManager.broadcast({ name: 'listaEntregaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-lista-entrega-my-suffix-popup',
    template: ''
})
export class ListaEntregaMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private listaEntregaPopupService: ListaEntregaMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.listaEntregaPopupService
                    .open(ListaEntregaMySuffixDialogComponent as Component, params['id']);
            } else {
                this.listaEntregaPopupService
                    .open(ListaEntregaMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
