/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HaoTestModule } from '../../../test.module';
import { MercadoMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/mercado-my-suffix/mercado-my-suffix-delete-dialog.component';
import { MercadoMySuffixService } from '../../../../../../main/webapp/app/entities/mercado-my-suffix/mercado-my-suffix.service';

describe('Component Tests', () => {

    describe('MercadoMySuffix Management Delete Component', () => {
        let comp: MercadoMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<MercadoMySuffixDeleteDialogComponent>;
        let service: MercadoMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [MercadoMySuffixDeleteDialogComponent],
                providers: [
                    MercadoMySuffixService
                ]
            })
            .overrideTemplate(MercadoMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MercadoMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MercadoMySuffixService);
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
