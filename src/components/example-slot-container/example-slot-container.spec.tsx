import { newSpecPage } from '@stencil/core/testing';
import { ExampleSlotContainer } from './example-slot-container';

describe('example-slot-container', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ExampleSlotContainer],
      html: `<example-slot-container></example-slot-container>`,
    });
    expect(page.root).toEqualHtml(`
      <example-slot-container>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </example-slot-container>
    `);
  });
});
