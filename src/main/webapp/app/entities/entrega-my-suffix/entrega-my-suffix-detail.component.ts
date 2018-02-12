import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EntregaMySuffix } from './entrega-my-suffix.model';
import { EntregaMySuffixService } from './entrega-my-suffix.service';

@Component({
    selector: 'jhi-entrega-my-suffix-detail',
    templateUrl: './entrega-my-suffix-detail.component.html'
})
export class EntregaMySuffixDetailComponent implements OnInit, OnDestroy {

    entrega: EntregaMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private entregaService: EntregaMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEntregas();
    }

    load(id) {
        this.entregaService.find(id)
            .subscribe((entregaResponse: HttpResponse<EntregaMySuffix>) => {
                this.entrega = entregaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEntregas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'entregaListModification',
            (response) => this.load(this.entrega.id)
        );
    }
}
