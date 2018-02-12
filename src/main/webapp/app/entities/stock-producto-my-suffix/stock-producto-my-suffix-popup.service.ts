import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { StockProductoMySuffix } from './stock-producto-my-suffix.model';
import { StockProductoMySuffixService } from './stock-producto-my-suffix.service';

@Injectable()
export class StockProductoMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private stockProductoService: StockProductoMySuffixService

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
                this.stockProductoService.find(id)
                    .subscribe((stockProductoResponse: HttpResponse<StockProductoMySuffix>) => {
                        const stockProducto: StockProductoMySuffix = stockProductoResponse.body;
                        this.ngbModalRef = this.stockProductoModalRef(component, stockProducto);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.stockProductoModalRef(component, new StockProductoMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    stockProductoModalRef(component: Component, stockProducto: StockProductoMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.stockProducto = stockProducto;
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
