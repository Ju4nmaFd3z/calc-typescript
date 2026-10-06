export class Clock {

    constructor(root: HTMLElement) {
        root.innerHTML = `
      <div class="reloj">
        <div class="display">
            <input type="text" class="display-input" value="0" disabled />
        </div>
      </div>`
    }
}