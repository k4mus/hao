/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HaoTestModule } from '../../../test.module';
import { MercadoMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/mercado-my-suffix/mercado-my-suffix-detail.component';
import { MercadoMySuffixService } from '../../../../../../main/webapp/app/entities/mercado-my-suffix/mercado-my-suffix.service';
import { MercadoMySuffix } from '../../../../../../main/webapp/app/entities/mercado-my-suffix/mercado-my-suffix.model';

describe('Component Tests', () => {

    describe('MercadoMySuffix Management Detail Component', () => {
        let comp: MercadoMySuffixDetailComponent;
        let fixture: ComponentFixture<MercadoMySuffixDetailComponent>;
        let service: MercadoMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [MercadoMySuffixDetailComponent],
                providers: [
                    MercadoMySuffixService
                ]
            })
            .overrideTemplate(MercadoMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MercadoMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MercadoMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MercadoMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.mercado).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
