import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CarroProductosMySuffix } from './carro-productos-my-suffix.model';
import { CarroProductosMySuffixService } from './carro-productos-my-suffix.service';

@Component({
    selector: 'jhi-carro-productos-my-suffix-detail',
    templateUrl: './carro-productos-my-suffix-detail.component.html'
})
export class CarroProductosMySuffixDetailComponent implements OnInit, OnDestroy {

    carroProductos: CarroProductosMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private carroProductosService: CarroProductosMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCarroProductos();
    }

    load(id) {
        this.carroProductosService.find(id)
            .subscribe((carroProductosResponse: HttpResponse<CarroProductosMySuffix>) => {
                this.carroProductos = carroProductosResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCarroProductos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'carroProductosListModification',
            (response) => this.load(this.carroProductos.id)
        );
    }
}
