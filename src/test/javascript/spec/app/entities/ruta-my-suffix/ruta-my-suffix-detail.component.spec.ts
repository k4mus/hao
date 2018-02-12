/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HaoTestModule } from '../../../test.module';
import { RutaMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/ruta-my-suffix/ruta-my-suffix-detail.component';
import { RutaMySuffixService } from '../../../../../../main/webapp/app/entities/ruta-my-suffix/ruta-my-suffix.service';
import { RutaMySuffix } from '../../../../../../main/webapp/app/entities/ruta-my-suffix/ruta-my-suffix.model';

describe('Component Tests', () => {

    describe('RutaMySuffix Management Detail Component', () => {
        let comp: RutaMySuffixDetailComponent;
        let fixture: ComponentFixture<RutaMySuffixDetailComponent>;
        let service: RutaMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [RutaMySuffixDetailComponent],
                providers: [
                    RutaMySuffixService
                ]
            })
            .overrideTemplate(RutaMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RutaMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RutaMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RutaMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ruta).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
