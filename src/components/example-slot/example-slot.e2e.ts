import { newE2EPage } from '@stencil/core/testing';

describe('example-slot', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<example-slot></example-slot>');

    const element = await page.find('example-slot');
    expect(element).toHaveClass('hydrated');
  });
});
