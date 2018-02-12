import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { VehiculoMySuffix } from './vehiculo-my-suffix.model';
import { VehiculoMySuffixPopupService } from './vehiculo-my-suffix-popup.service';
import { VehiculoMySuffixService } from './vehiculo-my-suffix.service';
import { EntregaMySuffix, EntregaMySuffixService } from '../entrega-my-suffix';

@Component({
    selector: 'jhi-vehiculo-my-suffix-dialog',
    templateUrl: './vehiculo-my-suffix-dialog.component.html'
})
export class VehiculoMySuffixDialogComponent implements OnInit {

    vehiculo: VehiculoMySuffix;
    isSaving: boolean;

    entregas: EntregaMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private vehiculoService: VehiculoMySuffixService,
        private entregaService: EntregaMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.entregaService.query()
            .subscribe((res: HttpResponse<EntregaMySuffix[]>) => { this.entregas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.vehiculo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.vehiculoService.update(this.vehiculo));
        } else {
            this.subscribeToSaveResponse(
                this.vehiculoService.create(this.vehiculo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<VehiculoMySuffix>>) {
        result.subscribe((res: HttpResponse<VehiculoMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: VehiculoMySuffix) {
        this.eventManager.broadcast({ name: 'vehiculoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEntregaById(index: number, item: EntregaMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-vehiculo-my-suffix-popup',
    template: ''
})
export class VehiculoMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vehiculoPopupService: VehiculoMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.vehiculoPopupService
                    .open(VehiculoMySuffixDialogComponent as Component, params['id']);
            } else {
                this.vehiculoPopupService
                    .open(VehiculoMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
