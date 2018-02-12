import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SucursalMySuffix } from './sucursal-my-suffix.model';
import { SucursalMySuffixService } from './sucursal-my-suffix.service';

@Component({
    selector: 'jhi-sucursal-my-suffix-detail',
    templateUrl: './sucursal-my-suffix-detail.component.html'
})
export class SucursalMySuffixDetailComponent implements OnInit, OnDestroy {

    sucursal: SucursalMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private sucursalService: SucursalMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSucursals();
    }

    load(id) {
        this.sucursalService.find(id)
            .subscribe((sucursalResponse: HttpResponse<SucursalMySuffix>) => {
                this.sucursal = sucursalResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSucursals() {
        this.eventSubscriber = this.eventManager.subscribe(
            'sucursalListModification',
            (response) => this.load(this.sucursal.id)
        );
    }
}
