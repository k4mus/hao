/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HaoTestModule } from '../../../test.module';
import { StockMySuffixComponent } from '../../../../../../main/webapp/app/entities/stock-my-suffix/stock-my-suffix.component';
import { StockMySuffixService } from '../../../../../../main/webapp/app/entities/stock-my-suffix/stock-my-suffix.service';
import { StockMySuffix } from '../../../../../../main/webapp/app/entities/stock-my-suffix/stock-my-suffix.model';

describe('Component Tests', () => {

    describe('StockMySuffix Management Component', () => {
        let comp: StockMySuffixComponent;
        let fixture: ComponentFixture<StockMySuffixComponent>;
        let service: StockMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [StockMySuffixComponent],
                providers: [
                    StockMySuffixService
                ]
            })
            .overrideTemplate(StockMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StockMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StockMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new StockMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.stocks[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
