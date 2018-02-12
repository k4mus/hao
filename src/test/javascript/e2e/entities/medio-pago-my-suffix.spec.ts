import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('MedioPago e2e test', () => {

    let navBarPage: NavBarPage;
    let medioPagoDialogPage: MedioPagoDialogPage;
    let medioPagoComponentsPage: MedioPagoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load MedioPagos', () => {
        navBarPage.goToEntity('medio-pago-my-suffix');
        medioPagoComponentsPage = new MedioPagoComponentsPage();
        expect(medioPagoComponentsPage.getTitle())
            .toMatch(/Medio Pagos/);

    });

    it('should load create MedioPago dialog', () => {
        medioPagoComponentsPage.clickOnCreateButton();
        medioPagoDialogPage = new MedioPagoDialogPage();
        expect(medioPagoDialogPage.getModalTitle())
            .toMatch(/Create or edit a Medio Pago/);
        medioPagoDialogPage.close();
    });

    it('should create and save MedioPagos', () => {
        medioPagoComponentsPage.clickOnCreateButton();
        medioPagoDialogPage.setIdMedioPagoInput('5');
        expect(medioPagoDialogPage.getIdMedioPagoInput()).toMatch('5');
        medioPagoDialogPage.setNombreMedioPagoInput('nombreMedioPago');
        expect(medioPagoDialogPage.getNombreMedioPagoInput()).toMatch('nombreMedioPago');
        medioPagoDialogPage.carroSelectLastOption();
        medioPagoDialogPage.save();
        expect(medioPagoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class MedioPagoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-medio-pago-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class MedioPagoDialogPage {
    modalTitle = element(by.css('h4#myMedioPagoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idMedioPagoInput = element(by.css('input#field_idMedioPago'));
    nombreMedioPagoInput = element(by.css('input#field_nombreMedioPago'));
    carroSelect = element(by.css('select#field_carro'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setIdMedioPagoInput = function(idMedioPago) {
        this.idMedioPagoInput.sendKeys(idMedioPago);
    };

    getIdMedioPagoInput = function() {
        return this.idMedioPagoInput.getAttribute('value');
    };

    setNombreMedioPagoInput = function(nombreMedioPago) {
        this.nombreMedioPagoInput.sendKeys(nombreMedioPago);
    };

    getNombreMedioPagoInput = function() {
        return this.nombreMedioPagoInput.getAttribute('value');
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
