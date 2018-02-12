import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CarroProductos e2e test', () => {

    let navBarPage: NavBarPage;
    let carroProductosDialogPage: CarroProductosDialogPage;
    let carroProductosComponentsPage: CarroProductosComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CarroProductos', () => {
        navBarPage.goToEntity('carro-productos-my-suffix');
        carroProductosComponentsPage = new CarroProductosComponentsPage();
        expect(carroProductosComponentsPage.getTitle())
            .toMatch(/Carro Productos/);

    });

    it('should load create CarroProductos dialog', () => {
        carroProductosComponentsPage.clickOnCreateButton();
        carroProductosDialogPage = new CarroProductosDialogPage();
        expect(carroProductosDialogPage.getModalTitle())
            .toMatch(/Create or edit a Carro Productos/);
        carroProductosDialogPage.close();
    });

    it('should create and save CarroProductos', () => {
        carroProductosComponentsPage.clickOnCreateButton();
        carroProductosDialogPage.setIdCarroInput('5');
        expect(carroProductosDialogPage.getIdCarroInput()).toMatch('5');
        carroProductosDialogPage.setIdStockProductoInput('5');
        expect(carroProductosDialogPage.getIdStockProductoInput()).toMatch('5');
        carroProductosDialogPage.setPrecioInput('5');
        expect(carroProductosDialogPage.getPrecioInput()).toMatch('5');
        carroProductosDialogPage.setDescuentoInput('5');
        expect(carroProductosDialogPage.getDescuentoInput()).toMatch('5');
        carroProductosDialogPage.setIdDireccionClienteInput('5');
        expect(carroProductosDialogPage.getIdDireccionClienteInput()).toMatch('5');
        carroProductosDialogPage.save();
        expect(carroProductosDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CarroProductosComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-carro-productos-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class CarroProductosDialogPage {
    modalTitle = element(by.css('h4#myCarroProductosLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idCarroInput = element(by.css('input#field_idCarro'));
    idStockProductoInput = element(by.css('input#field_idStockProducto'));
    precioInput = element(by.css('input#field_precio'));
    descuentoInput = element(by.css('input#field_descuento'));
    idDireccionClienteInput = element(by.css('input#field_idDireccionCliente'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setIdCarroInput = function(idCarro) {
        this.idCarroInput.sendKeys(idCarro);
    };

    getIdCarroInput = function() {
        return this.idCarroInput.getAttribute('value');
    };

    setIdStockProductoInput = function(idStockProducto) {
        this.idStockProductoInput.sendKeys(idStockProducto);
    };

    getIdStockProductoInput = function() {
        return this.idStockProductoInput.getAttribute('value');
    };

    setPrecioInput = function(precio) {
        this.precioInput.sendKeys(precio);
    };

    getPrecioInput = function() {
        return this.precioInput.getAttribute('value');
    };

    setDescuentoInput = function(descuento) {
        this.descuentoInput.sendKeys(descuento);
    };

    getDescuentoInput = function() {
        return this.descuentoInput.getAttribute('value');
    };

    setIdDireccionClienteInput = function(idDireccionCliente) {
        this.idDireccionClienteInput.sendKeys(idDireccionCliente);
    };

    getIdDireccionClienteInput = function() {
        return this.idDireccionClienteInput.getAttribute('value');
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
