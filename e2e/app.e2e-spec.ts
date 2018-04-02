import { MuniAdminPage } from './app.po';

describe('muni-admin App', () => {
  let page: MuniAdminPage;

  beforeEach(() => {
    page = new MuniAdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
