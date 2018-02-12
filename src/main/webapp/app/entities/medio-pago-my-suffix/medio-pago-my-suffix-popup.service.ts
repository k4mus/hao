import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { MedioPagoMySuffix } from './medio-pago-my-suffix.model';
import { MedioPagoMySuffixService } from './medio-pago-my-suffix.service';

@Injectable()
export class MedioPagoMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private medioPagoService: MedioPagoMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.medioPagoService.find(id)
                    .subscribe((medioPagoResponse: HttpResponse<MedioPagoMySuffix>) => {
                        const medioPago: MedioPagoMySuffix = medioPagoResponse.body;
                        this.ngbModalRef = this.medioPagoModalRef(component, medioPago);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.medioPagoModalRef(component, new MedioPagoMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    medioPagoModalRef(component: Component, medioPago: MedioPagoMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.medioPago = medioPago;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
