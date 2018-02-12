/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HaoTestModule } from '../../../test.module';
import { VehiculoMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/vehiculo-my-suffix/vehiculo-my-suffix-delete-dialog.component';
import { VehiculoMySuffixService } from '../../../../../../main/webapp/app/entities/vehiculo-my-suffix/vehiculo-my-suffix.service';

describe('Component Tests', () => {

    describe('VehiculoMySuffix Management Delete Component', () => {
        let comp: VehiculoMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<VehiculoMySuffixDeleteDialogComponent>;
        let service: VehiculoMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [VehiculoMySuffixDeleteDialogComponent],
                providers: [
                    VehiculoMySuffixService
                ]
            })
            .overrideTemplate(VehiculoMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VehiculoMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehiculoMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
