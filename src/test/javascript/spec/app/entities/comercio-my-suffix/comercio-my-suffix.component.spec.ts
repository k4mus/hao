/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HaoTestModule } from '../../../test.module';
import { ComercioMySuffixComponent } from '../../../../../../main/webapp/app/entities/comercio-my-suffix/comercio-my-suffix.component';
import { ComercioMySuffixService } from '../../../../../../main/webapp/app/entities/comercio-my-suffix/comercio-my-suffix.service';
import { ComercioMySuffix } from '../../../../../../main/webapp/app/entities/comercio-my-suffix/comercio-my-suffix.model';

describe('Component Tests', () => {

    describe('ComercioMySuffix Management Component', () => {
        let comp: ComercioMySuffixComponent;
        let fixture: ComponentFixture<ComercioMySuffixComponent>;
        let service: ComercioMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [ComercioMySuffixComponent],
                providers: [
                    ComercioMySuffixService
                ]
            })
            .overrideTemplate(ComercioMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComercioMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComercioMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ComercioMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.comercios[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
