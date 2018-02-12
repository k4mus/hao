import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RutaMySuffix } from './ruta-my-suffix.model';
import { RutaMySuffixPopupService } from './ruta-my-suffix-popup.service';
import { RutaMySuffixService } from './ruta-my-suffix.service';
import { EntregaMySuffix, EntregaMySuffixService } from '../entrega-my-suffix';

@Component({
    selector: 'jhi-ruta-my-suffix-dialog',
    templateUrl: './ruta-my-suffix-dialog.component.html'
})
export class RutaMySuffixDialogComponent implements OnInit {

    ruta: RutaMySuffix;
    isSaving: boolean;

    entregas: EntregaMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private rutaService: RutaMySuffixService,
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
        if (this.ruta.id !== undefined) {
            this.subscribeToSaveResponse(
                this.rutaService.update(this.ruta));
        } else {
            this.subscribeToSaveResponse(
                this.rutaService.create(this.ruta));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RutaMySuffix>>) {
        result.subscribe((res: HttpResponse<RutaMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RutaMySuffix) {
        this.eventManager.broadcast({ name: 'rutaListModification', content: 'OK'});
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
    selector: 'jhi-ruta-my-suffix-popup',
    template: ''
})
export class RutaMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rutaPopupService: RutaMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.rutaPopupService
                    .open(RutaMySuffixDialogComponent as Component, params['id']);
            } else {
                this.rutaPopupService
                    .open(RutaMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
