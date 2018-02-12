import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Direccion e2e test', () => {

    let navBarPage: NavBarPage;
    let direccionDialogPage: DireccionDialogPage;
    let direccionComponentsPage: DireccionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Direccions', () => {
        navBarPage.goToEntity('direccion-my-suffix');
        direccionComponentsPage = new DireccionComponentsPage();
        expect(direccionComponentsPage.getTitle())
            .toMatch(/Direccions/);

    });

    it('should load create Direccion dialog', () => {
        direccionComponentsPage.clickOnCreateButton();
        direccionDialogPage = new DireccionDialogPage();
        expect(direccionDialogPage.getModalTitle())
            .toMatch(/Create or edit a Direccion/);
        direccionDialogPage.close();
    });

    it('should create and save Direccions', () => {
        direccionComponentsPage.clickOnCreateButton();
        direccionDialogPage.setIdDireccionInput('5');
        expect(direccionDialogPage.getIdDireccionInput()).toMatch('5');
        direccionDialogPage.setUbicacionInput('ubicacion');
        expect(direccionDialogPage.getUbicacionInput()).toMatch('ubicacion');
        direccionDialogPage.setCalleInput('calle');
        expect(direccionDialogPage.getCalleInput()).toMatch('calle');
        direccionDialogPage.setNumeroInput('5');
        expect(direccionDialogPage.getNumeroInput()).toMatch('5');
        direccionDialogPage.setDptoInput('dpto');
        expect(direccionDialogPage.getDptoInput()).toMatch('dpto');
        direccionDialogPage.setPoblacionInput('poblacion');
        expect(direccionDialogPage.getPoblacionInput()).toMatch('poblacion');
        direccionDialogPage.setIdComunaInput('5');
        expect(direccionDialogPage.getIdComunaInput()).toMatch('5');
        direccionDialogPage.save();
        expect(direccionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class DireccionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-direccion-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class DireccionDialogPage {
    modalTitle = element(by.css('h4#myDireccionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idDireccionInput = element(by.css('input#field_idDireccion'));
    ubicacionInput = element(by.css('input#field_ubicacion'));
    calleInput = element(by.css('input#field_calle'));
    numeroInput = element(by.css('input#field_numero'));
    dptoInput = element(by.css('input#field_dpto'));
    poblacionInput = element(by.css('input#field_poblacion'));
    idComunaInput = element(by.css('input#field_idComuna'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setIdDireccionInput = function(idDireccion) {
        this.idDireccionInput.sendKeys(idDireccion);
    };

    getIdDireccionInput = function() {
        return this.idDireccionInput.getAttribute('value');
    };

    setUbicacionInput = function(ubicacion) {
        this.ubicacionInput.sendKeys(ubicacion);
    };

    getUbicacionInput = function() {
        return this.ubicacionInput.getAttribute('value');
    };

    setCalleInput = function(calle) {
        this.calleInput.sendKeys(calle);
    };

    getCalleInput = function() {
        return this.calleInput.getAttribute('value');
    };

    setNumeroInput = function(numero) {
        this.numeroInput.sendKeys(numero);
    };

    getNumeroInput = function() {
        return this.numeroInput.getAttribute('value');
    };

    setDptoInput = function(dpto) {
        this.dptoInput.sendKeys(dpto);
    };

    getDptoInput = function() {
        return this.dptoInput.getAttribute('value');
    };

    setPoblacionInput = function(poblacion) {
        this.poblacionInput.sendKeys(poblacion);
    };

    getPoblacionInput = function() {
        return this.poblacionInput.getAttribute('value');
    };

    setIdComunaInput = function(idComuna) {
        this.idComunaInput.sendKeys(idComuna);
    };

    getIdComunaInput = function() {
        return this.idComunaInput.getAttribute('value');
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
