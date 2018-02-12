/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HaoTestModule } from '../../../test.module';
import { RepartidorMySuffixComponent } from '../../../../../../main/webapp/app/entities/repartidor-my-suffix/repartidor-my-suffix.component';
import { RepartidorMySuffixService } from '../../../../../../main/webapp/app/entities/repartidor-my-suffix/repartidor-my-suffix.service';
import { RepartidorMySuffix } from '../../../../../../main/webapp/app/entities/repartidor-my-suffix/repartidor-my-suffix.model';

describe('Component Tests', () => {

    describe('RepartidorMySuffix Management Component', () => {
        let comp: RepartidorMySuffixComponent;
        let fixture: ComponentFixture<RepartidorMySuffixComponent>;
        let service: RepartidorMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [RepartidorMySuffixComponent],
                providers: [
                    RepartidorMySuffixService
                ]
            })
            .overrideTemplate(RepartidorMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RepartidorMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RepartidorMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RepartidorMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.repartidors[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
