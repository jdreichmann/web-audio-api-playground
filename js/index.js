let audioContext = new AudioContext()

console.log('Loading')

document.addEventListener('DOMContentLoaded', event => {
  console.log('DOM ready', event)
  registerButtons()
})

const registerButtons = () => {
  document.querySelector('button.newGain').addEventListener('click', (event) => {
    getNewGain(audioContext, window.prompt('New Gain Label?'))
  })
  document.querySelector('button.newOscillator').addEventListener('click', (event) => {
    getNewOscillator(audioContext, 'sine', window.prompt('New Oscillator Label?'))
  })
}

const addElement = element => document.querySelector('#elements').appendChild(element)

const getNewGain = (ctx, label = 'Untitled') => {
  const gainNode = ctx.createGain()
  gainNode.connect(ctx.destination)
  const gainControl = document.createElement('input')
  gainControl.setAttribute('type', 'range')
  gainControl.defaultValue = 0.5
  gainControl.min = 0
  gainControl.max = 1
  gainControl.step = 0.05
  gainControl.addEventListener('change', event => {
    gainNode.gain.value = gainControl.value
  })
  const labelNode = document.createElement('label')
  const labelText = document.createTextNode(label)
  labelNode.appendChild(labelText)
  const container = document.createElement('div')
  container.appendChild(labelText)
  container.appendChild(gainControl)
  addElement(container)
}

const getNewOscillator = (ctx, type = 'sine', label = 'Untitled') => {
  const osciNode = ctx.createOscillator()
  osciNode.connect(ctx.destination)
  osciNode.type = type
  const osciControl = document.createElement('input')
  osciControl.setAttribute('type', 'range')
  osciControl.defaultValue = 1000
  osciControl.min = 100
  osciControl.max = 5000
  osciControl.step = 100
  osciControl.addEventListener('change', event => {
    osciNode.frequency.value = osciControl.value
  })
  const labelNode = document.createElement('label')
  const labelText = document.createTextNode(label)
  labelNode.appendChild(labelText)
  const container = document.createElement('div')
  container.appendChild(labelText)
  container.appendChild(osciControl)
  addElement(container)
  osciNode.start()
}

class MoveableAudioSource {
  constructor(audioContext) {
    this.audioContext = audioContext
    this.gain = audioContext.createGain()
    this.gain.connect(this.audioContext.destination)
    this.oscillator = audioContext.createOscillator()
    this.oscillator.connect(this.gain)
  }

  _createContainer() {
    const container = document.createElement('div')
    container.appendChild(this._createFrequencySlider())
    container.appendChild(this._createGainSlider())
    return ``
  }

  _createFrequencySelector() {
    const label = document.createElement('label')
    const freq = document.createElement('input')
    freq.setAttribute('type', 'number')
    freq.min = 0
    freq.max = 50000
    freq.addEventListener('change', event => {
      this.oscillator.frequency.value = freq.value
    })
    label.appendChild(document.createTextNode('Freq: '))
    label.appendChild(freq)
    return label
  }

  _createGainSlider() {
    const label = document.createElement('label')
    const slider = document.createElement('input')
    slider.setAttribute('type', 'range')
    slider.min = 0
    slider.max = 1
    slider.defaultValue = 0.45
    slider.step = 0.01
    slider.addEventListener('change', event => {
      this.gain.gain.value = slider.value
    })
    label.appendChild(document.createTextNode('Gain: '))
    label.appendChild(slider)
    return label
  }
}
