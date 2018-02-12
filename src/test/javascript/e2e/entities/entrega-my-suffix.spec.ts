import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Entrega e2e test', () => {

    let navBarPage: NavBarPage;
    let entregaDialogPage: EntregaDialogPage;
    let entregaComponentsPage: EntregaComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Entregas', () => {
        navBarPage.goToEntity('entrega-my-suffix');
        entregaComponentsPage = new EntregaComponentsPage();
        expect(entregaComponentsPage.getTitle())
            .toMatch(/Entregas/);

    });

    it('should load create Entrega dialog', () => {
        entregaComponentsPage.clickOnCreateButton();
        entregaDialogPage = new EntregaDialogPage();
        expect(entregaDialogPage.getModalTitle())
            .toMatch(/Create or edit a Entrega/);
        entregaDialogPage.close();
    });

    it('should create and save Entregas', () => {
        entregaComponentsPage.clickOnCreateButton();
        entregaDialogPage.setIdEntregaInput('5');
        expect(entregaDialogPage.getIdEntregaInput()).toMatch('5');
        entregaDialogPage.setIdVehiculoInput('5');
        expect(entregaDialogPage.getIdVehiculoInput()).toMatch('5');
        entregaDialogPage.setIdRutaInput('5');
        expect(entregaDialogPage.getIdRutaInput()).toMatch('5');
        entregaDialogPage.listaEntregaSelectLastOption();
        entregaDialogPage.save();
        expect(entregaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EntregaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-entrega-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class EntregaDialogPage {
    modalTitle = element(by.css('h4#myEntregaLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idEntregaInput = element(by.css('input#field_idEntrega'));
    idVehiculoInput = element(by.css('input#field_idVehiculo'));
    idRutaInput = element(by.css('input#field_idRuta'));
    listaEntregaSelect = element(by.css('select#field_listaEntrega'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setIdEntregaInput = function(idEntrega) {
        this.idEntregaInput.sendKeys(idEntrega);
    };

    getIdEntregaInput = function() {
        return this.idEntregaInput.getAttribute('value');
    };

    setIdVehiculoInput = function(idVehiculo) {
        this.idVehiculoInput.sendKeys(idVehiculo);
    };

    getIdVehiculoInput = function() {
        return this.idVehiculoInput.getAttribute('value');
    };

    setIdRutaInput = function(idRuta) {
        this.idRutaInput.sendKeys(idRuta);
    };

    getIdRutaInput = function() {
        return this.idRutaInput.getAttribute('value');
    };

    listaEntregaSelectLastOption = function() {
        this.listaEntregaSelect.all(by.tagName('option')).last().click();
    };

    listaEntregaSelectOption = function(option) {
        this.listaEntregaSelect.sendKeys(option);
    };

    getListaEntregaSelect = function() {
        return this.listaEntregaSelect;
    };

    getListaEntregaSelectedOption = function() {
        return this.listaEntregaSelect.element(by.css('option:checked')).getText();
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
