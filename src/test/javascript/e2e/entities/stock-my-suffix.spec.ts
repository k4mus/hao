import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Stock e2e test', () => {

    let navBarPage: NavBarPage;
    let stockDialogPage: StockDialogPage;
    let stockComponentsPage: StockComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Stocks', () => {
        navBarPage.goToEntity('stock-my-suffix');
        stockComponentsPage = new StockComponentsPage();
        expect(stockComponentsPage.getTitle())
            .toMatch(/Stocks/);

    });

    it('should load create Stock dialog', () => {
        stockComponentsPage.clickOnCreateButton();
        stockDialogPage = new StockDialogPage();
        expect(stockDialogPage.getModalTitle())
            .toMatch(/Create or edit a Stock/);
        stockDialogPage.close();
    });

    it('should create and save Stocks', () => {
        stockComponentsPage.clickOnCreateButton();
        stockDialogPage.setIdStockInput('5');
        expect(stockDialogPage.getIdStockInput()).toMatch('5');
        stockDialogPage.setNombreStockInput('nombreStock');
        expect(stockDialogPage.getNombreStockInput()).toMatch('nombreStock');
        stockDialogPage.setIdSucursalInput('5');
        expect(stockDialogPage.getIdSucursalInput()).toMatch('5');
        stockDialogPage.stockProductoSelectLastOption();
        stockDialogPage.save();
        expect(stockDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class StockComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-stock-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class StockDialogPage {
    modalTitle = element(by.css('h4#myStockLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idStockInput = element(by.css('input#field_idStock'));
    nombreStockInput = element(by.css('input#field_nombreStock'));
    idSucursalInput = element(by.css('input#field_idSucursal'));
    stockProductoSelect = element(by.css('select#field_stockProducto'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setIdStockInput = function(idStock) {
        this.idStockInput.sendKeys(idStock);
    };

    getIdStockInput = function() {
        return this.idStockInput.getAttribute('value');
    };

    setNombreStockInput = function(nombreStock) {
        this.nombreStockInput.sendKeys(nombreStock);
    };

    getNombreStockInput = function() {
        return this.nombreStockInput.getAttribute('value');
    };

    setIdSucursalInput = function(idSucursal) {
        this.idSucursalInput.sendKeys(idSucursal);
    };

    getIdSucursalInput = function() {
        return this.idSucursalInput.getAttribute('value');
    };

    stockProductoSelectLastOption = function() {
        this.stockProductoSelect.all(by.tagName('option')).last().click();
    };

    stockProductoSelectOption = function(option) {
        this.stockProductoSelect.sendKeys(option);
    };

    getStockProductoSelect = function() {
        return this.stockProductoSelect;
    };

    getStockProductoSelectedOption = function() {
        return this.stockProductoSelect.element(by.css('option:checked')).getText();
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
