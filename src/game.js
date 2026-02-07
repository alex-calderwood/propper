export default class Game {
    constructor(params) {
        this.params = {
            ui: null,
            ...params
        }

        if (!this.params.ui) {
            throw new Error('Game: UI is required', this.params.ui);
        }

        this.ui = this.params.ui;

        this.ui.onUserAction = this.onUserAction.bind(this);
    }

    speak(audioBlob) {
        audioBlob.arrayBuffer()
        .then(audioBuffer => {
            // Create audio context if it doesn't exist
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            
            // Decode and play the audio
            return this.audioContext.decodeAudioData(audioBuffer);
        })
        .then(decodedAudio => {
            const source = this.audioContext.createBufferSource();
            source.buffer = decodedAudio;
            source.connect(this.audioContext.destination);
            source.start(0);
        });
    }

    onUserAction(action, data) {
        console.log("Request: ", { text: action });
        
        fetch('/api/dialogue', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: action }),
        })
        .then(response => response.blob())
        .then(audioBlob => this.speak(audioBlob));
    }

}