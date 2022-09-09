import { newSpecPage } from '@stencil/core/testing';
import { ExampleDialog } from './example-dialog';

describe('example-dialog', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ExampleDialog],
      html: `<example-dialog></example-dialog>`,
    });
    expect(page.root).toEqualHtml(`
      <example-dialog>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </example-dialog>
    `);
  });
});
