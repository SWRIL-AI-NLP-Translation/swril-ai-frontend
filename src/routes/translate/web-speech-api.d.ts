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
  
  declare var webkitSpeechRecognition: {
    prototype: SpeechRecognition;
    new (): SpeechRecognition;
  };
  