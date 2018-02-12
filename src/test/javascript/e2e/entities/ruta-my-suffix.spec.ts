import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Ruta e2e test', () => {

    let navBarPage: NavBarPage;
    let rutaDialogPage: RutaDialogPage;
    let rutaComponentsPage: RutaComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Rutas', () => {
        navBarPage.goToEntity('ruta-my-suffix');
        rutaComponentsPage = new RutaComponentsPage();
        expect(rutaComponentsPage.getTitle())
            .toMatch(/Rutas/);

    });

    it('should load create Ruta dialog', () => {
        rutaComponentsPage.clickOnCreateButton();
        rutaDialogPage = new RutaDialogPage();
        expect(rutaDialogPage.getModalTitle())
            .toMatch(/Create or edit a Ruta/);
        rutaDialogPage.close();
    });

    it('should create and save Rutas', () => {
        rutaComponentsPage.clickOnCreateButton();
        rutaDialogPage.setIdRutaInput('5');
        expect(rutaDialogPage.getIdRutaInput()).toMatch('5');
        rutaDialogPage.setNombreRutaInput('5');
        expect(rutaDialogPage.getNombreRutaInput()).toMatch('5');
        rutaDialogPage.setUbicacionOrigenInput('ubicacionOrigen');
        expect(rutaDialogPage.getUbicacionOrigenInput()).toMatch('ubicacionOrigen');
        rutaDialogPage.setUbicacionDestinoInput('ubicacionDestino');
        expect(rutaDialogPage.getUbicacionDestinoInput()).toMatch('ubicacionDestino');
        rutaDialogPage.entregaSelectLastOption();
        rutaDialogPage.save();
        expect(rutaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RutaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-ruta-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class RutaDialogPage {
    modalTitle = element(by.css('h4#myRutaLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idRutaInput = element(by.css('input#field_idRuta'));
    nombreRutaInput = element(by.css('input#field_nombreRuta'));
    ubicacionOrigenInput = element(by.css('input#field_ubicacionOrigen'));
    ubicacionDestinoInput = element(by.css('input#field_ubicacionDestino'));
    entregaSelect = element(by.css('select#field_entrega'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setIdRutaInput = function(idRuta) {
        this.idRutaInput.sendKeys(idRuta);
    };

    getIdRutaInput = function() {
        return this.idRutaInput.getAttribute('value');
    };

    setNombreRutaInput = function(nombreRuta) {
        this.nombreRutaInput.sendKeys(nombreRuta);
    };

    getNombreRutaInput = function() {
        return this.nombreRutaInput.getAttribute('value');
    };

    setUbicacionOrigenInput = function(ubicacionOrigen) {
        this.ubicacionOrigenInput.sendKeys(ubicacionOrigen);
    };

    getUbicacionOrigenInput = function() {
        return this.ubicacionOrigenInput.getAttribute('value');
    };

    setUbicacionDestinoInput = function(ubicacionDestino) {
        this.ubicacionDestinoInput.sendKeys(ubicacionDestino);
    };

    getUbicacionDestinoInput = function() {
        return this.ubicacionDestinoInput.getAttribute('value');
    };

    entregaSelectLastOption = function() {
        this.entregaSelect.all(by.tagName('option')).last().click();
    };

    entregaSelectOption = function(option) {
        this.entregaSelect.sendKeys(option);
    };

    getEntregaSelect = function() {
        return this.entregaSelect;
    };

    getEntregaSelectedOption = function() {
        return this.entregaSelect.element(by.css('option:checked')).getText();
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
