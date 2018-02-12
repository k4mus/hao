import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { VehiculoMySuffix } from './vehiculo-my-suffix.model';
import { VehiculoMySuffixService } from './vehiculo-my-suffix.service';

@Component({
    selector: 'jhi-vehiculo-my-suffix-detail',
    templateUrl: './vehiculo-my-suffix-detail.component.html'
})
export class VehiculoMySuffixDetailComponent implements OnInit, OnDestroy {

    vehiculo: VehiculoMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private vehiculoService: VehiculoMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInVehiculos();
    }

    load(id) {
        this.vehiculoService.find(id)
            .subscribe((vehiculoResponse: HttpResponse<VehiculoMySuffix>) => {
                this.vehiculo = vehiculoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInVehiculos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'vehiculoListModification',
            (response) => this.load(this.vehiculo.id)
        );
    }
}
