import { interval, Subscription } from 'rxjs'

export class Chronometer {
  private display: HTMLInputElement
  private subscription: Subscription | null = null
  private seconds = 0

  constructor(root: HTMLElement) {
    root.innerHTML = `
      <div class="cronometro calculadora">
        <h3>Cronómetro</h3>
        <div class="botones teclado">
          <button class="start">Start</button>
          <button class="stop">Stop</button>
          <button class="reset">Reset</button>
        </div>
        <div class="display">
            <input type="text" class="display-input" value="0" disabled />
        </div>
      </div>`

    this.display = root.querySelector('.display-input')!
    root.querySelector('.start')!.addEventListener('click', () => this.start())
    root.querySelector('.stop')!.addEventListener('click', () => this.stop())
    root.querySelector('.reset')!.addEventListener('click', () => this.reset())
  }

  private start() {
    if (this.subscription) return
    let startTime = Date.now()
    this.subscription = interval(1000).subscribe(() => {
      this.seconds = Math.floor((Date.now() - startTime) / 1000)
      this.display.value = this.seconds.toString()
    })
  }

  private stop() {
    this.subscription?.unsubscribe()
    this.subscription = null
  }

  private reset() {
    this.stop()
    this.seconds = 0
    this.display.value = '0'
  }
}
