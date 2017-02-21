import Login from './login-model';
import Event from './event-model';
import Ticket from './ticket-model';
import { Selector } from 'testcafe';

fixture `Buy Tickets`
    .page `http://localhost:3000/login`;

// Page model
const login = new Login();
const event = new Event();
const ticket = new Ticket();

// Tests
test('Login, create event, create tickets ', async t => {
  // Login
  await t.setNativeDialogHandler(() => true);
  await t.typeText(login.emailInput, 'admin@example.com')
        .typeText(login.passwordInput, 'test1234')
        .click(login.submitButton)

  // Create Event
  const newEventButton = await Selector('li.add-event');
  await t.click(newEventButton)
  const location = await t.eval(() => window.location);

  await t.expect(location.pathname).eql('/events/new');

  await t.typeText(event.nameInput, 'Test Event')
        .typeText(event.slugInput, 'test-event-100012134568913733612')
        .typeText(event.addressInput, 'Warszawa, województwo mazowieckie, Poland')
        .typeText(event.placeInput, 'Stadion Narodowy')
        .typeText(event.descriptionInput, 'This is short description')
        .click(event.submitButton)
        .wait(500)

  await t.expect(event.result.innerText).contains('Test Event has been created')

  // Create Ticekts
  const link = await Selector('div.text > p > a');
  await t.click(link)
          .wait(500)

  const manageLink = await Selector('div.right > a');
  await t.click(manageLink)
          .wait(500)

  const editLocation = await t.eval(() => window.location);
  await t.expect(editLocation.pathname).contains('/edit');

  const manageNavLinks = await Selector('nav > ul > li');
  await t.click(manageNavLinks.find('a').withText('Tickets'))
          .wait(500)

  const newTicket = await Selector('div.header > a');
  await t.click(newTicket)
        .wait(500)

  await t.typeText(ticket.nameInput, 'Normal Ticket')
          .typeText(ticket.qtyInput, '10')
          .typeText(ticket.priceInput, '0')
          .click(event.submitButton)
          .wait(500)

  await t.click(manageNavLinks.find('a').withText('Go to Event Page'))
        .wait(500)

  // Buy Ticket
  const registerLink = await Selector('div.register > a');
  await t.click(registerLink)
          .wait(500)

});

// test('Text typing basics', async t => {
//     await t
//         .typeText(page.nameInput, 'Peter')                      // Type name
//         .typeText(page.nameInput, 'Paker', { replace: true })   // Replace with last name
//         .typeText(page.nameInput, 'r', { caretPos: 2 })         // Correct last name
//         .expect(page.nameInput.value).eql('Parker');            // Check result
// });
//
//
// test('Click an array of labels and then check their states', async t => {
//     for (const feature of page.featureList) {
//         await t
//             .click(feature.label)
//             .expect(feature.checkbox.checked).ok();
//     }
// });
//
//
// test('Dealing with text using keyboard', async t => {
//     await t
//         .typeText(page.nameInput, 'Peter Parker')           // Type name
//         .click(page.nameInput, { caretPos: 5 })             // Move caret position
//         .pressKey('backspace')                              // Erase a character
//         .expect(page.nameInput.value).eql('Pete Parker')    // Check result
//         .pressKey('home right . delete delete delete')      // Pick even shorter form for name
//         .expect(page.nameInput.value).eql('P. Parker');     // Check result
// });
//
//
// test('Moving the slider', async t => {
//     const initialOffset = await page.slider.handle.offsetLeft;
//
//     await t
//         .click(page.triedTestCafeCheckbox)
//         .dragToElement(page.slider.handle, page.slider.tick.withText('9'))
//         .expect(page.slider.handle.offsetLeft).gt(initialOffset);
// });
//
//
// test('Dealing with text using selection', async t => {
//     await t
//         .typeText(page.nameInput, 'Test Cafe')
//         .selectText(page.nameInput, 7, 1)
//         .pressKey('delete')
//         .expect(page.nameInput.value).eql('Tfe');   // Check result
// });
//
//
// test('Handle native confirmation dialog', async t => {
//     await t
//         .setNativeDialogHandler(() => true)
//         .click(page.populateButton);
//
//     const dialogHistory = await t.getNativeDialogHistory();
//
//     await t.expect(dialogHistory[0].text).eql('Reset information before proceeding?');
//
//     await t
//         .click(page.submitButton)
//         .expect(page.results.innerText).contains('Peter Parker');
// });
//
//
// test('Pick option from select', async t => {
//     await t
//         .click(page.interfaceSelect)
//         .click(page.interfaceSelectOption.withText('Both'))
//         .expect(page.interfaceSelect.value).eql('Both');
// });
//
//
// test('Filling a form', async t => {
//     // Fill some basic fields
//     await t
//         .typeText(page.nameInput, 'Bruce Wayne')
//         .click(page.macOSRadioButton)
//         .click(page.triedTestCafeCheckbox);
//
//     // Let's leave a comment...
//     await t
//         .typeText(page.commentsTextArea, "It's...")
//         .wait(500)
//         .typeText(page.commentsTextArea, '\ngood');
//
//     // I guess, I've changed my mind
//     await t
//         .wait(500)
//         .selectTextAreaContent(page.commentsTextArea, 1, 0)
//         .pressKey('delete')
//         .typeText(page.commentsTextArea, 'awesome!!!');
//
//     // Let's submit our form
//     await t
//         .wait(500)
//         .click(page.submitButton)
//         .expect(page.results.innerText).contains('Bruce Wayne');
// });
