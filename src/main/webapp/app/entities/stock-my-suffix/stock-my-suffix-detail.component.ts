import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { StockMySuffix } from './stock-my-suffix.model';
import { StockMySuffixService } from './stock-my-suffix.service';

@Component({
    selector: 'jhi-stock-my-suffix-detail',
    templateUrl: './stock-my-suffix-detail.component.html'
})
export class StockMySuffixDetailComponent implements OnInit, OnDestroy {

    stock: StockMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private stockService: StockMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStocks();
    }

    load(id) {
        this.stockService.find(id)
            .subscribe((stockResponse: HttpResponse<StockMySuffix>) => {
                this.stock = stockResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStocks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'stockListModification',
            (response) => this.load(this.stock.id)
        );
    }
}
