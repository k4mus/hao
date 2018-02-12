/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HaoTestModule } from '../../../test.module';
import { MercadoMySuffixComponent } from '../../../../../../main/webapp/app/entities/mercado-my-suffix/mercado-my-suffix.component';
import { MercadoMySuffixService } from '../../../../../../main/webapp/app/entities/mercado-my-suffix/mercado-my-suffix.service';
import { MercadoMySuffix } from '../../../../../../main/webapp/app/entities/mercado-my-suffix/mercado-my-suffix.model';

describe('Component Tests', () => {

    describe('MercadoMySuffix Management Component', () => {
        let comp: MercadoMySuffixComponent;
        let fixture: ComponentFixture<MercadoMySuffixComponent>;
        let service: MercadoMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [MercadoMySuffixComponent],
                providers: [
                    MercadoMySuffixService
                ]
            })
            .overrideTemplate(MercadoMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MercadoMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MercadoMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MercadoMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.mercados[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
