/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HaoTestModule } from '../../../test.module';
import { CarroMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/carro-my-suffix/carro-my-suffix-detail.component';
import { CarroMySuffixService } from '../../../../../../main/webapp/app/entities/carro-my-suffix/carro-my-suffix.service';
import { CarroMySuffix } from '../../../../../../main/webapp/app/entities/carro-my-suffix/carro-my-suffix.model';

describe('Component Tests', () => {

    describe('CarroMySuffix Management Detail Component', () => {
        let comp: CarroMySuffixDetailComponent;
        let fixture: ComponentFixture<CarroMySuffixDetailComponent>;
        let service: CarroMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [CarroMySuffixDetailComponent],
                providers: [
                    CarroMySuffixService
                ]
            })
            .overrideTemplate(CarroMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CarroMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CarroMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CarroMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.carro).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
