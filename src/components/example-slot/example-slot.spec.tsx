import { newSpecPage } from '@stencil/core/testing';
import { ExampleSlot } from './example-slot';

describe('example-slot', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ExampleSlot],
      html: `<example-slot></example-slot>`,
    });
    expect(page.root).toEqualHtml(`
      <example-slot>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </example-slot>
    `);
  });
});
