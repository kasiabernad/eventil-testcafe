import { Selector } from 'testcafe';

export default class Ticket {
    constructor () {
        this.nameInput             = Selector('#ticket_name');
        this.qtyInput              = Selector('#ticket_qty');
        this.priceInput            = Selector('#ticket_price');
        this.submitButton          = Selector('[name="commit"]');
        this.registerButton        = Selector('div.button-container > input');
        this.orderButton           = Selector('#pay_button');

        this.TicketSelect       = Selector('select#qty');
        this.TicketSelectOption = this.TicketSelect.find('option');

        this.result                = Selector('div.text');
    }
}
