import {Component, h, Host, Element, State} from '@stencil/core';

let nextId = 0;

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss',
  shadow: true,
})
export class MyComponent {

  @Element() private _element: HTMLElement;

  @State() private _disabled: boolean;

  private _input: HTMLInputElement | HTMLSelectElement | HTMLElement;

  private _onSlotInputChange(): void {
    this._input = this._element.querySelector('[slot="input"]');
    if (this._input) {
      this._disabled = this._input.hasAttribute('disabled');
      if (!this._input.id) {
        this._input.setAttribute('id', `my-component-${nextId++}`);
      }
    }
  }

  render() {
    return (
      <Host class={{'disabled': this._disabled}}>
        <div class='input-wrapper'>
          <label class='input-label' htmlFor={this._input?.id}>
            Label {this._input?.id}
          </label>
          <slot name="input" onSlotchange={this._onSlotInputChange.bind(this)}/>
        </div>
      </Host>
    );
  }
}
