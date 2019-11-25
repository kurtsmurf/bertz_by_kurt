var audioContext = new AudioContext()

fetch('bert.m4a')
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
  .then(audioBuffer => {
    var sourceNode
    var isPlaying = false
    var btnStart = document.getElementById('btn-start')

    btnStart.disabled = false
    btnStart.addEventListener('click', () => {
      if (isPlaying) {
        sourceNode.stop()
        sourceNode.des
        isPlaying = false
        btnStart.innerText = 'start'
      } else { 
        sourceNode = audioContext.createBufferSource()
        sourceNode.buffer = audioBuffer
        sourceNode.loop = true
        sourceNode.connect(audioContext.destination)
        sourceNode.start()
        isPlaying = true
        btnStart.innerText = 'stop'
      }
    })
  })