import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ComercioMySuffix } from './comercio-my-suffix.model';
import { ComercioMySuffixPopupService } from './comercio-my-suffix-popup.service';
import { ComercioMySuffixService } from './comercio-my-suffix.service';
import { SucursalMySuffix, SucursalMySuffixService } from '../sucursal-my-suffix';

@Component({
    selector: 'jhi-comercio-my-suffix-dialog',
    templateUrl: './comercio-my-suffix-dialog.component.html'
})
export class ComercioMySuffixDialogComponent implements OnInit {

    comercio: ComercioMySuffix;
    isSaving: boolean;

    sucursals: SucursalMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private comercioService: ComercioMySuffixService,
        private sucursalService: SucursalMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.sucursalService.query()
            .subscribe((res: HttpResponse<SucursalMySuffix[]>) => { this.sucursals = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.comercio.id !== undefined) {
            this.subscribeToSaveResponse(
                this.comercioService.update(this.comercio));
        } else {
            this.subscribeToSaveResponse(
                this.comercioService.create(this.comercio));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ComercioMySuffix>>) {
        result.subscribe((res: HttpResponse<ComercioMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ComercioMySuffix) {
        this.eventManager.broadcast({ name: 'comercioListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSucursalById(index: number, item: SucursalMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-comercio-my-suffix-popup',
    template: ''
})
export class ComercioMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private comercioPopupService: ComercioMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.comercioPopupService
                    .open(ComercioMySuffixDialogComponent as Component, params['id']);
            } else {
                this.comercioPopupService
                    .open(ComercioMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
