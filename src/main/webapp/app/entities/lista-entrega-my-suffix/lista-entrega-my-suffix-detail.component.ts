import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ListaEntregaMySuffix } from './lista-entrega-my-suffix.model';
import { ListaEntregaMySuffixService } from './lista-entrega-my-suffix.service';

@Component({
    selector: 'jhi-lista-entrega-my-suffix-detail',
    templateUrl: './lista-entrega-my-suffix-detail.component.html'
})
export class ListaEntregaMySuffixDetailComponent implements OnInit, OnDestroy {

    listaEntrega: ListaEntregaMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private listaEntregaService: ListaEntregaMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInListaEntregas();
    }

    load(id) {
        this.listaEntregaService.find(id)
            .subscribe((listaEntregaResponse: HttpResponse<ListaEntregaMySuffix>) => {
                this.listaEntrega = listaEntregaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInListaEntregas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'listaEntregaListModification',
            (response) => this.load(this.listaEntrega.id)
        );
    }
}
