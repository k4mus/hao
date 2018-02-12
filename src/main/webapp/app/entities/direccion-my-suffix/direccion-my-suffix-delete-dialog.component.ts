import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DireccionMySuffix } from './direccion-my-suffix.model';
import { DireccionMySuffixPopupService } from './direccion-my-suffix-popup.service';
import { DireccionMySuffixService } from './direccion-my-suffix.service';

@Component({
    selector: 'jhi-direccion-my-suffix-delete-dialog',
    templateUrl: './direccion-my-suffix-delete-dialog.component.html'
})
export class DireccionMySuffixDeleteDialogComponent {

    direccion: DireccionMySuffix;

    constructor(
        private direccionService: DireccionMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.direccionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'direccionListModification',
                content: 'Deleted an direccion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-direccion-my-suffix-delete-popup',
    template: ''
})
export class DireccionMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private direccionPopupService: DireccionMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.direccionPopupService
                .open(DireccionMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
