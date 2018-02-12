import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CarroProductosMySuffix } from './carro-productos-my-suffix.model';
import { CarroProductosMySuffixPopupService } from './carro-productos-my-suffix-popup.service';
import { CarroProductosMySuffixService } from './carro-productos-my-suffix.service';

@Component({
    selector: 'jhi-carro-productos-my-suffix-dialog',
    templateUrl: './carro-productos-my-suffix-dialog.component.html'
})
export class CarroProductosMySuffixDialogComponent implements OnInit {

    carroProductos: CarroProductosMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private carroProductosService: CarroProductosMySuffixService,
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
        if (this.carroProductos.id !== undefined) {
            this.subscribeToSaveResponse(
                this.carroProductosService.update(this.carroProductos));
        } else {
            this.subscribeToSaveResponse(
                this.carroProductosService.create(this.carroProductos));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CarroProductosMySuffix>>) {
        result.subscribe((res: HttpResponse<CarroProductosMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CarroProductosMySuffix) {
        this.eventManager.broadcast({ name: 'carroProductosListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-carro-productos-my-suffix-popup',
    template: ''
})
export class CarroProductosMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private carroProductosPopupService: CarroProductosMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.carroProductosPopupService
                    .open(CarroProductosMySuffixDialogComponent as Component, params['id']);
            } else {
                this.carroProductosPopupService
                    .open(CarroProductosMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
