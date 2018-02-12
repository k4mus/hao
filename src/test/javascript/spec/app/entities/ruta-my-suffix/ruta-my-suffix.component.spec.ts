/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HaoTestModule } from '../../../test.module';
import { RutaMySuffixComponent } from '../../../../../../main/webapp/app/entities/ruta-my-suffix/ruta-my-suffix.component';
import { RutaMySuffixService } from '../../../../../../main/webapp/app/entities/ruta-my-suffix/ruta-my-suffix.service';
import { RutaMySuffix } from '../../../../../../main/webapp/app/entities/ruta-my-suffix/ruta-my-suffix.model';

describe('Component Tests', () => {

    describe('RutaMySuffix Management Component', () => {
        let comp: RutaMySuffixComponent;
        let fixture: ComponentFixture<RutaMySuffixComponent>;
        let service: RutaMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [RutaMySuffixComponent],
                providers: [
                    RutaMySuffixService
                ]
            })
            .overrideTemplate(RutaMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RutaMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RutaMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RutaMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.rutas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
