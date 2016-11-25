import config from 'config';
import fs from 'fs';
import path from 'path';
import watson from 'watson-developer-cloud';

const setup = config.get('speech_setup');

const params = {
  content_type: 'audio/wav',
  model: 'es-ES_BroadbandModel',
  continuous: true,
  interim_results: true,
  word_confidence: true,
  max_alternatives: 1
};

const speech2Text = watson.speech_to_text(setup);
const recognizeStream = speech2Text.createRecognizeStream(params);

fs.readdirSync(path.join(__dirname, '..', 'audios')).forEach(function (file) {
  if (file.endsWith('.wav')) {
    fs.createReadStream(path.join(__dirname, '../audios', file)).pipe(recognizeStream);
    recognizeStream.pipe(fs.createWriteStream(path.join(__dirname, '../texts', file.replace('.wav, .txt'))));

    recognizeStream.setEncoding('utf8');

    recognizeStream.on('data', function(event) { onEvent('Data:', event); });
    recognizeStream.on('results', function(event) { onEvent('Results:', event); });
    recognizeStream.on('end', function(event) { onEvent('End:', event); });
    recognizeStream.on('error', function(event) { onEvent('Error:', event); });
    recognizeStream.on('close', function(event) { onEvent('Close:', event); process.exit(); });
  }
});

function onEvent(name, event) {
  console.log(name, name != 'End:' ? JSON.stringify(event, null, 2) : 'End of transcription');
}
