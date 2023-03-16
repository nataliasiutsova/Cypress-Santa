import { faker } from '@faker-js/faker';

describe('Create box by API', () => {
  beforeEach(() => {
    cy.loginByAPI(Cypress.env('userEmail'), Cypress.env('userPassword'));
  });

  const nameBox = faker.word.noun(6);
  const nameBox2 = faker.word.noun(6);

  it('Create a box with default settings', () => {
    cy.createBoxDefSet(nameBox).then((res) => {
      const keyBox = res.body.box.key;
      cy.task('save1', keyBox);
      const pictureBox = res.body.box.picture;

      //GET-send request to view the created box
      cy.request({
        method: 'GET',
        url: '/api/box/' + keyBox,
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('box');
        expect(res.body).to.have.property('admin');
        expect(res.body.box.name).to.equal(nameBox);
        expect(res.body.box.key).to.equal(keyBox);
        expect(res.body.box.picture).to.equal(pictureBox);
        expect(res.body.box.useCashLimit).to.be.false;
        expect(res.body.box.useCircleDraw).to.be.false;
        expect(res.body.box.isInviteAfterDraw).to.be.false;
        expect(res.body.box.useWish).to.be.true;
        expect(res.body.box.useNames).to.be.true;
        expect(res.body.box.isPhoneRequired).to.be.false;
        expect(res.body.box.usePost).to.be.false;
        expect(res.body.admin.username).to.equal(Cypress.env('userName'));
        expect(res.body.admin.email).to.equal(Cypress.env('userEmail'));
      });
    });
  });

  it('Create a box with user settings', () => {
    cy.createBoxUserSet(nameBox2).then((res) => {
      const keyBox2 = res.body.box.key;
      cy.task('save2', keyBox2);
      const pictureBox2 = res.body.box.picture;
      const cashLimit = res.body.box.cashLimit;
      const cashLimitCurrency = res.body.box.cashLimitCurrency;
      //GET-send request to view the created box
      cy.request({
        method: 'GET',
        url: '/api/box/' + keyBox2,
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('box');
        expect(res.body).to.have.property('admin');
        expect(res.body.admin).to.have.deep.property('username');
        expect(res.body.admin).to.have.deep.property('email');
        expect(res.body.box.name).to.equal(nameBox2);
        expect(res.body.box.key).to.equal(keyBox2);
        expect(res.body.box.picture).to.equal(pictureBox2);
        expect(res.body.box.useCashLimit).to.be.true;
        expect(res.body.box.cashLimit).to.equal(cashLimit);
        expect(res.body.box.cashLimitCurrency).to.equal(cashLimitCurrency);
        expect(res.body.box.useCircleDraw).to.be.false;
        expect(res.body.box.isInviteAfterDraw).to.be.false;
        expect(res.body.box.useWish).to.be.true;
        expect(res.body.box.useNames).to.be.true;
        expect(res.body.box.isPhoneRequired).to.be.true;
        expect(res.body.box.usePost).to.be.true;
        expect(res.body.admin.username).to.equal(Cypress.env('userName'));
        expect(res.body.admin.email).to.equal(Cypress.env('userEmail'));
      });
    });
  });

  it('Change the box settings', () => {
    cy.task('load2').then((keyBox2) => {
      cy.changeBoxSet(keyBox2).then((res) => {
        const newnameBox = res.body.box.name;
        const newpicture = res.body.box.picture;
        const cashLimit = res.body.box.cashLimit;
        const cashLimitCurrency = res.body.box.cashLimitCurrency;
        const useCashLimit = res.body.box.useCashLimit;
        const useNames = res.body.box.useNames;
        const isPhoneRequired = res.body.box.isPhoneRequired;
        const usePost = res.body.box.usePost;
        const useWish = res.body.box.useWish;
        //GET-send request to view box changes
        cy.request({
          method: 'GET',
          url: '/api/box/' + keyBox2,
        }).then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body.box.name).to.equal(newnameBox);
          expect(res.body.box.picture).to.equal(newpicture);
          expect(res.body.box.usePost).to.equal(usePost);
          expect(res.body.box.useNames).to.equal(useNames);
          expect(res.body.box.useWish).to.equal(useWish);
          expect(res.body.box.isPhoneRequired).to.equal(isPhoneRequired);
          expect(res.body.box.useCashLimit).to.equal(useCashLimit);
          expect(res.body.box.cashLimit).to.equal(cashLimit);
          expect(res.body.box.cashLimitCurrency).to.equal(cashLimitCurrency);
        });
      });
    });
  });

  it('Remove boxes ', () => {
    cy.request({
      method: 'GET',
      url: '/api/account/boxes',
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.length(2);
    });

    cy.task('load1').then((keyBox) => {
      cy.request({
        method: 'DELETE',
        url: '/api/box/' + keyBox,
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.eq('OK');
      });
    });

    cy.task('load2').then((keyBox2) => {
      cy.request({
        method: 'DELETE',
        url: '/api/box/' + keyBox2,
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.eq('OK');
      });
    });

    cy.request({
      method: 'GET',
      url: '/api/account/boxes',
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.empty;
    });
  });
});

describe('Create box without autorization by API ', () => {
  const nameBox = faker.word.noun();
  const keyBox = faker.word.noun(6);
  it('Create box without autorization', () => {
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
        isCreated: true,
        useNames: true,
        isPhoneRequired: false,
        logo: null,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.error.message).to.eq('Unauthorized');
    });
  });
});
