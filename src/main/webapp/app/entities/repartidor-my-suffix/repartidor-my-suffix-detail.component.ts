import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RepartidorMySuffix } from './repartidor-my-suffix.model';
import { RepartidorMySuffixService } from './repartidor-my-suffix.service';

@Component({
    selector: 'jhi-repartidor-my-suffix-detail',
    templateUrl: './repartidor-my-suffix-detail.component.html'
})
export class RepartidorMySuffixDetailComponent implements OnInit, OnDestroy {

    repartidor: RepartidorMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private repartidorService: RepartidorMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRepartidors();
    }

    load(id) {
        this.repartidorService.find(id)
            .subscribe((repartidorResponse: HttpResponse<RepartidorMySuffix>) => {
                this.repartidor = repartidorResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRepartidors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'repartidorListModification',
            (response) => this.load(this.repartidor.id)
        );
    }
}
