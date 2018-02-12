import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StockProductoMySuffix } from './stock-producto-my-suffix.model';
import { StockProductoMySuffixPopupService } from './stock-producto-my-suffix-popup.service';
import { StockProductoMySuffixService } from './stock-producto-my-suffix.service';

@Component({
    selector: 'jhi-stock-producto-my-suffix-delete-dialog',
    templateUrl: './stock-producto-my-suffix-delete-dialog.component.html'
})
export class StockProductoMySuffixDeleteDialogComponent {

    stockProducto: StockProductoMySuffix;

    constructor(
        private stockProductoService: StockProductoMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stockProductoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'stockProductoListModification',
                content: 'Deleted an stockProducto'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-stock-producto-my-suffix-delete-popup',
    template: ''
})
export class StockProductoMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stockProductoPopupService: StockProductoMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.stockProductoPopupService
                .open(StockProductoMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
