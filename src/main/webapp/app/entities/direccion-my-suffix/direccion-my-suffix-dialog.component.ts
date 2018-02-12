import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DireccionMySuffix } from './direccion-my-suffix.model';
import { DireccionMySuffixPopupService } from './direccion-my-suffix-popup.service';
import { DireccionMySuffixService } from './direccion-my-suffix.service';

@Component({
    selector: 'jhi-direccion-my-suffix-dialog',
    templateUrl: './direccion-my-suffix-dialog.component.html'
})
export class DireccionMySuffixDialogComponent implements OnInit {

    direccion: DireccionMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private direccionService: DireccionMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.direccion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.direccionService.update(this.direccion));
        } else {
            this.subscribeToSaveResponse(
                this.direccionService.create(this.direccion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DireccionMySuffix>>) {
        result.subscribe((res: HttpResponse<DireccionMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DireccionMySuffix) {
        this.eventManager.broadcast({ name: 'direccionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-direccion-my-suffix-popup',
    template: ''
})
export class DireccionMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private direccionPopupService: DireccionMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.direccionPopupService
                    .open(DireccionMySuffixDialogComponent as Component, params['id']);
            } else {
                this.direccionPopupService
                    .open(DireccionMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
