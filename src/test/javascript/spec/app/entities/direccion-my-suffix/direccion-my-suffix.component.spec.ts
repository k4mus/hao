/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HaoTestModule } from '../../../test.module';
import { DireccionMySuffixComponent } from '../../../../../../main/webapp/app/entities/direccion-my-suffix/direccion-my-suffix.component';
import { DireccionMySuffixService } from '../../../../../../main/webapp/app/entities/direccion-my-suffix/direccion-my-suffix.service';
import { DireccionMySuffix } from '../../../../../../main/webapp/app/entities/direccion-my-suffix/direccion-my-suffix.model';

describe('Component Tests', () => {

    describe('DireccionMySuffix Management Component', () => {
        let comp: DireccionMySuffixComponent;
        let fixture: ComponentFixture<DireccionMySuffixComponent>;
        let service: DireccionMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [DireccionMySuffixComponent],
                providers: [
                    DireccionMySuffixService
                ]
            })
            .overrideTemplate(DireccionMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DireccionMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DireccionMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DireccionMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.direccions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
