import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StockMySuffix } from './stock-my-suffix.model';
import { StockMySuffixPopupService } from './stock-my-suffix-popup.service';
import { StockMySuffixService } from './stock-my-suffix.service';
import { StockProductoMySuffix, StockProductoMySuffixService } from '../stock-producto-my-suffix';

@Component({
    selector: 'jhi-stock-my-suffix-dialog',
    templateUrl: './stock-my-suffix-dialog.component.html'
})
export class StockMySuffixDialogComponent implements OnInit {

    stock: StockMySuffix;
    isSaving: boolean;

    stockproductos: StockProductoMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private stockService: StockMySuffixService,
        private stockProductoService: StockProductoMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.stockProductoService.query()
            .subscribe((res: HttpResponse<StockProductoMySuffix[]>) => { this.stockproductos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.stock.id !== undefined) {
            this.subscribeToSaveResponse(
                this.stockService.update(this.stock));
        } else {
            this.subscribeToSaveResponse(
                this.stockService.create(this.stock));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<StockMySuffix>>) {
        result.subscribe((res: HttpResponse<StockMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: StockMySuffix) {
        this.eventManager.broadcast({ name: 'stockListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackStockProductoById(index: number, item: StockProductoMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-stock-my-suffix-popup',
    template: ''
})
export class StockMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stockPopupService: StockMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.stockPopupService
                    .open(StockMySuffixDialogComponent as Component, params['id']);
            } else {
                this.stockPopupService
                    .open(StockMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
