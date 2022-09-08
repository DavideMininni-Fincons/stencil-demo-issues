import { newE2EPage } from '@stencil/core/testing';

describe('component-selector', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<component-selector></component-selector>');

    const element = await page.find('component-selector');
    expect(element).toHaveClass('hydrated');
  });
});
