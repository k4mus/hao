import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CarroProductosMySuffix } from './carro-productos-my-suffix.model';
import { CarroProductosMySuffixPopupService } from './carro-productos-my-suffix-popup.service';
import { CarroProductosMySuffixService } from './carro-productos-my-suffix.service';

@Component({
    selector: 'jhi-carro-productos-my-suffix-delete-dialog',
    templateUrl: './carro-productos-my-suffix-delete-dialog.component.html'
})
export class CarroProductosMySuffixDeleteDialogComponent {

    carroProductos: CarroProductosMySuffix;

    constructor(
        private carroProductosService: CarroProductosMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.carroProductosService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'carroProductosListModification',
                content: 'Deleted an carroProductos'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-carro-productos-my-suffix-delete-popup',
    template: ''
})
export class CarroProductosMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private carroProductosPopupService: CarroProductosMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.carroProductosPopupService
                .open(CarroProductosMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
