/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HaoTestModule } from '../../../test.module';
import { RepartidorMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/repartidor-my-suffix/repartidor-my-suffix-detail.component';
import { RepartidorMySuffixService } from '../../../../../../main/webapp/app/entities/repartidor-my-suffix/repartidor-my-suffix.service';
import { RepartidorMySuffix } from '../../../../../../main/webapp/app/entities/repartidor-my-suffix/repartidor-my-suffix.model';

describe('Component Tests', () => {

    describe('RepartidorMySuffix Management Detail Component', () => {
        let comp: RepartidorMySuffixDetailComponent;
        let fixture: ComponentFixture<RepartidorMySuffixDetailComponent>;
        let service: RepartidorMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [RepartidorMySuffixDetailComponent],
                providers: [
                    RepartidorMySuffixService
                ]
            })
            .overrideTemplate(RepartidorMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RepartidorMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RepartidorMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RepartidorMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.repartidor).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
