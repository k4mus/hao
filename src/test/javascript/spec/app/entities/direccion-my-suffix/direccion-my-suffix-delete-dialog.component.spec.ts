/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HaoTestModule } from '../../../test.module';
import { DireccionMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/direccion-my-suffix/direccion-my-suffix-delete-dialog.component';
import { DireccionMySuffixService } from '../../../../../../main/webapp/app/entities/direccion-my-suffix/direccion-my-suffix.service';

describe('Component Tests', () => {

    describe('DireccionMySuffix Management Delete Component', () => {
        let comp: DireccionMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<DireccionMySuffixDeleteDialogComponent>;
        let service: DireccionMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [DireccionMySuffixDeleteDialogComponent],
                providers: [
                    DireccionMySuffixService
                ]
            })
            .overrideTemplate(DireccionMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DireccionMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DireccionMySuffixService);
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
