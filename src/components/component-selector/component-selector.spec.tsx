import { newSpecPage } from '@stencil/core/testing';
import { ComponentSelector } from './component-selector';

describe('component-selector', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ComponentSelector],
      html: `
        <component-selector>
            <button>Hello</button>
        </component-selector>`,
    });
    expect(page.root).toEqualHtml(`
      <component-selector>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        <button>Hello</button>
      </component-selector>
    `);
  });
});
