declare interface SpeechRecognition {
	continuous: boolean;
	interimResults: boolean;
	start(): void;
	stop(): void;
}

// declare var SpeechRecognition: {
//   prototype: SpeechRecognition;
//   new (): SpeechRecognition;
// };

declare const webkitSpeechRecognition: {
	prototype: SpeechRecognition;
	new (): SpeechRecognition;
};
