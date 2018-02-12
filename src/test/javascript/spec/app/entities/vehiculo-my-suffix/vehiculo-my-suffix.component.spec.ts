/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HaoTestModule } from '../../../test.module';
import { VehiculoMySuffixComponent } from '../../../../../../main/webapp/app/entities/vehiculo-my-suffix/vehiculo-my-suffix.component';
import { VehiculoMySuffixService } from '../../../../../../main/webapp/app/entities/vehiculo-my-suffix/vehiculo-my-suffix.service';
import { VehiculoMySuffix } from '../../../../../../main/webapp/app/entities/vehiculo-my-suffix/vehiculo-my-suffix.model';

describe('Component Tests', () => {

    describe('VehiculoMySuffix Management Component', () => {
        let comp: VehiculoMySuffixComponent;
        let fixture: ComponentFixture<VehiculoMySuffixComponent>;
        let service: VehiculoMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [VehiculoMySuffixComponent],
                providers: [
                    VehiculoMySuffixService
                ]
            })
            .overrideTemplate(VehiculoMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VehiculoMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehiculoMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new VehiculoMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.vehiculos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
