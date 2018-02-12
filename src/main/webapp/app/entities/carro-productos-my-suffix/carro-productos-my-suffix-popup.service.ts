import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CarroProductosMySuffix } from './carro-productos-my-suffix.model';
import { CarroProductosMySuffixService } from './carro-productos-my-suffix.service';

@Injectable()
export class CarroProductosMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private carroProductosService: CarroProductosMySuffixService

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
                this.carroProductosService.find(id)
                    .subscribe((carroProductosResponse: HttpResponse<CarroProductosMySuffix>) => {
                        const carroProductos: CarroProductosMySuffix = carroProductosResponse.body;
                        this.ngbModalRef = this.carroProductosModalRef(component, carroProductos);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.carroProductosModalRef(component, new CarroProductosMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    carroProductosModalRef(component: Component, carroProductos: CarroProductosMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.carroProductos = carroProductos;
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
