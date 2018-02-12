import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CarroMySuffix } from './carro-my-suffix.model';
import { CarroMySuffixService } from './carro-my-suffix.service';

@Component({
    selector: 'jhi-carro-my-suffix-detail',
    templateUrl: './carro-my-suffix-detail.component.html'
})
export class CarroMySuffixDetailComponent implements OnInit, OnDestroy {

    carro: CarroMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private carroService: CarroMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCarros();
    }

    load(id) {
        this.carroService.find(id)
            .subscribe((carroResponse: HttpResponse<CarroMySuffix>) => {
                this.carro = carroResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCarros() {
        this.eventSubscriber = this.eventManager.subscribe(
            'carroListModification',
            (response) => this.load(this.carro.id)
        );
    }
}
