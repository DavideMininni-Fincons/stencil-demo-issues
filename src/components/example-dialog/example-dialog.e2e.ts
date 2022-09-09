import { newE2EPage } from '@stencil/core/testing';

describe('example-dialog', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<example-dialog></example-dialog>');

    const element = await page.find('example-dialog');
    expect(element).toHaveClass('hydrated');
  });
});
