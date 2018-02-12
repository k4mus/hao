import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MercadoMySuffix } from './mercado-my-suffix.model';
import { MercadoMySuffixPopupService } from './mercado-my-suffix-popup.service';
import { MercadoMySuffixService } from './mercado-my-suffix.service';
import { SucursalMySuffix, SucursalMySuffixService } from '../sucursal-my-suffix';
import { CarroMySuffix, CarroMySuffixService } from '../carro-my-suffix';

@Component({
    selector: 'jhi-mercado-my-suffix-dialog',
    templateUrl: './mercado-my-suffix-dialog.component.html'
})
export class MercadoMySuffixDialogComponent implements OnInit {

    mercado: MercadoMySuffix;
    isSaving: boolean;

    sucursals: SucursalMySuffix[];

    carros: CarroMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private mercadoService: MercadoMySuffixService,
        private sucursalService: SucursalMySuffixService,
        private carroService: CarroMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.sucursalService.query()
            .subscribe((res: HttpResponse<SucursalMySuffix[]>) => { this.sucursals = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.carroService.query()
            .subscribe((res: HttpResponse<CarroMySuffix[]>) => { this.carros = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.mercado.id !== undefined) {
            this.subscribeToSaveResponse(
                this.mercadoService.update(this.mercado));
        } else {
            this.subscribeToSaveResponse(
                this.mercadoService.create(this.mercado));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MercadoMySuffix>>) {
        result.subscribe((res: HttpResponse<MercadoMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MercadoMySuffix) {
        this.eventManager.broadcast({ name: 'mercadoListModification', content: 'OK'});
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

    trackCarroById(index: number, item: CarroMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-mercado-my-suffix-popup',
    template: ''
})
export class MercadoMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mercadoPopupService: MercadoMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.mercadoPopupService
                    .open(MercadoMySuffixDialogComponent as Component, params['id']);
            } else {
                this.mercadoPopupService
                    .open(MercadoMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
