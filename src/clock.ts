import { interval, map, Subscription } from 'rxjs'

export class Clock {
  private display: HTMLInputElement
  private subscription: Subscription | null = null

  constructor(root: HTMLElement) {
    root.innerHTML = `
      <div class="reloj calculadora">
        <h3>Reloj</h3>
        <div class="botones teclado">
          <button class="start">Start</button>
          <button class="stop">Stop</button>
        </div>
        <div class="display">
            <input type="text" class="display-input" value="0" disabled />
        </div>
      </div>`

    this.display = root.querySelector('.display-input')!
    root.querySelector('.start')!.addEventListener('click', () => this.start())
    root.querySelector('.stop')!.addEventListener('click', () => this.stop())
  }

  private start() {
    if (this.subscription) return
    this.display.value = new Date().toLocaleTimeString()
    this.subscription = interval(1000)
      .pipe(map(() => new Date().toLocaleTimeString()))
      .subscribe((hora) => {
        this.display.value = hora
      })
  }

  private stop() {
    this.subscription?.unsubscribe()
    this.subscription = null
  }
}
