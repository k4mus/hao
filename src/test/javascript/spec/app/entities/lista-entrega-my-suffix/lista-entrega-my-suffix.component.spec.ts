/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HaoTestModule } from '../../../test.module';
import { ListaEntregaMySuffixComponent } from '../../../../../../main/webapp/app/entities/lista-entrega-my-suffix/lista-entrega-my-suffix.component';
import { ListaEntregaMySuffixService } from '../../../../../../main/webapp/app/entities/lista-entrega-my-suffix/lista-entrega-my-suffix.service';
import { ListaEntregaMySuffix } from '../../../../../../main/webapp/app/entities/lista-entrega-my-suffix/lista-entrega-my-suffix.model';

describe('Component Tests', () => {

    describe('ListaEntregaMySuffix Management Component', () => {
        let comp: ListaEntregaMySuffixComponent;
        let fixture: ComponentFixture<ListaEntregaMySuffixComponent>;
        let service: ListaEntregaMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [ListaEntregaMySuffixComponent],
                providers: [
                    ListaEntregaMySuffixService
                ]
            })
            .overrideTemplate(ListaEntregaMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ListaEntregaMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ListaEntregaMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ListaEntregaMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.listaEntregas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
