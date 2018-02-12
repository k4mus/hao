/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HaoTestModule } from '../../../test.module';
import { RepartidorMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/repartidor-my-suffix/repartidor-my-suffix-delete-dialog.component';
import { RepartidorMySuffixService } from '../../../../../../main/webapp/app/entities/repartidor-my-suffix/repartidor-my-suffix.service';

describe('Component Tests', () => {

    describe('RepartidorMySuffix Management Delete Component', () => {
        let comp: RepartidorMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<RepartidorMySuffixDeleteDialogComponent>;
        let service: RepartidorMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [RepartidorMySuffixDeleteDialogComponent],
                providers: [
                    RepartidorMySuffixService
                ]
            })
            .overrideTemplate(RepartidorMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RepartidorMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RepartidorMySuffixService);
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
