import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CarroMySuffix } from './carro-my-suffix.model';
import { CarroMySuffixPopupService } from './carro-my-suffix-popup.service';
import { CarroMySuffixService } from './carro-my-suffix.service';
import { CarroProductosMySuffix, CarroProductosMySuffixService } from '../carro-productos-my-suffix';
import { ListaEntregaMySuffix, ListaEntregaMySuffixService } from '../lista-entrega-my-suffix';

@Component({
    selector: 'jhi-carro-my-suffix-dialog',
    templateUrl: './carro-my-suffix-dialog.component.html'
})
export class CarroMySuffixDialogComponent implements OnInit {

    carro: CarroMySuffix;
    isSaving: boolean;

    carroproductos: CarroProductosMySuffix[];

    listaentregas: ListaEntregaMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private carroService: CarroMySuffixService,
        private carroProductosService: CarroProductosMySuffixService,
        private listaEntregaService: ListaEntregaMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.carroProductosService.query()
            .subscribe((res: HttpResponse<CarroProductosMySuffix[]>) => { this.carroproductos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.listaEntregaService.query()
            .subscribe((res: HttpResponse<ListaEntregaMySuffix[]>) => { this.listaentregas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.carro.id !== undefined) {
            this.subscribeToSaveResponse(
                this.carroService.update(this.carro));
        } else {
            this.subscribeToSaveResponse(
                this.carroService.create(this.carro));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CarroMySuffix>>) {
        result.subscribe((res: HttpResponse<CarroMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CarroMySuffix) {
        this.eventManager.broadcast({ name: 'carroListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCarroProductosById(index: number, item: CarroProductosMySuffix) {
        return item.id;
    }

    trackListaEntregaById(index: number, item: ListaEntregaMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-carro-my-suffix-popup',
    template: ''
})
export class CarroMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private carroPopupService: CarroMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.carroPopupService
                    .open(CarroMySuffixDialogComponent as Component, params['id']);
            } else {
                this.carroPopupService
                    .open(CarroMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
