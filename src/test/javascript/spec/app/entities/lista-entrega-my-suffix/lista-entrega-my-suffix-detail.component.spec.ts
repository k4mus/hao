/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HaoTestModule } from '../../../test.module';
import { ListaEntregaMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/lista-entrega-my-suffix/lista-entrega-my-suffix-detail.component';
import { ListaEntregaMySuffixService } from '../../../../../../main/webapp/app/entities/lista-entrega-my-suffix/lista-entrega-my-suffix.service';
import { ListaEntregaMySuffix } from '../../../../../../main/webapp/app/entities/lista-entrega-my-suffix/lista-entrega-my-suffix.model';

describe('Component Tests', () => {

    describe('ListaEntregaMySuffix Management Detail Component', () => {
        let comp: ListaEntregaMySuffixDetailComponent;
        let fixture: ComponentFixture<ListaEntregaMySuffixDetailComponent>;
        let service: ListaEntregaMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [ListaEntregaMySuffixDetailComponent],
                providers: [
                    ListaEntregaMySuffixService
                ]
            })
            .overrideTemplate(ListaEntregaMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ListaEntregaMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ListaEntregaMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ListaEntregaMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.listaEntrega).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
