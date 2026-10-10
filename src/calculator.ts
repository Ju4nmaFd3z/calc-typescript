export class Calculator {
  private current = '0'
  private last = '0'
  private operation = ''
  private reset = false
  private display: HTMLInputElement

  constructor(root: HTMLElement, title: string) {
    root.innerHTML = `
      <div class="calculadora">
        <h3>${title}</h3>
        <div class="display">
          <input type="text" class="display-input" value="0" disabled />
        </div>
        <div class="teclado">
          <button class="delete span-two" data-key="DEL">DEL</button>
          <button class="reset" data-key="C">C</button>
          <button class="operation" data-key="sign">+/-</button>
          <button class="operation" data-key="square">x²</button>
          <button class="operation" data-key="sqrt">√x</button>
          <button class="operation" data-key="inverse">1/x</button>
          <button class="operation" data-key="+">+</button>
          <button class="number" data-key="7">7</button>
          <button class="number" data-key="8">8</button>
          <button class="number" data-key="9">9</button>
          <button class="operation" data-key="-">-</button>
          <button class="number" data-key="4">4</button>
          <button class="number" data-key="5">5</button>
          <button class="number" data-key="6">6</button>
          <button class="operation" data-key="*">*</button>
          <button class="number" data-key="1">1</button>
          <button class="number" data-key="2">2</button>
          <button class="number" data-key="3">3</button>
          <button class="operation" data-key="/">/</button>
          <button class="equals span-two" data-key="=">=</button>
          <button class="number" data-key="0">0</button>
          <button class="decimal" data-key=".">.</button>
        </div>
      </div>`
    this.display = root.querySelector('.display-input')!
    root.addEventListener('click', (e) => {
      const key = (e.target as HTMLElement).dataset.key
      if (key) {
        this.press(key)
        this.display.value = this.current
      }
    })
  }

  private press(key: string): void {
    const n = parseFloat(this.current)
    if (/^\d$/.test(key)) this.digit(key)
    else if (key === '.') this.decimal()
    else if (key === 'C') this.clear()
    else if (key === 'DEL') this.current = this.current.length === 1 ? '0' : this.current.slice(0, -1)
    else if (key === '=') this.equals()
    else if ('+-*/'.includes(key)) this.binary(key)
    else if (key === 'sign') {
      if (this.current !== '0') this.current = this.current.startsWith('-') ? this.current.slice(1) : '-' + this.current
    } else if (key === 'square') this.unary(n * n)
    else if (key === 'sqrt') this.unary(n >= 0 ? Math.sqrt(n) : 'Error')
    else if (key === 'inverse') this.unary(n !== 0 ? 1 / n : 'Error')
  }

  private digit(d: string): void {
    if (this.reset) {
      this.current = d
      this.reset = false
    } else if (this.current === '0') this.current = d
    else this.current += d
  }

  private decimal(): void {
    if (this.reset) {
      this.current = '0.'
      this.reset = false
    } else if (!this.current.includes('.')) this.current += '.'
  }

  private clear(): void {
    this.current = '0'
    this.last = '0'
    this.operation = ''
    this.reset = false
  }

  private unary(result: number | string): void {
    this.current = result.toString()
    this.reset = true
  }

  private calculate(): number {
    const a = parseFloat(this.last)
    const b = parseFloat(this.current)
    switch (this.operation) {
      case '+': return a + b
      case '-': return a - b
      case '*': return a * b
      case '/': return b !== 0 ? a / b : 0
      default: return b
    }
  }

  private binary(op: string): void {
    if (this.operation && !this.reset) this.current = this.calculate().toString()
    this.last = this.current
    this.operation = op
    this.reset = true
  }

  private equals(): void {
    if (!this.operation) return
    this.current = this.calculate().toString()
    this.last = '0'
    this.operation = ''
    this.reset = true
  }
}
