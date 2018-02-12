import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { StockProductoMySuffix } from './stock-producto-my-suffix.model';
import { StockProductoMySuffixService } from './stock-producto-my-suffix.service';

@Component({
    selector: 'jhi-stock-producto-my-suffix-detail',
    templateUrl: './stock-producto-my-suffix-detail.component.html'
})
export class StockProductoMySuffixDetailComponent implements OnInit, OnDestroy {

    stockProducto: StockProductoMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private stockProductoService: StockProductoMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStockProductos();
    }

    load(id) {
        this.stockProductoService.find(id)
            .subscribe((stockProductoResponse: HttpResponse<StockProductoMySuffix>) => {
                this.stockProducto = stockProductoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStockProductos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'stockProductoListModification',
            (response) => this.load(this.stockProducto.id)
        );
    }
}
