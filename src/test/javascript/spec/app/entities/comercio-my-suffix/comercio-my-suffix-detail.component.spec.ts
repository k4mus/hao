/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HaoTestModule } from '../../../test.module';
import { ComercioMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/comercio-my-suffix/comercio-my-suffix-detail.component';
import { ComercioMySuffixService } from '../../../../../../main/webapp/app/entities/comercio-my-suffix/comercio-my-suffix.service';
import { ComercioMySuffix } from '../../../../../../main/webapp/app/entities/comercio-my-suffix/comercio-my-suffix.model';

describe('Component Tests', () => {

    describe('ComercioMySuffix Management Detail Component', () => {
        let comp: ComercioMySuffixDetailComponent;
        let fixture: ComponentFixture<ComercioMySuffixDetailComponent>;
        let service: ComercioMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [ComercioMySuffixDetailComponent],
                providers: [
                    ComercioMySuffixService
                ]
            })
            .overrideTemplate(ComercioMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComercioMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComercioMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ComercioMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.comercio).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
