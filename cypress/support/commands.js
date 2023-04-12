const loginSelectors = require('../fixtures/loginSelectors.json');
const regSelectors = require('../fixtures/registrationSelectors.json');
import { faker } from '@faker-js/faker';

Cypress.Commands.add('loginUI', (userEmail, userPassword) => {
  cy.contains('Вход и регистрация').click({ force: true });
  cy.get(loginSelectors.emailField).type(userEmail);
  cy.get(loginSelectors.passwordField).type(userPassword);
  cy.get(loginSelectors.loginButton).click();
});

Cypress.Commands.add('regUI', (userName, userEmail) => {
  cy.contains('Вход и регистрация').click({ force: true });
  cy.get(regSelectors.regLink).click();
  cy.get(regSelectors.nameField).type(userName);
  cy.get(regSelectors.emailField).type(userEmail);
  cy.get(regSelectors.regButton).click();
});

Cypress.Commands.add('loginByAPI', (userEmail, userPassword) => {
  cy.request({
    method: 'POST',
    url: '/api/login',
    body: { email: userEmail, password: userPassword },
  });
});

Cypress.Commands.add('createBoxDefSet', (nameBox) => {
  //GET -send request for new box
  cy.request({
    method: 'GET',
    url: '/api/box/key',
  }).then((res) => {
    //get the random box key from system in response
    const keyBox = res.body;

    //1.POST-send box name
    cy.request({
      method: 'POST',
      url: '/api/box',
      body: {
        email: null,
        name: nameBox,
        key: keyBox,
        picture: null,
        usePost: false,
        useCashLimit: null,
        cashLimit: null,
        cashLimitCurrency: null,
        useWish: true,
        useCircleDraw: null,
        isInviteAfterDraw: null,
        isArchived: null,
        createAdminCard: null,
        isCreated: null,
        useNames: true,
        isPhoneRequired: false,
        logo: null,
      },
    }).then((res) => {
      // get the random box picture from system in response
      const pictureBox = res.body.box.picture;
      //2.POST-send the random box picture from system
      cy.request({
        method: 'POST',
        url: '/api/box',
        body: {
          email: null,
          name: nameBox,
          key: keyBox,
          picture: pictureBox,
          usePost: false,
          useCashLimit: null,
          cashLimit: null,
          cashLimitCurrency: null,
          useWish: true,
          useCircleDraw: null,
          isInviteAfterDraw: null,
          isArchived: null,
          createAdminCard: null,
          isCreated: null,
          useNames: true,
          isPhoneRequired: false,
          logo: null,
        },
      }).then((res) => {
        // get the default cashLimit settings from system in response
        const useCashLimit = res.body.box.useCashLimit;

        //3.POST-send default cashLimit settings
        cy.request({
          method: 'POST',
          url: '/api/box',
          body: {
            email: null,
            name: nameBox,
            key: keyBox,
            picture: pictureBox,
            usePost: false,
            useCashLimit: useCashLimit,
            cashLimit: null,
            cashLimitCurrency: null,
            useWish: true,
            useCircleDraw: null,
            isInviteAfterDraw: null,
            isArchived: null,
            createAdminCard: null,
            isCreated: null,
            useNames: true,
            isPhoneRequired: false,
            logo: null,
          },
        }).then((res) => {
          // get the default additional box settings from system in response
          const useCircleDraw = res.body.box.useCircleDraw;
          const isInviteAfterDraw = res.body.box.useCircleDraw;
          const isArchived = res.body.box.useCircleDraw;

          //4.POST-send additional box settings

          cy.request({
            method: 'POST',
            url: '/api/box',
            body: {
              email: null,
              name: nameBox,
              key: keyBox,
              picture: pictureBox,
              usePost: false,
              useCashLimit: useCashLimit,
              cashLimit: null,
              cashLimitCurrency: null,
              useWish: true,
              useCircleDraw: useCircleDraw,
              isInviteAfterDraw: isInviteAfterDraw,
              isArchived: isArchived,
              createAdminCard: null,
              isCreated: true,
              useNames: true,
              isPhoneRequired: false,
              logo: null,
            },
          });
        });
      });
    });
  });
});

