import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MedioPagoMySuffix } from './medio-pago-my-suffix.model';
import { MedioPagoMySuffixPopupService } from './medio-pago-my-suffix-popup.service';
import { MedioPagoMySuffixService } from './medio-pago-my-suffix.service';
import { CarroMySuffix, CarroMySuffixService } from '../carro-my-suffix';

@Component({
    selector: 'jhi-medio-pago-my-suffix-dialog',
    templateUrl: './medio-pago-my-suffix-dialog.component.html'
})
export class MedioPagoMySuffixDialogComponent implements OnInit {

    medioPago: MedioPagoMySuffix;
    isSaving: boolean;

    carros: CarroMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private medioPagoService: MedioPagoMySuffixService,
        private carroService: CarroMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.carroService.query()
            .subscribe((res: HttpResponse<CarroMySuffix[]>) => { this.carros = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.medioPago.id !== undefined) {
            this.subscribeToSaveResponse(
                this.medioPagoService.update(this.medioPago));
        } else {
            this.subscribeToSaveResponse(
                this.medioPagoService.create(this.medioPago));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MedioPagoMySuffix>>) {
        result.subscribe((res: HttpResponse<MedioPagoMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MedioPagoMySuffix) {
        this.eventManager.broadcast({ name: 'medioPagoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCarroById(index: number, item: CarroMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-medio-pago-my-suffix-popup',
    template: ''
})
export class MedioPagoMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private medioPagoPopupService: MedioPagoMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.medioPagoPopupService
                    .open(MedioPagoMySuffixDialogComponent as Component, params['id']);
            } else {
                this.medioPagoPopupService
                    .open(MedioPagoMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
