/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HaoTestModule } from '../../../test.module';
import { MercadoMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/mercado-my-suffix/mercado-my-suffix-dialog.component';
import { MercadoMySuffixService } from '../../../../../../main/webapp/app/entities/mercado-my-suffix/mercado-my-suffix.service';
import { MercadoMySuffix } from '../../../../../../main/webapp/app/entities/mercado-my-suffix/mercado-my-suffix.model';
import { SucursalMySuffixService } from '../../../../../../main/webapp/app/entities/sucursal-my-suffix';
import { CarroMySuffixService } from '../../../../../../main/webapp/app/entities/carro-my-suffix';

describe('Component Tests', () => {

    describe('MercadoMySuffix Management Dialog Component', () => {
        let comp: MercadoMySuffixDialogComponent;
        let fixture: ComponentFixture<MercadoMySuffixDialogComponent>;
        let service: MercadoMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [MercadoMySuffixDialogComponent],
                providers: [
                    SucursalMySuffixService,
                    CarroMySuffixService,
                    MercadoMySuffixService
                ]
            })
            .overrideTemplate(MercadoMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MercadoMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MercadoMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MercadoMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.mercado = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'mercadoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MercadoMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.mercado = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'mercadoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
