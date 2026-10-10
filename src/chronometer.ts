export class Chronometer {
  constructor(root: HTMLElement) {
    root.innerHTML = `
      <div class="cronometro">
        <div class="botones">
          <button class="start">Start</button>
          <button class="stop">Stop</button>
          <button class="reset">Reset</button>
        </div>
        <div class="display">
          <input type="text" class="display-input" value="0" disabled />
        </div>
      </div>`
  }
}
