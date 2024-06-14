
let utterances = [];
let timeoutId = null; 
// Function to handle text-to-speech processing as a service
export const speak = (word, sentence) => {
    return new Promise(async (resolve, reject) => {
        await cancelSpeech();
        
        const texts = [word, sentence];
        
        texts.forEach((text, index) => {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.lang = 'en-US';

            utterance.onstart = () => {
                // console.log(`Speaking: ${text}`);
            };

            utterance.onend = () => {
                // console.log(`Finished speaking: ${text}`);
            };
            utterance.onerror = async (err) => {
                console.log(err);
                reject(err);
            }

            utterances.push(utterance);
        });

        // Start speaking the utterances with delay
        window.speechSynthesis.speak(utterances[0]);
        
        utterances[1].onstart = async () => {
            utterances[0] = null;
        };

        utterances[0].onend = async () => {
            timeoutId = setTimeout(() => {
                if (utterances[1]) {
                    window.speechSynthesis.speak(utterances[1]);
                }
            }, 1000);
        };

        utterances[1].onend = async () => {
            await cancelSpeech();
            resolve('aa');
        }
    });
};

// Cancel all utterances
export const cancelSpeech = () => {
    return new Promise(async (resolve, reject) => {
        window.speechSynthesis.cancel();
        utterances = [];

        if (timeoutId !== null) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        resolve();
    });
};
