var audioContext = new AudioContext()
var sourceNode



fetch('brwsr2_fork_compressed.m4a')
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
  .then(audioBuffer => {
    var btnStart = document.getElementById('btn-start')
    var marker = document.getElementById('marker')
    btnStart.disabled = false
    btnStart.addEventListener('click', () => {
      audioContext.resume()

      if (sourceNode) {
        sourceNode.stop()
        sourceNode = null
        btnStart.innerText = 'start'
        btnStart.classList.remove('playing')
        marker.classList.remove('playing')
      } else { 
        sourceNode = audioContext.createBufferSource()
        sourceNode.buffer = audioBuffer
        sourceNode.loop = true
        sourceNode.connect(audioContext.destination)
        sourceNode.start()
        btnStart.innerText = 'stop'
        btnStart.classList.add('playing')
        marker.classList.add('playing')
        marker.style.transform = 'translate(calc(50vw - var(--marker-radius)), calc(50vh - var(--marker-radius)))'

      }
    })
  })
  .catch(e => {
    console.log(e)
  })



var moveMarker = (event) => {
  var marker = document.getElementById('marker')
  if (!sourceNode) return

  var x = event.x || event.touches[0].clientX
  var y = event.y || event.touches[0].clientY

  // var message = document.createElement('p')
  // document.body.appendChild(message)
  // message.innerText = event.touches[0].clientY

  // marker.style.transform = `translate(calc(${x}px - var(--marker-radius)), calc(${y}px - var(--marker-radius)))`
  marker.style.transform = `translate(calc(50vw - var(--marker-radius)), calc(${y}px - var(--marker-radius)))`
}

var modulateAudio = (event) => {
  if (!sourceNode) return

  var percentX = (event.x || event.touches[0].clientX) / window.innerWidth
  var percentY = (event.y || event.touches[0].clientY) / window.innerHeight

  sourceNode.playbackRate.linearRampToValueAtTime(.5 + percentY, audioContext.currentTime + .1)
}

var mouseMove = (event) => {
  event.preventDefault()
  moveMarker(event)
  modulateAudio(event)
}

window.addEventListener('mousedown', (event) => {
  document.body.style.cursor = 'crosshair'
  window.onmousemove = mouseMove
})

window.addEventListener('mouseup', (event) => {
  document.body.style.cursor = 'unset'
  window.onmousemove = null
})

window.ontouchstart = mouseMove
