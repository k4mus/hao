/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HaoTestModule } from '../../../test.module';
import { CarroProductosMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/carro-productos-my-suffix/carro-productos-my-suffix-delete-dialog.component';
import { CarroProductosMySuffixService } from '../../../../../../main/webapp/app/entities/carro-productos-my-suffix/carro-productos-my-suffix.service';

describe('Component Tests', () => {

    describe('CarroProductosMySuffix Management Delete Component', () => {
        let comp: CarroProductosMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<CarroProductosMySuffixDeleteDialogComponent>;
        let service: CarroProductosMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [CarroProductosMySuffixDeleteDialogComponent],
                providers: [
                    CarroProductosMySuffixService
                ]
            })
            .overrideTemplate(CarroProductosMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CarroProductosMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CarroProductosMySuffixService);
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
