if (!('webkitSpeechRecognition' in window)) {
  console.log("Not Supported");
} else {
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  console.log("Supported");
  recognition.lang = "en-US"; 
  recognition.maxAlternatives = 1;
}

recognition.onstart = function() {
};

recognition.onend = function() {
  element_ = "start-button";
  document.getElementById("start-button").style.backgroundColor = "#fff";
  document.getElementById("start-button").style.color = "#007bff";
};

recognition.onresult = function(event) {
  for (var i = event.resultIndex; i < event.results.length; ++i) {      
        if (event.results[i].isFinal) { 
            document.getElementById("transcript").value = event.results[i][0].transcript;
            recognition.stop();
        }
    }
};

function startButton(event) {
  recognition.start();
  document.getElementById("start-button").style.backgroundColor = "#007bff";
  document.getElementById("start-button").style.color = "#fff";
}

function stopButton(event) {
  recognition.stop();
}
