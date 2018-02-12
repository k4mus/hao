import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ComercioMySuffix } from './comercio-my-suffix.model';
import { ComercioMySuffixService } from './comercio-my-suffix.service';

@Component({
    selector: 'jhi-comercio-my-suffix-detail',
    templateUrl: './comercio-my-suffix-detail.component.html'
})
export class ComercioMySuffixDetailComponent implements OnInit, OnDestroy {

    comercio: ComercioMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private comercioService: ComercioMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInComercios();
    }

    load(id) {
        this.comercioService.find(id)
            .subscribe((comercioResponse: HttpResponse<ComercioMySuffix>) => {
                this.comercio = comercioResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInComercios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'comercioListModification',
            (response) => this.load(this.comercio.id)
        );
    }
}
