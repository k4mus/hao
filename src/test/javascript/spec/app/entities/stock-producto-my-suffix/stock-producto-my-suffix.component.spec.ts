/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HaoTestModule } from '../../../test.module';
import { StockProductoMySuffixComponent } from '../../../../../../main/webapp/app/entities/stock-producto-my-suffix/stock-producto-my-suffix.component';
import { StockProductoMySuffixService } from '../../../../../../main/webapp/app/entities/stock-producto-my-suffix/stock-producto-my-suffix.service';
import { StockProductoMySuffix } from '../../../../../../main/webapp/app/entities/stock-producto-my-suffix/stock-producto-my-suffix.model';

describe('Component Tests', () => {

    describe('StockProductoMySuffix Management Component', () => {
        let comp: StockProductoMySuffixComponent;
        let fixture: ComponentFixture<StockProductoMySuffixComponent>;
        let service: StockProductoMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [StockProductoMySuffixComponent],
                providers: [
                    StockProductoMySuffixService
                ]
            })
            .overrideTemplate(StockProductoMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StockProductoMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StockProductoMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new StockProductoMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.stockProductos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
