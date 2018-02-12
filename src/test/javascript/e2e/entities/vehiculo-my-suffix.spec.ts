import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Vehiculo e2e test', () => {

    let navBarPage: NavBarPage;
    let vehiculoDialogPage: VehiculoDialogPage;
    let vehiculoComponentsPage: VehiculoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Vehiculos', () => {
        navBarPage.goToEntity('vehiculo-my-suffix');
        vehiculoComponentsPage = new VehiculoComponentsPage();
        expect(vehiculoComponentsPage.getTitle())
            .toMatch(/Vehiculos/);

    });

    it('should load create Vehiculo dialog', () => {
        vehiculoComponentsPage.clickOnCreateButton();
        vehiculoDialogPage = new VehiculoDialogPage();
        expect(vehiculoDialogPage.getModalTitle())
            .toMatch(/Create or edit a Vehiculo/);
        vehiculoDialogPage.close();
    });

    it('should create and save Vehiculos', () => {
        vehiculoComponentsPage.clickOnCreateButton();
        vehiculoDialogPage.setIdVehiculoInput('5');
        expect(vehiculoDialogPage.getIdVehiculoInput()).toMatch('5');
        vehiculoDialogPage.setIdRepartidorInput('5');
        expect(vehiculoDialogPage.getIdRepartidorInput()).toMatch('5');
        vehiculoDialogPage.setNombreVehiculoInput('nombreVehiculo');
        expect(vehiculoDialogPage.getNombreVehiculoInput()).toMatch('nombreVehiculo');
        vehiculoDialogPage.setPatenteInput('patente');
        expect(vehiculoDialogPage.getPatenteInput()).toMatch('patente');
        vehiculoDialogPage.setConsumoInput('consumo');
        expect(vehiculoDialogPage.getConsumoInput()).toMatch('consumo');
        vehiculoDialogPage.entregaSelectLastOption();
        vehiculoDialogPage.save();
        expect(vehiculoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class VehiculoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-vehiculo-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class VehiculoDialogPage {
    modalTitle = element(by.css('h4#myVehiculoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idVehiculoInput = element(by.css('input#field_idVehiculo'));
    idRepartidorInput = element(by.css('input#field_idRepartidor'));
    nombreVehiculoInput = element(by.css('input#field_nombreVehiculo'));
    patenteInput = element(by.css('input#field_patente'));
    consumoInput = element(by.css('input#field_consumo'));
    entregaSelect = element(by.css('select#field_entrega'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setIdVehiculoInput = function(idVehiculo) {
        this.idVehiculoInput.sendKeys(idVehiculo);
    };

    getIdVehiculoInput = function() {
        return this.idVehiculoInput.getAttribute('value');
    };

    setIdRepartidorInput = function(idRepartidor) {
        this.idRepartidorInput.sendKeys(idRepartidor);
    };

    getIdRepartidorInput = function() {
        return this.idRepartidorInput.getAttribute('value');
    };

    setNombreVehiculoInput = function(nombreVehiculo) {
        this.nombreVehiculoInput.sendKeys(nombreVehiculo);
    };

    getNombreVehiculoInput = function() {
        return this.nombreVehiculoInput.getAttribute('value');
    };

    setPatenteInput = function(patente) {
        this.patenteInput.sendKeys(patente);
    };

    getPatenteInput = function() {
        return this.patenteInput.getAttribute('value');
    };

    setConsumoInput = function(consumo) {
        this.consumoInput.sendKeys(consumo);
    };

    getConsumoInput = function() {
        return this.consumoInput.getAttribute('value');
    };

    entregaSelectLastOption = function() {
        this.entregaSelect.all(by.tagName('option')).last().click();
    };

    entregaSelectOption = function(option) {
        this.entregaSelect.sendKeys(option);
    };

    getEntregaSelect = function() {
        return this.entregaSelect;
    };

    getEntregaSelectedOption = function() {
        return this.entregaSelect.element(by.css('option:checked')).getText();
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
