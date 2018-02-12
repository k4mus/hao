import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ComercioMySuffix } from './comercio-my-suffix.model';
import { ComercioMySuffixPopupService } from './comercio-my-suffix-popup.service';
import { ComercioMySuffixService } from './comercio-my-suffix.service';

@Component({
    selector: 'jhi-comercio-my-suffix-delete-dialog',
    templateUrl: './comercio-my-suffix-delete-dialog.component.html'
})
export class ComercioMySuffixDeleteDialogComponent {

    comercio: ComercioMySuffix;

    constructor(
        private comercioService: ComercioMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.comercioService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'comercioListModification',
                content: 'Deleted an comercio'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-comercio-my-suffix-delete-popup',
    template: ''
})
export class ComercioMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private comercioPopupService: ComercioMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.comercioPopupService
                .open(ComercioMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
