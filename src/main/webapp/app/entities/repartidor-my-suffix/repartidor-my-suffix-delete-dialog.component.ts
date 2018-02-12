import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RepartidorMySuffix } from './repartidor-my-suffix.model';
import { RepartidorMySuffixPopupService } from './repartidor-my-suffix-popup.service';
import { RepartidorMySuffixService } from './repartidor-my-suffix.service';

@Component({
    selector: 'jhi-repartidor-my-suffix-delete-dialog',
    templateUrl: './repartidor-my-suffix-delete-dialog.component.html'
})
export class RepartidorMySuffixDeleteDialogComponent {

    repartidor: RepartidorMySuffix;

    constructor(
        private repartidorService: RepartidorMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.repartidorService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'repartidorListModification',
                content: 'Deleted an repartidor'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-repartidor-my-suffix-delete-popup',
    template: ''
})
export class RepartidorMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private repartidorPopupService: RepartidorMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.repartidorPopupService
                .open(RepartidorMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
