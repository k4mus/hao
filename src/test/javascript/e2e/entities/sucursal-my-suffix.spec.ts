import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Sucursal e2e test', () => {

    let navBarPage: NavBarPage;
    let sucursalDialogPage: SucursalDialogPage;
    let sucursalComponentsPage: SucursalComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Sucursals', () => {
        navBarPage.goToEntity('sucursal-my-suffix');
        sucursalComponentsPage = new SucursalComponentsPage();
        expect(sucursalComponentsPage.getTitle())
            .toMatch(/Sucursals/);

    });

    it('should load create Sucursal dialog', () => {
        sucursalComponentsPage.clickOnCreateButton();
        sucursalDialogPage = new SucursalDialogPage();
        expect(sucursalDialogPage.getModalTitle())
            .toMatch(/Create or edit a Sucursal/);
        sucursalDialogPage.close();
    });

    it('should create and save Sucursals', () => {
        sucursalComponentsPage.clickOnCreateButton();
        sucursalDialogPage.setIdSucursalInput('5');
        expect(sucursalDialogPage.getIdSucursalInput()).toMatch('5');
        sucursalDialogPage.setNombreSucursalInput('nombreSucursal');
        expect(sucursalDialogPage.getNombreSucursalInput()).toMatch('nombreSucursal');
        sucursalDialogPage.setIdComercioInput('5');
        expect(sucursalDialogPage.getIdComercioInput()).toMatch('5');
        sucursalDialogPage.setIdMercadoInput('5');
        expect(sucursalDialogPage.getIdMercadoInput()).toMatch('5');
        sucursalDialogPage.stockSelectLastOption();
        sucursalDialogPage.save();
        expect(sucursalDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SucursalComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-sucursal-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class SucursalDialogPage {
    modalTitle = element(by.css('h4#mySucursalLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idSucursalInput = element(by.css('input#field_idSucursal'));
    nombreSucursalInput = element(by.css('input#field_nombreSucursal'));
    idComercioInput = element(by.css('input#field_idComercio'));
    idMercadoInput = element(by.css('input#field_idMercado'));
    stockSelect = element(by.css('select#field_stock'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setIdSucursalInput = function(idSucursal) {
        this.idSucursalInput.sendKeys(idSucursal);
    };

    getIdSucursalInput = function() {
        return this.idSucursalInput.getAttribute('value');
    };

    setNombreSucursalInput = function(nombreSucursal) {
        this.nombreSucursalInput.sendKeys(nombreSucursal);
    };

    getNombreSucursalInput = function() {
        return this.nombreSucursalInput.getAttribute('value');
    };

    setIdComercioInput = function(idComercio) {
        this.idComercioInput.sendKeys(idComercio);
    };

    getIdComercioInput = function() {
        return this.idComercioInput.getAttribute('value');
    };

    setIdMercadoInput = function(idMercado) {
        this.idMercadoInput.sendKeys(idMercado);
    };

    getIdMercadoInput = function() {
        return this.idMercadoInput.getAttribute('value');
    };

    stockSelectLastOption = function() {
        this.stockSelect.all(by.tagName('option')).last().click();
    };

    stockSelectOption = function(option) {
        this.stockSelect.sendKeys(option);
    };

    getStockSelect = function() {
        return this.stockSelect;
    };

    getStockSelectedOption = function() {
        return this.stockSelect.element(by.css('option:checked')).getText();
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
