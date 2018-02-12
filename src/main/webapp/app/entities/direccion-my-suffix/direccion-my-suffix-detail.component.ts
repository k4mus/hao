import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DireccionMySuffix } from './direccion-my-suffix.model';
import { DireccionMySuffixService } from './direccion-my-suffix.service';

@Component({
    selector: 'jhi-direccion-my-suffix-detail',
    templateUrl: './direccion-my-suffix-detail.component.html'
})
export class DireccionMySuffixDetailComponent implements OnInit, OnDestroy {

    direccion: DireccionMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private direccionService: DireccionMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDireccions();
    }

    load(id) {
        this.direccionService.find(id)
            .subscribe((direccionResponse: HttpResponse<DireccionMySuffix>) => {
                this.direccion = direccionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDireccions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'direccionListModification',
            (response) => this.load(this.direccion.id)
        );
    }
}
