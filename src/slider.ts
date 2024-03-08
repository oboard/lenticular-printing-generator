import { BuderState, BuderWidget, _Input } from "buder";

export interface SliderOptions {
  min: number;
  max: number;
  step: number;
}

export class _Slider extends BuderWidget {
  _options?: SliderOptions;
  _type = "slider";
  _tag = "input";

  _model?: BuderState<string>;
  constructor(model?: BuderState<string>, options?: SliderOptions) {
    super();
    if (!model) return;

    this._model = model;
    this._options = options;

    this.attribute({ value: model.value });
    this.event({
      input: (e: any) => {
        model.value = (e.target as HTMLInputElement).value;
      },
    });
  }

  render() {
    const el = document.createElement(this._tag) as HTMLInputElement;
    el.type = "range";
    el.min = this._options?.min.toString() || "0";
    el.max = this._options?.max.toString() || "100";
    el.step = this._options?.step.toString() || "1";

    this._model?.subscribe((newValue) => {
      if (el) {
        el.value = newValue;
      }
    });
    el.value = this._model?.value ?? "";

    return super.render(el);
  }
}

export const Slider = (value: BuderState<string>, options: SliderOptions) =>
  new _Slider(value, options);
