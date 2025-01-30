export const getVoiceRSSAudio = async (text: string, language: string, voiceType: string): Promise<string | null> => {
    const API_KEY = '941b4a923ee9426095ab767ef420c6ad'; // Your VoiceRSS API key
    const voice = voiceType === "male" ? "Mike" : "Sally"; // Male and Female voices
  
    // Construct the VoiceRSS API URL
    const url = `https://api.voicerss.org/?key=${API_KEY}&hl=${language}&v=${voice}&src=${encodeURIComponent(text)}&c=mp3`;
  
    try {
      // Make the request to VoiceRSS API
      const response = await fetch(url);
  
      if (response.ok) {
        const audioBlob = await response.blob();  // Get the response as a blob (binary data)
  
        // Create a URL for the audio blob
        const audioUrl = URL.createObjectURL(audioBlob);
  
        console.log("Audio URL received:", audioUrl); // Log to confirm it’s correct
        return audioUrl; // This is the URL you can use to play the audio
      } else {
        console.error(`Failed to fetch audio. Response status: ${response.status}`);
        return null;
      }
    } catch (error) {
      // If there is an error during the fetch process, log it
      console.error("Error fetching audio:", error);
      return null;
    }
  };
  