
import path from 'path';
import say from 'say';

export function textToSpeech(data_dir, text) {
    const file = path.join(data_dir, "test.wav");
    // https://github.com/Marak/say.js

    let promise = new Promise((resolve, reject) => {
        say.export(text, 'Alex', 1, file, (err) => {
            if (err) {
                return console.error(err)
            }
            console.log('Text has been saved to hal.wav.')
            resolve(file);
        });
    });
    return promise;
}