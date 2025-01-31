export const getVoiceRSSAudio = async (
  text: string,
  language: string,
  voiceType: string
): Promise<string | null> => {
  const API_KEY = process.env.NEXT_PUBLIC_VOICERSS_API_KEY;

  const voiceMap: { [key: string]: { male: string; female: string } } = {
    "en-us": { male: "Mike", female: "Linda" },
    "en-gb": { male: "John", female: "Emma" },
    "es-es": { male: "Antonio", female: "Maria" },
    "fr-fr": { male: "Henry", female: "Amelie" },
    "de-de": { male: "Hans", female: "Klara" },
    "it-it": { male: "Luca", female: "Giulia" },
    "pt-pt": { male: "Ricardo", female: "Ines" },
    "zh-cn": { male: "Wang", female: "Mei" },
    "ja-jp": { male: "Takumi", female: "Sakura" },
    "ko-kr": { male: "Minho", female: "Yuna" },
    "ru-ru": { male: "Dmitry", female: "Anna" },
    "ar-sa": { male: "Omar", female: "Layla" },
    "hi-in": { male: "Ravi", female: "Priya" },
  };

  const voice = voiceMap[language]?.[voiceType] || "Mike";

  const url = `https://api.voicerss.org/?key=${API_KEY}&hl=${language}&v=${voice}&src=${encodeURIComponent(
    text
  )}&c=mp3`;

  try {
    const response = await fetch(url);

    if (response.ok) {
      const audioBlob = await response.blob();
      return URL.createObjectURL(audioBlob);
    } else {
      console.error(`Failed to fetch audio. Response status: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching audio:", error);
    return null;
  }
};
