import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ListaEntregaMySuffix } from './lista-entrega-my-suffix.model';
import { ListaEntregaMySuffixService } from './lista-entrega-my-suffix.service';

@Injectable()
export class ListaEntregaMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private listaEntregaService: ListaEntregaMySuffixService

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
                this.listaEntregaService.find(id)
                    .subscribe((listaEntregaResponse: HttpResponse<ListaEntregaMySuffix>) => {
                        const listaEntrega: ListaEntregaMySuffix = listaEntregaResponse.body;
                        this.ngbModalRef = this.listaEntregaModalRef(component, listaEntrega);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.listaEntregaModalRef(component, new ListaEntregaMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    listaEntregaModalRef(component: Component, listaEntrega: ListaEntregaMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.listaEntrega = listaEntrega;
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
