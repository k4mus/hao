/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HaoTestModule } from '../../../test.module';
import { SucursalMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/sucursal-my-suffix/sucursal-my-suffix-delete-dialog.component';
import { SucursalMySuffixService } from '../../../../../../main/webapp/app/entities/sucursal-my-suffix/sucursal-my-suffix.service';

describe('Component Tests', () => {

    describe('SucursalMySuffix Management Delete Component', () => {
        let comp: SucursalMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<SucursalMySuffixDeleteDialogComponent>;
        let service: SucursalMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [SucursalMySuffixDeleteDialogComponent],
                providers: [
                    SucursalMySuffixService
                ]
            })
            .overrideTemplate(SucursalMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SucursalMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SucursalMySuffixService);
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
