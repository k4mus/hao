import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Producto e2e test', () => {

    let navBarPage: NavBarPage;
    let productoDialogPage: ProductoDialogPage;
    let productoComponentsPage: ProductoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Productos', () => {
        navBarPage.goToEntity('producto-my-suffix');
        productoComponentsPage = new ProductoComponentsPage();
        expect(productoComponentsPage.getTitle())
            .toMatch(/Productos/);

    });

    it('should load create Producto dialog', () => {
        productoComponentsPage.clickOnCreateButton();
        productoDialogPage = new ProductoDialogPage();
        expect(productoDialogPage.getModalTitle())
            .toMatch(/Create or edit a Producto/);
        productoDialogPage.close();
    });

    it('should create and save Productos', () => {
        productoComponentsPage.clickOnCreateButton();
        productoDialogPage.setIdProductoInput('5');
        expect(productoDialogPage.getIdProductoInput()).toMatch('5');
        productoDialogPage.setNombreProductoInput('nombreProducto');
        expect(productoDialogPage.getNombreProductoInput()).toMatch('nombreProducto');
        productoDialogPage.stockProductoSelectLastOption();
        productoDialogPage.save();
        expect(productoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProductoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-producto-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class ProductoDialogPage {
    modalTitle = element(by.css('h4#myProductoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idProductoInput = element(by.css('input#field_idProducto'));
    nombreProductoInput = element(by.css('input#field_nombreProducto'));
    stockProductoSelect = element(by.css('select#field_stockProducto'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setIdProductoInput = function(idProducto) {
        this.idProductoInput.sendKeys(idProducto);
    };

    getIdProductoInput = function() {
        return this.idProductoInput.getAttribute('value');
    };

    setNombreProductoInput = function(nombreProducto) {
        this.nombreProductoInput.sendKeys(nombreProducto);
    };

    getNombreProductoInput = function() {
        return this.nombreProductoInput.getAttribute('value');
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
