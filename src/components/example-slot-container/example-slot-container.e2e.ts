import { newE2EPage } from '@stencil/core/testing';

describe('example-slot-container', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<example-slot-container></example-slot-container>');

    const element = await page.find('example-slot-container');
    expect(element).toHaveClass('hydrated');
  });
});
