import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ListaEntrega e2e test', () => {

    let navBarPage: NavBarPage;
    let listaEntregaDialogPage: ListaEntregaDialogPage;
    let listaEntregaComponentsPage: ListaEntregaComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ListaEntregas', () => {
        navBarPage.goToEntity('lista-entrega-my-suffix');
        listaEntregaComponentsPage = new ListaEntregaComponentsPage();
        expect(listaEntregaComponentsPage.getTitle())
            .toMatch(/Lista Entregas/);

    });

    it('should load create ListaEntrega dialog', () => {
        listaEntregaComponentsPage.clickOnCreateButton();
        listaEntregaDialogPage = new ListaEntregaDialogPage();
        expect(listaEntregaDialogPage.getModalTitle())
            .toMatch(/Create or edit a Lista Entrega/);
        listaEntregaDialogPage.close();
    });

    it('should create and save ListaEntregas', () => {
        listaEntregaComponentsPage.clickOnCreateButton();
        listaEntregaDialogPage.setIdListaEntregaInput('5');
        expect(listaEntregaDialogPage.getIdListaEntregaInput()).toMatch('5');
        listaEntregaDialogPage.setIdCarroInput('5');
        expect(listaEntregaDialogPage.getIdCarroInput()).toMatch('5');
        listaEntregaDialogPage.setUnbicacionInput('unbicacion');
        expect(listaEntregaDialogPage.getUnbicacionInput()).toMatch('unbicacion');
        listaEntregaDialogPage.save();
        expect(listaEntregaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ListaEntregaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-lista-entrega-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class ListaEntregaDialogPage {
    modalTitle = element(by.css('h4#myListaEntregaLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idListaEntregaInput = element(by.css('input#field_idListaEntrega'));
    idCarroInput = element(by.css('input#field_idCarro'));
    unbicacionInput = element(by.css('input#field_unbicacion'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setIdListaEntregaInput = function(idListaEntrega) {
        this.idListaEntregaInput.sendKeys(idListaEntrega);
    };

    getIdListaEntregaInput = function() {
        return this.idListaEntregaInput.getAttribute('value');
    };

    setIdCarroInput = function(idCarro) {
        this.idCarroInput.sendKeys(idCarro);
    };

    getIdCarroInput = function() {
        return this.idCarroInput.getAttribute('value');
    };

    setUnbicacionInput = function(unbicacion) {
        this.unbicacionInput.sendKeys(unbicacion);
    };

    getUnbicacionInput = function() {
        return this.unbicacionInput.getAttribute('value');
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
