import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { VehiculoMySuffix } from './vehiculo-my-suffix.model';
import { VehiculoMySuffixService } from './vehiculo-my-suffix.service';

@Injectable()
export class VehiculoMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private vehiculoService: VehiculoMySuffixService

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
                this.vehiculoService.find(id)
                    .subscribe((vehiculoResponse: HttpResponse<VehiculoMySuffix>) => {
                        const vehiculo: VehiculoMySuffix = vehiculoResponse.body;
                        this.ngbModalRef = this.vehiculoModalRef(component, vehiculo);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.vehiculoModalRef(component, new VehiculoMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    vehiculoModalRef(component: Component, vehiculo: VehiculoMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.vehiculo = vehiculo;
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
