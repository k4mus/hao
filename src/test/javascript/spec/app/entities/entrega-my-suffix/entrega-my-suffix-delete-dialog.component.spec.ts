/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HaoTestModule } from '../../../test.module';
import { EntregaMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/entrega-my-suffix/entrega-my-suffix-delete-dialog.component';
import { EntregaMySuffixService } from '../../../../../../main/webapp/app/entities/entrega-my-suffix/entrega-my-suffix.service';

describe('Component Tests', () => {

    describe('EntregaMySuffix Management Delete Component', () => {
        let comp: EntregaMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<EntregaMySuffixDeleteDialogComponent>;
        let service: EntregaMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [EntregaMySuffixDeleteDialogComponent],
                providers: [
                    EntregaMySuffixService
                ]
            })
            .overrideTemplate(EntregaMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntregaMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntregaMySuffixService);
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
