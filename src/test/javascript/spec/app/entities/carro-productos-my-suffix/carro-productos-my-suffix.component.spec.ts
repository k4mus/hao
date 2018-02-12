/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HaoTestModule } from '../../../test.module';
import { CarroProductosMySuffixComponent } from '../../../../../../main/webapp/app/entities/carro-productos-my-suffix/carro-productos-my-suffix.component';
import { CarroProductosMySuffixService } from '../../../../../../main/webapp/app/entities/carro-productos-my-suffix/carro-productos-my-suffix.service';
import { CarroProductosMySuffix } from '../../../../../../main/webapp/app/entities/carro-productos-my-suffix/carro-productos-my-suffix.model';

describe('Component Tests', () => {

    describe('CarroProductosMySuffix Management Component', () => {
        let comp: CarroProductosMySuffixComponent;
        let fixture: ComponentFixture<CarroProductosMySuffixComponent>;
        let service: CarroProductosMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [CarroProductosMySuffixComponent],
                providers: [
                    CarroProductosMySuffixService
                ]
            })
            .overrideTemplate(CarroProductosMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CarroProductosMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CarroProductosMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CarroProductosMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.carroProductos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
