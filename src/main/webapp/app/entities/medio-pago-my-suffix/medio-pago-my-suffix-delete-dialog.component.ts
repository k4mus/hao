import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MedioPagoMySuffix } from './medio-pago-my-suffix.model';
import { MedioPagoMySuffixPopupService } from './medio-pago-my-suffix-popup.service';
import { MedioPagoMySuffixService } from './medio-pago-my-suffix.service';

@Component({
    selector: 'jhi-medio-pago-my-suffix-delete-dialog',
    templateUrl: './medio-pago-my-suffix-delete-dialog.component.html'
})
export class MedioPagoMySuffixDeleteDialogComponent {

    medioPago: MedioPagoMySuffix;

    constructor(
        private medioPagoService: MedioPagoMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.medioPagoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'medioPagoListModification',
                content: 'Deleted an medioPago'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-medio-pago-my-suffix-delete-popup',
    template: ''
})
export class MedioPagoMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private medioPagoPopupService: MedioPagoMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.medioPagoPopupService
                .open(MedioPagoMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
