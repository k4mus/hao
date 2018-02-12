/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HaoTestModule } from '../../../test.module';
import { StockProductoMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/stock-producto-my-suffix/stock-producto-my-suffix-delete-dialog.component';
import { StockProductoMySuffixService } from '../../../../../../main/webapp/app/entities/stock-producto-my-suffix/stock-producto-my-suffix.service';

describe('Component Tests', () => {

    describe('StockProductoMySuffix Management Delete Component', () => {
        let comp: StockProductoMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<StockProductoMySuffixDeleteDialogComponent>;
        let service: StockProductoMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [StockProductoMySuffixDeleteDialogComponent],
                providers: [
                    StockProductoMySuffixService
                ]
            })
            .overrideTemplate(StockProductoMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StockProductoMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StockProductoMySuffixService);
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
