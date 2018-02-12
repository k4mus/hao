/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HaoTestModule } from '../../../test.module';
import { SucursalMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/sucursal-my-suffix/sucursal-my-suffix-detail.component';
import { SucursalMySuffixService } from '../../../../../../main/webapp/app/entities/sucursal-my-suffix/sucursal-my-suffix.service';
import { SucursalMySuffix } from '../../../../../../main/webapp/app/entities/sucursal-my-suffix/sucursal-my-suffix.model';

describe('Component Tests', () => {

    describe('SucursalMySuffix Management Detail Component', () => {
        let comp: SucursalMySuffixDetailComponent;
        let fixture: ComponentFixture<SucursalMySuffixDetailComponent>;
        let service: SucursalMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [SucursalMySuffixDetailComponent],
                providers: [
                    SucursalMySuffixService
                ]
            })
            .overrideTemplate(SucursalMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SucursalMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SucursalMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SucursalMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.sucursal).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
