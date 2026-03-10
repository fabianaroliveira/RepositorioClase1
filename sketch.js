let mic;
let started = false;
let speechRec;
let saidText = "";

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER);
  textSize(20);
}

function mousePressed() {
  if (!started) {
    // Ativar áudio do microfone
    userStartAudio();
    mic = new p5.AudioIn();
    mic.start();

    // Configurar reconhecimento de voz (necessário p5.speech)
    speechRec = new p5.SpeechRec('pt-PT', gotSpeech);
    speechRec.start(true, false); // contínuo=false, intercalado=false

    started = true;
  }
}

function gotSpeech() {
  if (speechRec.resultValue) {
    saidText = speechRec.resultString;
  }
}

function draw() {
  background(30);

  if (started) {
    let vol = mic.getLevel();
    let size = map(vol, 0, 0.3, 10, 300);

    fill(0, 200, 255);
    ellipse(width / 2, height / 2, size);

    fill(255);
    text("Volume: " + vol.toFixed(3), width / 2, 40);

    fill(255, 255, 0);
    textSize(24);
    text("Disseste: " + saidText, width / 2, height - 50);
  } else {
    fill(255);
    text("Clica no ecrã para ativar o microfone 🎤", width / 2, height / 2);
  }
}