/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HaoTestModule } from '../../../test.module';
import { MedioPagoMySuffixComponent } from '../../../../../../main/webapp/app/entities/medio-pago-my-suffix/medio-pago-my-suffix.component';
import { MedioPagoMySuffixService } from '../../../../../../main/webapp/app/entities/medio-pago-my-suffix/medio-pago-my-suffix.service';
import { MedioPagoMySuffix } from '../../../../../../main/webapp/app/entities/medio-pago-my-suffix/medio-pago-my-suffix.model';

describe('Component Tests', () => {

    describe('MedioPagoMySuffix Management Component', () => {
        let comp: MedioPagoMySuffixComponent;
        let fixture: ComponentFixture<MedioPagoMySuffixComponent>;
        let service: MedioPagoMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [MedioPagoMySuffixComponent],
                providers: [
                    MedioPagoMySuffixService
                ]
            })
            .overrideTemplate(MedioPagoMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MedioPagoMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedioPagoMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MedioPagoMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.medioPagos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
