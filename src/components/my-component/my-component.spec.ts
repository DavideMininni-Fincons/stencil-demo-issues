import { newSpecPage } from '@stencil/core/testing';
import { MyComponent } from './my-component';

describe('my-component', () => {

  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [MyComponent],
      html: `
        <my-component>
          <input disabled slot="input" placeholder="Test">
        </my-component>
      `,
    });
    expect(root).toEqualHtml(`
      <my-component class="disabled">
        <mock:shadow-root>
          <div class='input-wrapper'>
           <label class="input-label" for="my-component-0">
            Label my-component-0
           </label>
           <slot name="input"/>
          </div>
        </mock:shadow-root>
        <input disabled slot="input" placeholder="Test">
      </my-component>
    `);
  });
});
