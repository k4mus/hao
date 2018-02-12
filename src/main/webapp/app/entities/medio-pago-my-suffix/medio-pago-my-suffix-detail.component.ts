import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MedioPagoMySuffix } from './medio-pago-my-suffix.model';
import { MedioPagoMySuffixService } from './medio-pago-my-suffix.service';

@Component({
    selector: 'jhi-medio-pago-my-suffix-detail',
    templateUrl: './medio-pago-my-suffix-detail.component.html'
})
export class MedioPagoMySuffixDetailComponent implements OnInit, OnDestroy {

    medioPago: MedioPagoMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private medioPagoService: MedioPagoMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMedioPagos();
    }

    load(id) {
        this.medioPagoService.find(id)
            .subscribe((medioPagoResponse: HttpResponse<MedioPagoMySuffix>) => {
                this.medioPago = medioPagoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMedioPagos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'medioPagoListModification',
            (response) => this.load(this.medioPago.id)
        );
    }
}
