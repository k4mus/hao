import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EntregaMySuffix } from './entrega-my-suffix.model';
import { EntregaMySuffixPopupService } from './entrega-my-suffix-popup.service';
import { EntregaMySuffixService } from './entrega-my-suffix.service';
import { ListaEntregaMySuffix, ListaEntregaMySuffixService } from '../lista-entrega-my-suffix';

@Component({
    selector: 'jhi-entrega-my-suffix-dialog',
    templateUrl: './entrega-my-suffix-dialog.component.html'
})
export class EntregaMySuffixDialogComponent implements OnInit {

    entrega: EntregaMySuffix;
    isSaving: boolean;

    listaentregas: ListaEntregaMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private entregaService: EntregaMySuffixService,
        private listaEntregaService: ListaEntregaMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.listaEntregaService.query()
            .subscribe((res: HttpResponse<ListaEntregaMySuffix[]>) => { this.listaentregas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.entrega.id !== undefined) {
            this.subscribeToSaveResponse(
                this.entregaService.update(this.entrega));
        } else {
            this.subscribeToSaveResponse(
                this.entregaService.create(this.entrega));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<EntregaMySuffix>>) {
        result.subscribe((res: HttpResponse<EntregaMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: EntregaMySuffix) {
        this.eventManager.broadcast({ name: 'entregaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackListaEntregaById(index: number, item: ListaEntregaMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-entrega-my-suffix-popup',
    template: ''
})
export class EntregaMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private entregaPopupService: EntregaMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.entregaPopupService
                    .open(EntregaMySuffixDialogComponent as Component, params['id']);
            } else {
                this.entregaPopupService
                    .open(EntregaMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
