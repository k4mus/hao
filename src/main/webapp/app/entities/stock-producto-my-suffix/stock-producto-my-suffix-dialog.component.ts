import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StockProductoMySuffix } from './stock-producto-my-suffix.model';
import { StockProductoMySuffixPopupService } from './stock-producto-my-suffix-popup.service';
import { StockProductoMySuffixService } from './stock-producto-my-suffix.service';
import { CarroProductosMySuffix, CarroProductosMySuffixService } from '../carro-productos-my-suffix';

@Component({
    selector: 'jhi-stock-producto-my-suffix-dialog',
    templateUrl: './stock-producto-my-suffix-dialog.component.html'
})
export class StockProductoMySuffixDialogComponent implements OnInit {

    stockProducto: StockProductoMySuffix;
    isSaving: boolean;

    carroproductos: CarroProductosMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private stockProductoService: StockProductoMySuffixService,
        private carroProductosService: CarroProductosMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.carroProductosService.query()
            .subscribe((res: HttpResponse<CarroProductosMySuffix[]>) => { this.carroproductos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.stockProducto.id !== undefined) {
            this.subscribeToSaveResponse(
                this.stockProductoService.update(this.stockProducto));
        } else {
            this.subscribeToSaveResponse(
                this.stockProductoService.create(this.stockProducto));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<StockProductoMySuffix>>) {
        result.subscribe((res: HttpResponse<StockProductoMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: StockProductoMySuffix) {
        this.eventManager.broadcast({ name: 'stockProductoListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-stock-producto-my-suffix-popup',
    template: ''
})
export class StockProductoMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stockProductoPopupService: StockProductoMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.stockProductoPopupService
                    .open(StockProductoMySuffixDialogComponent as Component, params['id']);
            } else {
                this.stockProductoPopupService
                    .open(StockProductoMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
