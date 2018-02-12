/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HaoTestModule } from '../../../test.module';
import { MedioPagoMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/medio-pago-my-suffix/medio-pago-my-suffix-dialog.component';
import { MedioPagoMySuffixService } from '../../../../../../main/webapp/app/entities/medio-pago-my-suffix/medio-pago-my-suffix.service';
import { MedioPagoMySuffix } from '../../../../../../main/webapp/app/entities/medio-pago-my-suffix/medio-pago-my-suffix.model';
import { CarroMySuffixService } from '../../../../../../main/webapp/app/entities/carro-my-suffix';

describe('Component Tests', () => {

    describe('MedioPagoMySuffix Management Dialog Component', () => {
        let comp: MedioPagoMySuffixDialogComponent;
        let fixture: ComponentFixture<MedioPagoMySuffixDialogComponent>;
        let service: MedioPagoMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [MedioPagoMySuffixDialogComponent],
                providers: [
                    CarroMySuffixService,
                    MedioPagoMySuffixService
                ]
            })
            .overrideTemplate(MedioPagoMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MedioPagoMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedioPagoMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MedioPagoMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.medioPago = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'medioPagoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MedioPagoMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.medioPago = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'medioPagoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
