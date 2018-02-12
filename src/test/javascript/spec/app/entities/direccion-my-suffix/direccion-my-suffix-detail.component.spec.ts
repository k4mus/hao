/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HaoTestModule } from '../../../test.module';
import { DireccionMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/direccion-my-suffix/direccion-my-suffix-detail.component';
import { DireccionMySuffixService } from '../../../../../../main/webapp/app/entities/direccion-my-suffix/direccion-my-suffix.service';
import { DireccionMySuffix } from '../../../../../../main/webapp/app/entities/direccion-my-suffix/direccion-my-suffix.model';

describe('Component Tests', () => {

    describe('DireccionMySuffix Management Detail Component', () => {
        let comp: DireccionMySuffixDetailComponent;
        let fixture: ComponentFixture<DireccionMySuffixDetailComponent>;
        let service: DireccionMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [DireccionMySuffixDetailComponent],
                providers: [
                    DireccionMySuffixService
                ]
            })
            .overrideTemplate(DireccionMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DireccionMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DireccionMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DireccionMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.direccion).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
