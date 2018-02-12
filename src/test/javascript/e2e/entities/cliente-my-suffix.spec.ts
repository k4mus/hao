import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Cliente e2e test', () => {

    let navBarPage: NavBarPage;
    let clienteDialogPage: ClienteDialogPage;
    let clienteComponentsPage: ClienteComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Clientes', () => {
        navBarPage.goToEntity('cliente-my-suffix');
        clienteComponentsPage = new ClienteComponentsPage();
        expect(clienteComponentsPage.getTitle())
            .toMatch(/Clientes/);

    });

    it('should load create Cliente dialog', () => {
        clienteComponentsPage.clickOnCreateButton();
        clienteDialogPage = new ClienteDialogPage();
        expect(clienteDialogPage.getModalTitle())
            .toMatch(/Create or edit a Cliente/);
        clienteDialogPage.close();
    });

    it('should create and save Clientes', () => {
        clienteComponentsPage.clickOnCreateButton();
        clienteDialogPage.setIdClienteInput('5');
        expect(clienteDialogPage.getIdClienteInput()).toMatch('5');
        clienteDialogPage.setIdUsuarioInput('5');
        expect(clienteDialogPage.getIdUsuarioInput()).toMatch('5');
        clienteDialogPage.carroSelectLastOption();
        clienteDialogPage.save();
        expect(clienteDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ClienteComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-cliente-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class ClienteDialogPage {
    modalTitle = element(by.css('h4#myClienteLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idClienteInput = element(by.css('input#field_idCliente'));
    idUsuarioInput = element(by.css('input#field_idUsuario'));
    carroSelect = element(by.css('select#field_carro'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setIdClienteInput = function(idCliente) {
        this.idClienteInput.sendKeys(idCliente);
    };

    getIdClienteInput = function() {
        return this.idClienteInput.getAttribute('value');
    };

    setIdUsuarioInput = function(idUsuario) {
        this.idUsuarioInput.sendKeys(idUsuario);
    };

    getIdUsuarioInput = function() {
        return this.idUsuarioInput.getAttribute('value');
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
