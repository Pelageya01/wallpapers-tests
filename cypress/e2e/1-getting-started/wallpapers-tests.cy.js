
describe('searching and downloading free wallpapers', () => {

  function checkFileIsDownload() {
    cy.get('h1').invoke('text').then((wallpaperTitle) => {
    const fileName = wallpaperTitle
      .normalize('NFD')
      .replace(/[\u0300-\u036f]|[^\w\s]/g, '') 
      .trim().replace(/\s+/g, '_')
      .toLowerCase(); 

    cy.readFile(`${Cypress.config('downloadsFolder')}/${fileName}.jpg`)
      .should('exist');
      });
    }

    function navigateToWallpapersSelection() {
      cy.get('a').contains('Browse Now').click();
      cy.get('a').contains('Wallpapers').click();
    }
  
    function clickDownloadAndWaitForAd() {
      cy.get('button').contains('Download Free').click({ force: true });

      cy.contains('Preparing your download').should('be.visible');
      cy.contains('Preparing your download', { timeout: 20000 }).should('not.exist');
    }

    function selectRandomWallpaper() {
      cy.get('a[aria-label]').eq(Math.random()*24|0).click({force:true});
    }

  context('1280x800 screen resolution', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.viewport(1280, 720)
    })
    
    it('should download wallpapers - bigger screen resolution', () => {

    navigateToWallpapersSelection();
 
    cy.get('button').contains('Price').click();

    // selecting free option
    cy.get('div[role="option"]').contains('Free').click();

    cy.get('button').contains('Price').invoke('css', 'pointer-events', 'auto');
    cy.get('button').contains('Price').click({force: true});
    cy.wait(1000);

    selectRandomWallpaper();

    clickDownloadAndWaitForAd();  
    checkFileIsDownload();

    })
  })

  context('ipad-mini resolution', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.viewport(768, 1024)
    })

    it('should download wallpapers -  smaller screen resolution', () => {

    navigateToWallpapersSelection();

    cy.get('button').contains('Filters').click();
    cy.get('button[value="Price"]').click();

    // selecting free option
    cy.get('button[id="free"]').should('be.visible').click();

    cy.get('button').contains('Show Results').click();
    cy.wait(1000);

    selectRandomWallpaper();    

    clickDownloadAndWaitForAd();
    checkFileIsDownload();
  
    })
  })
})
