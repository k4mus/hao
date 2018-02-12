import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SucursalMySuffix } from './sucursal-my-suffix.model';
import { SucursalMySuffixPopupService } from './sucursal-my-suffix-popup.service';
import { SucursalMySuffixService } from './sucursal-my-suffix.service';
import { StockMySuffix, StockMySuffixService } from '../stock-my-suffix';

@Component({
    selector: 'jhi-sucursal-my-suffix-dialog',
    templateUrl: './sucursal-my-suffix-dialog.component.html'
})
export class SucursalMySuffixDialogComponent implements OnInit {

    sucursal: SucursalMySuffix;
    isSaving: boolean;

    stocks: StockMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private sucursalService: SucursalMySuffixService,
        private stockService: StockMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.stockService.query()
            .subscribe((res: HttpResponse<StockMySuffix[]>) => { this.stocks = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.sucursal.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sucursalService.update(this.sucursal));
        } else {
            this.subscribeToSaveResponse(
                this.sucursalService.create(this.sucursal));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SucursalMySuffix>>) {
        result.subscribe((res: HttpResponse<SucursalMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SucursalMySuffix) {
        this.eventManager.broadcast({ name: 'sucursalListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackStockById(index: number, item: StockMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-sucursal-my-suffix-popup',
    template: ''
})
export class SucursalMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sucursalPopupService: SucursalMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sucursalPopupService
                    .open(SucursalMySuffixDialogComponent as Component, params['id']);
            } else {
                this.sucursalPopupService
                    .open(SucursalMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
