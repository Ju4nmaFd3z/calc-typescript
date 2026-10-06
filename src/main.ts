import './style.css'
import { Calculator } from './calculator'
import { Clock } from './clock'
import { Chronometer } from './chronometer'
import { Temporizer } from './temporizer'

// Calculadoras

new Calculator(document.querySelector<HTMLElement>('#calc1')!)
new Calculator(document.querySelector<HTMLElement>('#calc2')!)

// Herramientas

new Clock(document.querySelector<HTMLElement>('#reloj')!)
new Chronometer(document.querySelector<HTMLElement>('#cronometro')!)
new Temporizer(document.querySelector<HTMLElement>('#temporizador')!)
