import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Mercado e2e test', () => {

    let navBarPage: NavBarPage;
    let mercadoDialogPage: MercadoDialogPage;
    let mercadoComponentsPage: MercadoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Mercados', () => {
        navBarPage.goToEntity('mercado-my-suffix');
        mercadoComponentsPage = new MercadoComponentsPage();
        expect(mercadoComponentsPage.getTitle())
            .toMatch(/Mercados/);

    });

    it('should load create Mercado dialog', () => {
        mercadoComponentsPage.clickOnCreateButton();
        mercadoDialogPage = new MercadoDialogPage();
        expect(mercadoDialogPage.getModalTitle())
            .toMatch(/Create or edit a Mercado/);
        mercadoDialogPage.close();
    });

    it('should create and save Mercados', () => {
        mercadoComponentsPage.clickOnCreateButton();
        mercadoDialogPage.setIdMercadoInput('5');
        expect(mercadoDialogPage.getIdMercadoInput()).toMatch('5');
        mercadoDialogPage.setNombreMercadoInput('nombreMercado');
        expect(mercadoDialogPage.getNombreMercadoInput()).toMatch('nombreMercado');
        mercadoDialogPage.setUbicacionInput('ubicacion');
        expect(mercadoDialogPage.getUbicacionInput()).toMatch('ubicacion');
        mercadoDialogPage.sucursalSelectLastOption();
        mercadoDialogPage.carroSelectLastOption();
        mercadoDialogPage.save();
        expect(mercadoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class MercadoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-mercado-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class MercadoDialogPage {
    modalTitle = element(by.css('h4#myMercadoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idMercadoInput = element(by.css('input#field_idMercado'));
    nombreMercadoInput = element(by.css('input#field_nombreMercado'));
    ubicacionInput = element(by.css('input#field_ubicacion'));
    sucursalSelect = element(by.css('select#field_sucursal'));
    carroSelect = element(by.css('select#field_carro'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setIdMercadoInput = function(idMercado) {
        this.idMercadoInput.sendKeys(idMercado);
    };

    getIdMercadoInput = function() {
        return this.idMercadoInput.getAttribute('value');
    };

    setNombreMercadoInput = function(nombreMercado) {
        this.nombreMercadoInput.sendKeys(nombreMercado);
    };

    getNombreMercadoInput = function() {
        return this.nombreMercadoInput.getAttribute('value');
    };

    setUbicacionInput = function(ubicacion) {
        this.ubicacionInput.sendKeys(ubicacion);
    };

    getUbicacionInput = function() {
        return this.ubicacionInput.getAttribute('value');
    };

    sucursalSelectLastOption = function() {
        this.sucursalSelect.all(by.tagName('option')).last().click();
    };

    sucursalSelectOption = function(option) {
        this.sucursalSelect.sendKeys(option);
    };

    getSucursalSelect = function() {
        return this.sucursalSelect;
    };

    getSucursalSelectedOption = function() {
        return this.sucursalSelect.element(by.css('option:checked')).getText();
    };

    carroSelectLastOption = function() {
        this.carroSelect.all(by.tagName('option')).last().click();
    };

    carroSelectOption = function(option) {
        this.carroSelect.sendKeys(option);
    };

    getCarroSelect = function() {
        return this.carroSelect;
    };

    getCarroSelectedOption = function() {
        return this.carroSelect.element(by.css('option:checked')).getText();
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
