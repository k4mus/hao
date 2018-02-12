/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HaoTestModule } from '../../../test.module';
import { SucursalMySuffixComponent } from '../../../../../../main/webapp/app/entities/sucursal-my-suffix/sucursal-my-suffix.component';
import { SucursalMySuffixService } from '../../../../../../main/webapp/app/entities/sucursal-my-suffix/sucursal-my-suffix.service';
import { SucursalMySuffix } from '../../../../../../main/webapp/app/entities/sucursal-my-suffix/sucursal-my-suffix.model';

describe('Component Tests', () => {

    describe('SucursalMySuffix Management Component', () => {
        let comp: SucursalMySuffixComponent;
        let fixture: ComponentFixture<SucursalMySuffixComponent>;
        let service: SucursalMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [SucursalMySuffixComponent],
                providers: [
                    SucursalMySuffixService
                ]
            })
            .overrideTemplate(SucursalMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SucursalMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SucursalMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SucursalMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.sucursals[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