Cypress.Commands.add('createBoxUserSet', (nameBox) => {
  const keyBox2 = faker.word.verb(6);
  const picture = [
    'tree',
    'gift',
    'cup_one',
    'cup_two',
    'cake',
    'cup_cake',
    'cookie_tree',
    'cookie_star',
    'lollipop',
    'mittens',
    'tree_toys',
    'santa',
    'house_one',
  ];
  const randomNum = Math.floor(Math.random() * picture.length);
  const newpicture = picture[randomNum];
  const cashLimit = faker.datatype.number(1000);
  const currency = ['rub', 'eur', 'uah', 'byn', 'kzt', 'usd'];
  const randomNum2 = Math.floor(Math.random() * currency.length);
  const cashCurrensy = currency[randomNum2];

  //1.POST-send box name and key, that the user has assigned
  cy.request({
    method: 'POST',
    url: '/api/box',
    body: {
      email: null,
      name: nameBox,
      key: keyBox2,
      picture: null,
      usePost: false,
      useCashLimit: null,
      cashLimit: null,
      cashLimitCurrency: null,
      useWish: true,
      useCircleDraw: null,
      isInviteAfterDraw: null,
      isArchived: null,
      createAdminCard: null,
      isCreated: null,
      useNames: true,
      isPhoneRequired: false,
      logo: null,
    },
  });

  //2.POST-send the box picture, that the user has assigned

  cy.request({
    method: 'POST',
    url: '/api/box',
    body: {
      email: null,
      name: nameBox,
      key: keyBox2,
      picture: newpicture,
      usePost: false,
      useCashLimit: null,
      cashLimit: null,
      cashLimitCurrency: null,
      useWish: true,
      useCircleDraw: null,
      isInviteAfterDraw: null,
      isArchived: null,
      createAdminCard: null,
      isCreated: null,
      useNames: true,
      isPhoneRequired: false,
      logo: null,
    },
  });

  //3.POST-send cashLimit settings,that the user has assigned

  cy.request({
    method: 'POST',
    url: '/api/box',
    body: {
      email: null,
      name: nameBox,
      key: keyBox2,
      picture: newpicture,
      usePost: false,
      useCashLimit: true,
      cashLimit: cashLimit,
      cashLimitCurrency: cashCurrensy,
      useWish: true,
      useCircleDraw: null,
      isInviteAfterDraw: null,
      isArchived: null,
      createAdminCard: null,
      isCreated: null,
      useNames: true,
      isPhoneRequired: false,
      logo: null,
    },
  });
  //4. POST-send additional box settings,that the user has assigned
  cy.request({
    method: 'POST',
    url: '/api/box',
    body: {
      email: null,
      name: nameBox,
      key: keyBox2,
      picture: newpicture,
      usePost: true,
      useCashLimit: true,
      cashLimit: cashLimit,
      cashLimitCurrency: cashCurrensy,
      useWish: true,
      useCircleDraw: false,
      isInviteAfterDraw: false,
      isArchived: false,
      createAdminCard: null,
      isCreated: true,
      useNames: true,
      isPhoneRequired: true,
      logo: null,
    },
  });
});

Cypress.Commands.add('changeBoxSet', (keyBox) => {
  const newNameBox = faker.word.noun(6);
  const picture = [
    'tree',
    'gift',
    'cup_one',
    'cup_two',
    'cake',
    'cup_cake',
    'cookie_tree',
    'cookie_star',
    'lollipop',
    'mittens',
    'tree_toys',
    'santa',
    'house_one',
  ];
  const randomN = Math.floor(Math.random() * picture.length);
  const newPicture = picture[randomN];

  const newCashLimit = faker.datatype.number(900);

  const currency = ['rub', 'eur', 'uah', 'byn', 'kzt', 'usd'];
  const randomN2 = Math.floor(Math.random() * currency.length);
  const newCashCurrensy = currency[randomN2];
  console.log(newCashCurrensy);

  const newUsePost = faker.datatype.boolean();
  const useCashLimit = faker.datatype.boolean();
  const newUseWish = faker.datatype.boolean();
  const newUseNames = faker.datatype.boolean();
  const newIsPhoneRequired = faker.datatype.boolean();

  cy.request({
    method: 'PUT',
    url: '/api/box',
    body: {
      email: null,
      name: newNameBox,
      key: keyBox,
      picture: newPicture,
      usePost: newUsePost,
      useCashLimit: useCashLimit,
      cashLimit: newCashLimit,
      cashLimitCurrency: newCashCurrensy,
      useWish: newUseWish,
      useCircleDraw: null,
      isInviteAfterDraw: null,
      isArchived: null,
      createAdminCard: null,
      isCreated: null,
      useNames: newUseNames,
      isPhoneRequired: newIsPhoneRequired,
      logo: null,
    },
  });
});
