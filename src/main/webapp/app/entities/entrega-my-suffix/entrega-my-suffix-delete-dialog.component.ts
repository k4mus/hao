import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EntregaMySuffix } from './entrega-my-suffix.model';
import { EntregaMySuffixPopupService } from './entrega-my-suffix-popup.service';
import { EntregaMySuffixService } from './entrega-my-suffix.service';

@Component({
    selector: 'jhi-entrega-my-suffix-delete-dialog',
    templateUrl: './entrega-my-suffix-delete-dialog.component.html'
})
export class EntregaMySuffixDeleteDialogComponent {

    entrega: EntregaMySuffix;

    constructor(
        private entregaService: EntregaMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.entregaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'entregaListModification',
                content: 'Deleted an entrega'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-entrega-my-suffix-delete-popup',
    template: ''
})
export class EntregaMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private entregaPopupService: EntregaMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.entregaPopupService
                .open(EntregaMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
