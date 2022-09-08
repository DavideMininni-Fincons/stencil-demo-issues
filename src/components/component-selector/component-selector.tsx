import {Component, Host, h, ComponentInterface, Element} from '@stencil/core';

@Component({
  tag: 'component-selector',
  styleUrl: 'component-selector.css',
  shadow: true,
})
export class ComponentSelector implements ComponentInterface {
  @Element() private _element: HTMLElement;

  componentDidLoad() {
    const buttons: NodeListOf<Element> = this._element.querySelectorAll('button:not([disabled])');
    buttons.forEach((el: Element) => el.addEventListener('click', () => console.log('Clicked')))
  }

  render() {
    return (
      <Host>
        <slot/>
      </Host>
    );
  }

}
