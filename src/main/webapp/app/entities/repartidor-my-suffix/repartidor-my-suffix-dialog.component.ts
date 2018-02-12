import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RepartidorMySuffix } from './repartidor-my-suffix.model';
import { RepartidorMySuffixPopupService } from './repartidor-my-suffix-popup.service';
import { RepartidorMySuffixService } from './repartidor-my-suffix.service';
import { VehiculoMySuffix, VehiculoMySuffixService } from '../vehiculo-my-suffix';

@Component({
    selector: 'jhi-repartidor-my-suffix-dialog',
    templateUrl: './repartidor-my-suffix-dialog.component.html'
})
export class RepartidorMySuffixDialogComponent implements OnInit {

    repartidor: RepartidorMySuffix;
    isSaving: boolean;

    vehiculos: VehiculoMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private repartidorService: RepartidorMySuffixService,
        private vehiculoService: VehiculoMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.vehiculoService.query()
            .subscribe((res: HttpResponse<VehiculoMySuffix[]>) => { this.vehiculos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.repartidor.id !== undefined) {
            this.subscribeToSaveResponse(
                this.repartidorService.update(this.repartidor));
        } else {
            this.subscribeToSaveResponse(
                this.repartidorService.create(this.repartidor));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RepartidorMySuffix>>) {
        result.subscribe((res: HttpResponse<RepartidorMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RepartidorMySuffix) {
        this.eventManager.broadcast({ name: 'repartidorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackVehiculoById(index: number, item: VehiculoMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-repartidor-my-suffix-popup',
    template: ''
})
export class RepartidorMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private repartidorPopupService: RepartidorMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.repartidorPopupService
                    .open(RepartidorMySuffixDialogComponent as Component, params['id']);
            } else {
                this.repartidorPopupService
                    .open(RepartidorMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
