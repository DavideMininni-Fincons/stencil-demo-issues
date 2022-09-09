import { Component, h } from '@stencil/core';

@Component({
  tag: 'example-slot',
  styleUrl: 'example-slot.css',
  shadow: true,
})
export class ExampleSlot {

  render() {
    return (
      <div class="breadcrumb">
        <slot></slot>
      </div>
    );
  }

}
