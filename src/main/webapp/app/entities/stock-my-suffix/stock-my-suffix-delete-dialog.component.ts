import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StockMySuffix } from './stock-my-suffix.model';
import { StockMySuffixPopupService } from './stock-my-suffix-popup.service';
import { StockMySuffixService } from './stock-my-suffix.service';

@Component({
    selector: 'jhi-stock-my-suffix-delete-dialog',
    templateUrl: './stock-my-suffix-delete-dialog.component.html'
})
export class StockMySuffixDeleteDialogComponent {

    stock: StockMySuffix;

    constructor(
        private stockService: StockMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stockService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'stockListModification',
                content: 'Deleted an stock'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-stock-my-suffix-delete-popup',
    template: ''
})
export class StockMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stockPopupService: StockMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.stockPopupService
                .open(StockMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
