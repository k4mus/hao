import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MercadoMySuffix } from './mercado-my-suffix.model';
import { MercadoMySuffixService } from './mercado-my-suffix.service';

@Component({
    selector: 'jhi-mercado-my-suffix-detail',
    templateUrl: './mercado-my-suffix-detail.component.html'
})
export class MercadoMySuffixDetailComponent implements OnInit, OnDestroy {

    mercado: MercadoMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private mercadoService: MercadoMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMercados();
    }

    load(id) {
        this.mercadoService.find(id)
            .subscribe((mercadoResponse: HttpResponse<MercadoMySuffix>) => {
                this.mercado = mercadoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMercados() {
        this.eventSubscriber = this.eventManager.subscribe(
            'mercadoListModification',
            (response) => this.load(this.mercado.id)
        );
    }
}
