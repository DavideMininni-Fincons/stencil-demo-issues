import {
  Component,
  ComponentInterface,
  Element,
  h,
  JSX,
  Method,
  Prop,
} from '@stencil/core';

@Component({
  tag: 'example-dialog',
  styleUrl: 'example-dialog.css',
  shadow: true,
})
export class ExampleDialog implements ComponentInterface {
  @Element() public el!: HTMLElement;

  @Prop() public trigger: string | HTMLElement;

  private _triggerEl: HTMLElement;

  private _triggerController: AbortController;

  private _dialog: HTMLDialogElement;

  @Method()
  public async openDialog(): Promise<void> {
    this._dialog.showModal();
  }

  @Method()
  public async closeDialog(): Promise<void> {
    this._dialog.close();
  }

  private static _isElement(o: string | HTMLElement): boolean {
    return o instanceof window.Element;
  }

  private _configureTriggerElement(trigger: string | HTMLElement): void {
    if (!trigger) {
      return;
    }

    if (typeof trigger === 'string') {
      this._triggerEl = document.getElementById(trigger);
    } else if (ExampleDialog._isElement(trigger)) {
      this._triggerEl = trigger;
    }

    if (this._triggerEl) {
      this._triggerController = new AbortController();
      this._triggerEl.addEventListener('click', () => this.openDialog(), {
        signal: this._triggerController.signal,
      });
    }
  }

  public componentDidLoad(): void {
    this._dialog = this.el.shadowRoot.querySelector('dialog');
    this._configureTriggerElement(this.trigger);
    this._dismissOnBackdropClick();
  }

  private _dismissOnBackdropClick(): void {
    this._dialog.addEventListener('click', (event: MouseEvent) => {
      const rect = this._dialog.getBoundingClientRect();
      const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;

      if (!isInDialog) {
        this.closeDialog();
      }
    });
  }

  public render(): JSX.Element {
    return (
      <dialog>
        <div class="content">
          <slot/>
        </div>
        <div>
          <button type='button' onClick={this.closeDialog.bind(this)}>Close</button>
        </div>
      </dialog>
    );
  }
}
