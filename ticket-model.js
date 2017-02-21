import { Selector } from 'testcafe';

export default class Ticket {
    constructor () {
        this.nameInput             = Selector('#ticket_name');
        this.qtyInput              = Selector('#ticket_qty');
        this.priceInput            = Selector('#ticket_price');
        this.submitButton          = Selector('[name="commit"]');
    }
}
