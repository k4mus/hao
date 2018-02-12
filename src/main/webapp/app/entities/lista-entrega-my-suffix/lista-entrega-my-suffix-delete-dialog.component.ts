import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ListaEntregaMySuffix } from './lista-entrega-my-suffix.model';
import { ListaEntregaMySuffixPopupService } from './lista-entrega-my-suffix-popup.service';
import { ListaEntregaMySuffixService } from './lista-entrega-my-suffix.service';

@Component({
    selector: 'jhi-lista-entrega-my-suffix-delete-dialog',
    templateUrl: './lista-entrega-my-suffix-delete-dialog.component.html'
})
export class ListaEntregaMySuffixDeleteDialogComponent {

    listaEntrega: ListaEntregaMySuffix;

    constructor(
        private listaEntregaService: ListaEntregaMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.listaEntregaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'listaEntregaListModification',
                content: 'Deleted an listaEntrega'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-lista-entrega-my-suffix-delete-popup',
    template: ''
})
export class ListaEntregaMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private listaEntregaPopupService: ListaEntregaMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.listaEntregaPopupService
                .open(ListaEntregaMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
