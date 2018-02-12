/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HaoTestModule } from '../../../test.module';
import { EntregaMySuffixComponent } from '../../../../../../main/webapp/app/entities/entrega-my-suffix/entrega-my-suffix.component';
import { EntregaMySuffixService } from '../../../../../../main/webapp/app/entities/entrega-my-suffix/entrega-my-suffix.service';
import { EntregaMySuffix } from '../../../../../../main/webapp/app/entities/entrega-my-suffix/entrega-my-suffix.model';

describe('Component Tests', () => {

    describe('EntregaMySuffix Management Component', () => {
        let comp: EntregaMySuffixComponent;
        let fixture: ComponentFixture<EntregaMySuffixComponent>;
        let service: EntregaMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [EntregaMySuffixComponent],
                providers: [
                    EntregaMySuffixService
                ]
            })
            .overrideTemplate(EntregaMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntregaMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntregaMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new EntregaMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.entregas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
