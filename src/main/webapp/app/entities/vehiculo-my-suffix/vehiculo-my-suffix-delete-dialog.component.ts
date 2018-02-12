import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VehiculoMySuffix } from './vehiculo-my-suffix.model';
import { VehiculoMySuffixPopupService } from './vehiculo-my-suffix-popup.service';
import { VehiculoMySuffixService } from './vehiculo-my-suffix.service';

@Component({
    selector: 'jhi-vehiculo-my-suffix-delete-dialog',
    templateUrl: './vehiculo-my-suffix-delete-dialog.component.html'
})
export class VehiculoMySuffixDeleteDialogComponent {

    vehiculo: VehiculoMySuffix;

    constructor(
        private vehiculoService: VehiculoMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.vehiculoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'vehiculoListModification',
                content: 'Deleted an vehiculo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-vehiculo-my-suffix-delete-popup',
    template: ''
})
export class VehiculoMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vehiculoPopupService: VehiculoMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.vehiculoPopupService
                .open(VehiculoMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
