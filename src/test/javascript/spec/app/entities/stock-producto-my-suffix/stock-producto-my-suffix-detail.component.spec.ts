/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HaoTestModule } from '../../../test.module';
import { StockProductoMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/stock-producto-my-suffix/stock-producto-my-suffix-detail.component';
import { StockProductoMySuffixService } from '../../../../../../main/webapp/app/entities/stock-producto-my-suffix/stock-producto-my-suffix.service';
import { StockProductoMySuffix } from '../../../../../../main/webapp/app/entities/stock-producto-my-suffix/stock-producto-my-suffix.model';

describe('Component Tests', () => {

    describe('StockProductoMySuffix Management Detail Component', () => {
        let comp: StockProductoMySuffixDetailComponent;
        let fixture: ComponentFixture<StockProductoMySuffixDetailComponent>;
        let service: StockProductoMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [StockProductoMySuffixDetailComponent],
                providers: [
                    StockProductoMySuffixService
                ]
            })
            .overrideTemplate(StockProductoMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StockProductoMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StockProductoMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new StockProductoMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.stockProducto).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
