import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MercadoMySuffix } from './mercado-my-suffix.model';
import { MercadoMySuffixPopupService } from './mercado-my-suffix-popup.service';
import { MercadoMySuffixService } from './mercado-my-suffix.service';

@Component({
    selector: 'jhi-mercado-my-suffix-delete-dialog',
    templateUrl: './mercado-my-suffix-delete-dialog.component.html'
})
export class MercadoMySuffixDeleteDialogComponent {

    mercado: MercadoMySuffix;

    constructor(
        private mercadoService: MercadoMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mercadoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'mercadoListModification',
                content: 'Deleted an mercado'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mercado-my-suffix-delete-popup',
    template: ''
})
export class MercadoMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mercadoPopupService: MercadoMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.mercadoPopupService
                .open(MercadoMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
