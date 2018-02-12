import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Carro e2e test', () => {

    let navBarPage: NavBarPage;
    let carroDialogPage: CarroDialogPage;
    let carroComponentsPage: CarroComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Carros', () => {
        navBarPage.goToEntity('carro-my-suffix');
        carroComponentsPage = new CarroComponentsPage();
        expect(carroComponentsPage.getTitle())
            .toMatch(/Carros/);

    });

    it('should load create Carro dialog', () => {
        carroComponentsPage.clickOnCreateButton();
        carroDialogPage = new CarroDialogPage();
        expect(carroDialogPage.getModalTitle())
            .toMatch(/Create or edit a Carro/);
        carroDialogPage.close();
    });

    it('should create and save Carros', () => {
        carroComponentsPage.clickOnCreateButton();
        carroDialogPage.setIdCarroInput('5');
        expect(carroDialogPage.getIdCarroInput()).toMatch('5');
        carroDialogPage.setIdClienteInput('5');
        expect(carroDialogPage.getIdClienteInput()).toMatch('5');
        carroDialogPage.setIdMercadoInput('5');
        expect(carroDialogPage.getIdMercadoInput()).toMatch('5');
        carroDialogPage.setIdMedioPagoInput('5');
        expect(carroDialogPage.getIdMedioPagoInput()).toMatch('5');
        carroDialogPage.setFechaInput('fecha');
        expect(carroDialogPage.getFechaInput()).toMatch('fecha');
        carroDialogPage.carroProductosSelectLastOption();
        carroDialogPage.listaEntregaSelectLastOption();
        carroDialogPage.save();
        expect(carroDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CarroComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-carro-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class CarroDialogPage {
    modalTitle = element(by.css('h4#myCarroLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idCarroInput = element(by.css('input#field_idCarro'));
    idClienteInput = element(by.css('input#field_idCliente'));
    idMercadoInput = element(by.css('input#field_idMercado'));
    idMedioPagoInput = element(by.css('input#field_idMedioPago'));
    fechaInput = element(by.css('input#field_fecha'));
    carroProductosSelect = element(by.css('select#field_carroProductos'));
    listaEntregaSelect = element(by.css('select#field_listaEntrega'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setIdCarroInput = function(idCarro) {
        this.idCarroInput.sendKeys(idCarro);
    };

    getIdCarroInput = function() {
        return this.idCarroInput.getAttribute('value');
    };

    setIdClienteInput = function(idCliente) {
        this.idClienteInput.sendKeys(idCliente);
    };

    getIdClienteInput = function() {
        return this.idClienteInput.getAttribute('value');
    };

    setIdMercadoInput = function(idMercado) {
        this.idMercadoInput.sendKeys(idMercado);
    };

    getIdMercadoInput = function() {
        return this.idMercadoInput.getAttribute('value');
    };

    setIdMedioPagoInput = function(idMedioPago) {
        this.idMedioPagoInput.sendKeys(idMedioPago);
    };

    getIdMedioPagoInput = function() {
        return this.idMedioPagoInput.getAttribute('value');
    };

    setFechaInput = function(fecha) {
        this.fechaInput.sendKeys(fecha);
    };

    getFechaInput = function() {
        return this.fechaInput.getAttribute('value');
    };

    carroProductosSelectLastOption = function() {
        this.carroProductosSelect.all(by.tagName('option')).last().click();
    };

    carroProductosSelectOption = function(option) {
        this.carroProductosSelect.sendKeys(option);
    };

    getCarroProductosSelect = function() {
        return this.carroProductosSelect;
    };

    getCarroProductosSelectedOption = function() {
        return this.carroProductosSelect.element(by.css('option:checked')).getText();
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
