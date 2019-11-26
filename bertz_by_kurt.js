var audioContext = new AudioContext()
var sourceNode

fetch('brwsr2_fork_compressed.m4a')
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
  .then(audioBuffer => {
    var btnStart = document.getElementById('btn-start')
    btnStart.disabled = false
    btnStart.addEventListener('click', () => {
      if (sourceNode) {
        sourceNode.stop()
        sourceNode = null
        btnStart.innerText = 'start'
      } else { 
        sourceNode = audioContext.createBufferSource()
        sourceNode.buffer = audioBuffer
        sourceNode.loop = true
        sourceNode.connect(audioContext.destination)
        sourceNode.start()
        btnStart.innerText = 'stop'
      }
    })
  })
  .catch(e => {
    console.log(e)
  })

var modulateAudio = (event) => {
  if (!sourceNode) return

  var percentX = (event.x || event.touches[0].clientX) / window.innerWidth
  var percentY = (event.y || event.touches[0].clientY) / window.innerHeight

  sourceNode.playbackRate.value = .5 + percentY
}

window.addEventListener('mousedown', (event) => {
  window.onmousemove = modulateAudio
})

window.addEventListener('mouseup', (event) => {
  window.onmousemove = null
})

window.ontouchstart = modulateAudio
