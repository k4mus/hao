import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('StockProducto e2e test', () => {

    let navBarPage: NavBarPage;
    let stockProductoDialogPage: StockProductoDialogPage;
    let stockProductoComponentsPage: StockProductoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load StockProductos', () => {
        navBarPage.goToEntity('stock-producto-my-suffix');
        stockProductoComponentsPage = new StockProductoComponentsPage();
        expect(stockProductoComponentsPage.getTitle())
            .toMatch(/Stock Productos/);

    });

    it('should load create StockProducto dialog', () => {
        stockProductoComponentsPage.clickOnCreateButton();
        stockProductoDialogPage = new StockProductoDialogPage();
        expect(stockProductoDialogPage.getModalTitle())
            .toMatch(/Create or edit a Stock Producto/);
        stockProductoDialogPage.close();
    });

    it('should create and save StockProductos', () => {
        stockProductoComponentsPage.clickOnCreateButton();
        stockProductoDialogPage.setIdStockProductoInput('5');
        expect(stockProductoDialogPage.getIdStockProductoInput()).toMatch('5');
        stockProductoDialogPage.setIdStockInput('5');
        expect(stockProductoDialogPage.getIdStockInput()).toMatch('5');
        stockProductoDialogPage.setIdProductoInput('idProducto');
        expect(stockProductoDialogPage.getIdProductoInput()).toMatch('idProducto');
        stockProductoDialogPage.setCantidadInput('5');
        expect(stockProductoDialogPage.getCantidadInput()).toMatch('5');
        stockProductoDialogPage.carroProductosSelectLastOption();
        stockProductoDialogPage.save();
        expect(stockProductoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class StockProductoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-stock-producto-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class StockProductoDialogPage {
    modalTitle = element(by.css('h4#myStockProductoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idStockProductoInput = element(by.css('input#field_idStockProducto'));
    idStockInput = element(by.css('input#field_idStock'));
    idProductoInput = element(by.css('input#field_idProducto'));
    cantidadInput = element(by.css('input#field_cantidad'));
    carroProductosSelect = element(by.css('select#field_carroProductos'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setIdStockProductoInput = function(idStockProducto) {
        this.idStockProductoInput.sendKeys(idStockProducto);
    };

    getIdStockProductoInput = function() {
        return this.idStockProductoInput.getAttribute('value');
    };

    setIdStockInput = function(idStock) {
        this.idStockInput.sendKeys(idStock);
    };

    getIdStockInput = function() {
        return this.idStockInput.getAttribute('value');
    };

    setIdProductoInput = function(idProducto) {
        this.idProductoInput.sendKeys(idProducto);
    };

    getIdProductoInput = function() {
        return this.idProductoInput.getAttribute('value');
    };

    setCantidadInput = function(cantidad) {
        this.cantidadInput.sendKeys(cantidad);
    };

    getCantidadInput = function() {
        return this.cantidadInput.getAttribute('value');
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
