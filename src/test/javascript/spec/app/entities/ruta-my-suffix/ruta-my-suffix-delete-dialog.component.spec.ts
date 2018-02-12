/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HaoTestModule } from '../../../test.module';
import { RutaMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/ruta-my-suffix/ruta-my-suffix-delete-dialog.component';
import { RutaMySuffixService } from '../../../../../../main/webapp/app/entities/ruta-my-suffix/ruta-my-suffix.service';

describe('Component Tests', () => {

    describe('RutaMySuffix Management Delete Component', () => {
        let comp: RutaMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<RutaMySuffixDeleteDialogComponent>;
        let service: RutaMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [RutaMySuffixDeleteDialogComponent],
                providers: [
                    RutaMySuffixService
                ]
            })
            .overrideTemplate(RutaMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RutaMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RutaMySuffixService);
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
