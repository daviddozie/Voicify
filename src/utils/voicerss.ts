export const getVoiceRSSAudio = async (text: string, language: string, voiceType: string): Promise<string | null> => {
    const API_KEY = '941b4a923ee9426095ab767ef420c6ad';
    const voice = voiceType === "male" ? "Mike" : "Sally";
  
    const url = `https://api.voicerss.org/?key=${API_KEY}&hl=${language}&v=${voice}&src=${encodeURIComponent(text)}&c=mp3`;
  
    try {
      const response = await fetch(url);
  
      if (response.ok) {
        const audioBlob = await response.blob();
  
        const audioUrl = URL.createObjectURL(audioBlob);
  
        console.log("Audio URL received:", audioUrl);
        return audioUrl;
      } else {
        console.error(`Failed to fetch audio. Response status: ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error("Error fetching audio:", error);
      return null;
    }
  };
  