import { interval, Subscription } from 'rxjs'

export class Temporizer {
  private input: HTMLInputElement
  private display: HTMLInputElement
  private subscription: Subscription | null = null
  private seconds = 0

  constructor(root: HTMLElement) {
    root.innerHTML = `
      <div class="temporizador">
        <h3>Temporizador</h3>
        <div class="botones">
          <button class="start">Start</button>
          <button class="stop">Stop</button>
          <button class="reset">Reset</button>
        </div>
        <div class="input">
          <input type="text" class="input-seconds" placeholder="Segundos" />
        </div>
        <div class="display">
          <input type="text" class="display-input" value="0" disabled />
        </div>
      </div>`

    this.input = root.querySelector('.input-seconds')!
    this.display = root.querySelector('.display-input')!
    root.querySelector('.start')!.addEventListener('click', () => this.start())
    root.querySelector('.stop')!.addEventListener('click', () => this.stop())
    root.querySelector('.reset')!.addEventListener('click', () => this.reset())
  }

  private start() {
    if (this.subscription) return
    if (this.seconds === 0) {
      this.seconds = Number(this.input.value) || 0
    }
    if (this.seconds <= 0) return
    let startTime = Date.now()
    let startSeconds = this.seconds
    this.display.value = this.seconds.toString()
    this.subscription = interval(1000).subscribe(() => {
      this.seconds = Math.max(startSeconds - Math.floor((Date.now() - startTime) / 1000), 0)
      this.display.value = this.seconds.toString()
      if (this.seconds === 0) {
        this.stop()
      }
    })
  }

  private stop() {
    this.subscription?.unsubscribe()
    this.subscription = null
  }

  private reset() {
    this.stop()
    this.seconds = 0
    this.input.value = ''
    this.display.value = '0'
  }
}
