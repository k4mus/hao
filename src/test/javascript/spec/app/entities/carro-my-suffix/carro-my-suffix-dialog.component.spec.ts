/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HaoTestModule } from '../../../test.module';
import { CarroMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/carro-my-suffix/carro-my-suffix-dialog.component';
import { CarroMySuffixService } from '../../../../../../main/webapp/app/entities/carro-my-suffix/carro-my-suffix.service';
import { CarroMySuffix } from '../../../../../../main/webapp/app/entities/carro-my-suffix/carro-my-suffix.model';
import { CarroProductosMySuffixService } from '../../../../../../main/webapp/app/entities/carro-productos-my-suffix';
import { ListaEntregaMySuffixService } from '../../../../../../main/webapp/app/entities/lista-entrega-my-suffix';

describe('Component Tests', () => {

    describe('CarroMySuffix Management Dialog Component', () => {
        let comp: CarroMySuffixDialogComponent;
        let fixture: ComponentFixture<CarroMySuffixDialogComponent>;
        let service: CarroMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [CarroMySuffixDialogComponent],
                providers: [
                    CarroProductosMySuffixService,
                    ListaEntregaMySuffixService,
                    CarroMySuffixService
                ]
            })
            .overrideTemplate(CarroMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CarroMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CarroMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CarroMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.carro = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'carroListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CarroMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.carro = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'carroListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
