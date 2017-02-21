import { Selector } from 'testcafe';

export default class Login {
    constructor () {
        this.emailInput             = Selector('#user_email')
        this.passwordInput         = Selector('#user_password');
        this.submitButton          = Selector('[name="commit"]');
    }
}
