/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HaoTestModule } from '../../../test.module';
import { CarroMySuffixComponent } from '../../../../../../main/webapp/app/entities/carro-my-suffix/carro-my-suffix.component';
import { CarroMySuffixService } from '../../../../../../main/webapp/app/entities/carro-my-suffix/carro-my-suffix.service';
import { CarroMySuffix } from '../../../../../../main/webapp/app/entities/carro-my-suffix/carro-my-suffix.model';

describe('Component Tests', () => {

    describe('CarroMySuffix Management Component', () => {
        let comp: CarroMySuffixComponent;
        let fixture: ComponentFixture<CarroMySuffixComponent>;
        let service: CarroMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [CarroMySuffixComponent],
                providers: [
                    CarroMySuffixService
                ]
            })
            .overrideTemplate(CarroMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CarroMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CarroMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CarroMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.carros[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
