/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HaoTestModule } from '../../../test.module';
import { StockMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/stock-my-suffix/stock-my-suffix-detail.component';
import { StockMySuffixService } from '../../../../../../main/webapp/app/entities/stock-my-suffix/stock-my-suffix.service';
import { StockMySuffix } from '../../../../../../main/webapp/app/entities/stock-my-suffix/stock-my-suffix.model';

describe('Component Tests', () => {

    describe('StockMySuffix Management Detail Component', () => {
        let comp: StockMySuffixDetailComponent;
        let fixture: ComponentFixture<StockMySuffixDetailComponent>;
        let service: StockMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [StockMySuffixDetailComponent],
                providers: [
                    StockMySuffixService
                ]
            })
            .overrideTemplate(StockMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StockMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StockMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new StockMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.stock).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
