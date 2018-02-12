import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RutaMySuffix } from './ruta-my-suffix.model';
import { RutaMySuffixPopupService } from './ruta-my-suffix-popup.service';
import { RutaMySuffixService } from './ruta-my-suffix.service';

@Component({
    selector: 'jhi-ruta-my-suffix-delete-dialog',
    templateUrl: './ruta-my-suffix-delete-dialog.component.html'
})
export class RutaMySuffixDeleteDialogComponent {

    ruta: RutaMySuffix;

    constructor(
        private rutaService: RutaMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rutaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'rutaListModification',
                content: 'Deleted an ruta'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ruta-my-suffix-delete-popup',
    template: ''
})
export class RutaMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rutaPopupService: RutaMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.rutaPopupService
                .open(RutaMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
