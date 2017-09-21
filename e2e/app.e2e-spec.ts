import { SmartPage } from './app.po';

describe('smart App', function() {
  let page: SmartPage;

  beforeEach(() => {
    page = new SmartPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
