/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HaoTestModule } from '../../../test.module';
import { EntregaMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/entrega-my-suffix/entrega-my-suffix-detail.component';
import { EntregaMySuffixService } from '../../../../../../main/webapp/app/entities/entrega-my-suffix/entrega-my-suffix.service';
import { EntregaMySuffix } from '../../../../../../main/webapp/app/entities/entrega-my-suffix/entrega-my-suffix.model';

describe('Component Tests', () => {

    describe('EntregaMySuffix Management Detail Component', () => {
        let comp: EntregaMySuffixDetailComponent;
        let fixture: ComponentFixture<EntregaMySuffixDetailComponent>;
        let service: EntregaMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HaoTestModule],
                declarations: [EntregaMySuffixDetailComponent],
                providers: [
                    EntregaMySuffixService
                ]
            })
            .overrideTemplate(EntregaMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntregaMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntregaMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new EntregaMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.entrega).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
