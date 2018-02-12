import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RutaMySuffix } from './ruta-my-suffix.model';
import { RutaMySuffixService } from './ruta-my-suffix.service';

@Component({
    selector: 'jhi-ruta-my-suffix-detail',
    templateUrl: './ruta-my-suffix-detail.component.html'
})
export class RutaMySuffixDetailComponent implements OnInit, OnDestroy {

    ruta: RutaMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private rutaService: RutaMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRutas();
    }

    load(id) {
        this.rutaService.find(id)
            .subscribe((rutaResponse: HttpResponse<RutaMySuffix>) => {
                this.ruta = rutaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRutas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'rutaListModification',
            (response) => this.load(this.ruta.id)
        );
    }
}
