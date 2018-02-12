import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Usuario e2e test', () => {

    let navBarPage: NavBarPage;
    let usuarioDialogPage: UsuarioDialogPage;
    let usuarioComponentsPage: UsuarioComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Usuarios', () => {
        navBarPage.goToEntity('usuario-my-suffix');
        usuarioComponentsPage = new UsuarioComponentsPage();
        expect(usuarioComponentsPage.getTitle())
            .toMatch(/Usuarios/);

    });

    it('should load create Usuario dialog', () => {
        usuarioComponentsPage.clickOnCreateButton();
        usuarioDialogPage = new UsuarioDialogPage();
        expect(usuarioDialogPage.getModalTitle())
            .toMatch(/Create or edit a Usuario/);
        usuarioDialogPage.close();
    });

    it('should create and save Usuarios', () => {
        usuarioComponentsPage.clickOnCreateButton();
        usuarioDialogPage.setIdUsuarioInput('5');
        expect(usuarioDialogPage.getIdUsuarioInput()).toMatch('5');
        usuarioDialogPage.setNombreUsuarioInput('nombreUsuario');
        expect(usuarioDialogPage.getNombreUsuarioInput()).toMatch('nombreUsuario');
        usuarioDialogPage.clienteSelectLastOption();
        usuarioDialogPage.comercioSelectLastOption();
        usuarioDialogPage.repartidorSelectLastOption();
        usuarioDialogPage.save();
        expect(usuarioDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class UsuarioComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-usuario-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class UsuarioDialogPage {
    modalTitle = element(by.css('h4#myUsuarioLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idUsuarioInput = element(by.css('input#field_idUsuario'));
    nombreUsuarioInput = element(by.css('input#field_nombreUsuario'));
    clienteSelect = element(by.css('select#field_cliente'));
    comercioSelect = element(by.css('select#field_comercio'));
    repartidorSelect = element(by.css('select#field_repartidor'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setIdUsuarioInput = function(idUsuario) {
        this.idUsuarioInput.sendKeys(idUsuario);
    };

    getIdUsuarioInput = function() {
        return this.idUsuarioInput.getAttribute('value');
    };

    setNombreUsuarioInput = function(nombreUsuario) {
        this.nombreUsuarioInput.sendKeys(nombreUsuario);
    };

    getNombreUsuarioInput = function() {
        return this.nombreUsuarioInput.getAttribute('value');
    };

    clienteSelectLastOption = function() {
        this.clienteSelect.all(by.tagName('option')).last().click();
    };

    clienteSelectOption = function(option) {
        this.clienteSelect.sendKeys(option);
    };

    getClienteSelect = function() {
        return this.clienteSelect;
    };

    getClienteSelectedOption = function() {
        return this.clienteSelect.element(by.css('option:checked')).getText();
    };

    comercioSelectLastOption = function() {
        this.comercioSelect.all(by.tagName('option')).last().click();
    };

    comercioSelectOption = function(option) {
        this.comercioSelect.sendKeys(option);
    };

    getComercioSelect = function() {
        return this.comercioSelect;
    };

    getComercioSelectedOption = function() {
        return this.comercioSelect.element(by.css('option:checked')).getText();
    };

    repartidorSelectLastOption = function() {
        this.repartidorSelect.all(by.tagName('option')).last().click();
    };

    repartidorSelectOption = function(option) {
        this.repartidorSelect.sendKeys(option);
    };

    getRepartidorSelect = function() {
        return this.repartidorSelect;
    };

    getRepartidorSelectedOption = function() {
        return this.repartidorSelect.element(by.css('option:checked')).getText();
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
