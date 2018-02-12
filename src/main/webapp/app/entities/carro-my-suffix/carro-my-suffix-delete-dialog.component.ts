import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CarroMySuffix } from './carro-my-suffix.model';
import { CarroMySuffixPopupService } from './carro-my-suffix-popup.service';
import { CarroMySuffixService } from './carro-my-suffix.service';

@Component({
    selector: 'jhi-carro-my-suffix-delete-dialog',
    templateUrl: './carro-my-suffix-delete-dialog.component.html'
})
export class CarroMySuffixDeleteDialogComponent {

    carro: CarroMySuffix;

    constructor(
        private carroService: CarroMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.carroService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'carroListModification',
                content: 'Deleted an carro'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-carro-my-suffix-delete-popup',
    template: ''
})
export class CarroMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private carroPopupService: CarroMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.carroPopupService
                .open(CarroMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
