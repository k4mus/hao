/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HaoTestModule } from '../../../test.module';
import { VehiculoMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/vehiculo-my-suffix/vehiculo-my-suffix-detail.component';
import { VehiculoMySuffixService } from '../../../../../../main/webapp/app/entities/vehiculo-my-suffix/vehiculo-my-suffix.service';
import { VehiculoMySuffix } from '../../../../../../main/webapp/app/entities/vehiculo-my-suffix/vehiculo-my-suffix.model';

describe('Component Tests', () => {

    describe('VehiculoMySuffix Management Detail Component', () => {
        let comp: VehiculoMySuffixDetailComponent;
        let fixture: ComponentFixture<VehiculoMySuffixDetailComponent>;
        let service: VehiculoMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [VehiculoMySuffixDetailComponent],
                providers: [
                    VehiculoMySuffixService
                ]
            })
            .overrideTemplate(VehiculoMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VehiculoMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehiculoMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new VehiculoMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.vehiculo).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
