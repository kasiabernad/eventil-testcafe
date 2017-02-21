import { Selector } from 'testcafe';

export default class Event {
    constructor () {
        this.nameInput             = Selector('#event_name');
        this.slugInput             = Selector('#event_slug');
        this.addressInput          = Selector('#location');
        this.placeInput            = Selector('#event_place_name');
        this.descriptionInput      = Selector('#event_description');
        this.submitButton          = Selector('[name="commit"]');
        this.result                = Selector('#wrapper');
    }
}
