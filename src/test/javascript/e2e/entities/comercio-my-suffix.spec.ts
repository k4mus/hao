import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Comercio e2e test', () => {

    let navBarPage: NavBarPage;
    let comercioDialogPage: ComercioDialogPage;
    let comercioComponentsPage: ComercioComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Comercios', () => {
        navBarPage.goToEntity('comercio-my-suffix');
        comercioComponentsPage = new ComercioComponentsPage();
        expect(comercioComponentsPage.getTitle())
            .toMatch(/Comercios/);

    });

    it('should load create Comercio dialog', () => {
        comercioComponentsPage.clickOnCreateButton();
        comercioDialogPage = new ComercioDialogPage();
        expect(comercioDialogPage.getModalTitle())
            .toMatch(/Create or edit a Comercio/);
        comercioDialogPage.close();
    });

    it('should create and save Comercios', () => {
        comercioComponentsPage.clickOnCreateButton();
        comercioDialogPage.setIdComercioInput('5');
        expect(comercioDialogPage.getIdComercioInput()).toMatch('5');
        comercioDialogPage.setNombreComercioInput('nombreComercio');
        expect(comercioDialogPage.getNombreComercioInput()).toMatch('nombreComercio');
        comercioDialogPage.setIdUsuarioInput('5');
        expect(comercioDialogPage.getIdUsuarioInput()).toMatch('5');
        comercioDialogPage.setIdDireccionInput('5');
        expect(comercioDialogPage.getIdDireccionInput()).toMatch('5');
        comercioDialogPage.sucursalSelectLastOption();
        comercioDialogPage.save();
        expect(comercioDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ComercioComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-comercio-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class ComercioDialogPage {
    modalTitle = element(by.css('h4#myComercioLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idComercioInput = element(by.css('input#field_idComercio'));
    nombreComercioInput = element(by.css('input#field_nombreComercio'));
    idUsuarioInput = element(by.css('input#field_idUsuario'));
    idDireccionInput = element(by.css('input#field_idDireccion'));
    sucursalSelect = element(by.css('select#field_sucursal'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setIdComercioInput = function(idComercio) {
        this.idComercioInput.sendKeys(idComercio);
    };

    getIdComercioInput = function() {
        return this.idComercioInput.getAttribute('value');
    };

    setNombreComercioInput = function(nombreComercio) {
        this.nombreComercioInput.sendKeys(nombreComercio);
    };

    getNombreComercioInput = function() {
        return this.nombreComercioInput.getAttribute('value');
    };

    setIdUsuarioInput = function(idUsuario) {
        this.idUsuarioInput.sendKeys(idUsuario);
    };

    getIdUsuarioInput = function() {
        return this.idUsuarioInput.getAttribute('value');
    };

    setIdDireccionInput = function(idDireccion) {
        this.idDireccionInput.sendKeys(idDireccion);
    };

    getIdDireccionInput = function() {
        return this.idDireccionInput.getAttribute('value');
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
