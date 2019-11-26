try {
  var AudioContext = window.AudioContext || window.webkitAudioContext
  var audioContext = new AudioContext()
} catch(e) {
  console.log(e)
  var pre = document.createElement('p')
  pre.innerText = e + '\n' + JSON.stringify(e, null, 2)
  document.body.appendChild(pre)
}

fetch('brwsr2_fork_compressed.m4a')
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => audioContext.decodeAudioData(
    arrayBuffer,
    (buffer) => resolve(buffer))
  )
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
  .catch(e => {
    console.log(e)
    var pre = document.createElement('p')
    pre.innerText = e + '\n' + JSON.stringify(e, null, 2)
    document.body.appendChild(pre)
  })