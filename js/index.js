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