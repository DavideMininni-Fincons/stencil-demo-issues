import { Component, Element, Host, h, State, ComponentInterface } from '@stencil/core';

@Component({
  tag: 'example-slot-container',
  styleUrl: 'example-slot-container.css',
  shadow: true,
})
export class ExampleSlotContainer implements ComponentInterface {
  @State() private _slottedChildren: HTMLExampleSlotElement[];

  @State() private _hasEllipsis: boolean;

  @Element() private _element!: HTMLElement;

  public connectedCallback(): void {
    this._readChild();
  }

  private _readChild() {
    const children = Array.from(this._element.children).filter(
      (e): e is HTMLExampleSlotElement => e.tagName === 'EXAMPLE-SLOT'
    );
    if (
      this._slottedChildren &&
      children.length === this._slottedChildren.length &&
      this._slottedChildren.every((e, i) => children[i] === e)
    ) {
      return;
    }
    this._slottedChildren = children;
  }

  componentDidLoad(): void {
    const li = this._element.shadowRoot.querySelectorAll('li:not(#example-slot-ellipsis)');
    const linksWidth = Array.from(li).map(e => e.clientWidth).reduce((a, b) => a + b, 0) + 10 * (li.length - 1);
    this._hasEllipsis = this._slottedChildren && this._slottedChildren.length > 2 && this._element.clientWidth < linksWidth;
  }

  private _expand() {
    this._hasEllipsis = true;
  }

  render() {
    const slotName = (index): string => `child-${index}`;
    this._slottedChildren.forEach((child, index) =>
      child.setAttribute('slot', slotName(index))
    );

    const links = this._slottedChildren.map((_, index) => (
      <li class="item">
        <slot name={slotName(index)} onSlotchange={(): void => this._readChild()} />
        {index !== this._slottedChildren.length - 1 && (<span>/</span>)}
      </li>
    ));

    if (this._hasEllipsis) {
      const ellipsis = (
        <li id="ellipsis" class="item">
          <example-slot id="example-slot-ellipsis" onClick={() => this._expand()}>&hellip;</example-slot>
          <span>/</span>
        </li>
      );
      links.splice(1, links.length - 2, ellipsis);
    }

    return (
      <Host>
        <ol class="group">{links}</ol>
        <span hidden>
          <slot onSlotchange={(): void => this._readChild()} />
        </span>
      </Host>
    );
  }

}
