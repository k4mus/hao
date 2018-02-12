import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Repartidor e2e test', () => {

    let navBarPage: NavBarPage;
    let repartidorDialogPage: RepartidorDialogPage;
    let repartidorComponentsPage: RepartidorComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Repartidors', () => {
        navBarPage.goToEntity('repartidor-my-suffix');
        repartidorComponentsPage = new RepartidorComponentsPage();
        expect(repartidorComponentsPage.getTitle())
            .toMatch(/Repartidors/);

    });

    it('should load create Repartidor dialog', () => {
        repartidorComponentsPage.clickOnCreateButton();
        repartidorDialogPage = new RepartidorDialogPage();
        expect(repartidorDialogPage.getModalTitle())
            .toMatch(/Create or edit a Repartidor/);
        repartidorDialogPage.close();
    });

    it('should create and save Repartidors', () => {
        repartidorComponentsPage.clickOnCreateButton();
        repartidorDialogPage.setIdRepartidorInput('5');
        expect(repartidorDialogPage.getIdRepartidorInput()).toMatch('5');
        repartidorDialogPage.setNombreRepartidorInput('nombreRepartidor');
        expect(repartidorDialogPage.getNombreRepartidorInput()).toMatch('nombreRepartidor');
        repartidorDialogPage.setIdUsuarioInput('5');
        expect(repartidorDialogPage.getIdUsuarioInput()).toMatch('5');
        repartidorDialogPage.vehiculoSelectLastOption();
        repartidorDialogPage.save();
        expect(repartidorDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RepartidorComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-repartidor-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class RepartidorDialogPage {
    modalTitle = element(by.css('h4#myRepartidorLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idRepartidorInput = element(by.css('input#field_idRepartidor'));
    nombreRepartidorInput = element(by.css('input#field_nombreRepartidor'));
    idUsuarioInput = element(by.css('input#field_idUsuario'));
    vehiculoSelect = element(by.css('select#field_vehiculo'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setIdRepartidorInput = function(idRepartidor) {
        this.idRepartidorInput.sendKeys(idRepartidor);
    };

    getIdRepartidorInput = function() {
        return this.idRepartidorInput.getAttribute('value');
    };

    setNombreRepartidorInput = function(nombreRepartidor) {
        this.nombreRepartidorInput.sendKeys(nombreRepartidor);
    };

    getNombreRepartidorInput = function() {
        return this.nombreRepartidorInput.getAttribute('value');
    };

    setIdUsuarioInput = function(idUsuario) {
        this.idUsuarioInput.sendKeys(idUsuario);
    };

    getIdUsuarioInput = function() {
        return this.idUsuarioInput.getAttribute('value');
    };

    vehiculoSelectLastOption = function() {
        this.vehiculoSelect.all(by.tagName('option')).last().click();
    };

    vehiculoSelectOption = function(option) {
        this.vehiculoSelect.sendKeys(option);
    };

    getVehiculoSelect = function() {
        return this.vehiculoSelect;
    };

    getVehiculoSelectedOption = function() {
        return this.vehiculoSelect.element(by.css('option:checked')).getText();
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
