/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HaoTestModule } from '../../../test.module';
import { CarroProductosMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/carro-productos-my-suffix/carro-productos-my-suffix-detail.component';
import { CarroProductosMySuffixService } from '../../../../../../main/webapp/app/entities/carro-productos-my-suffix/carro-productos-my-suffix.service';
import { CarroProductosMySuffix } from '../../../../../../main/webapp/app/entities/carro-productos-my-suffix/carro-productos-my-suffix.model';

describe('Component Tests', () => {

    describe('CarroProductosMySuffix Management Detail Component', () => {
        let comp: CarroProductosMySuffixDetailComponent;
        let fixture: ComponentFixture<CarroProductosMySuffixDetailComponent>;
        let service: CarroProductosMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [CarroProductosMySuffixDetailComponent],
                providers: [
                    CarroProductosMySuffixService
                ]
            })
            .overrideTemplate(CarroProductosMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CarroProductosMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CarroProductosMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CarroProductosMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.carroProductos).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
