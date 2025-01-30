"use client";
import { useState, useEffect } from "react";
import { getVoiceRSSAudio } from "@/utils/voicerss";

function Home() {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("en-us");
  const [voiceType, setVoiceType] = useState("male");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVoiceType(e.target.value);
  };

  const handleGenerateSpeech = async () => {
    if (!text.trim()) return;

    setIsLoading(true);

    const audio = await getVoiceRSSAudio(text, language, voiceType);
    setIsLoading(false);

    if (audio) {
      setAudioUrl(audio);
    }
  };

  useEffect(() => {
    setAudioUrl(null);
  }, [text, language, voiceType]);


  return (
    <div className="">
      <div className="flex justify-center items-center">
        <div className="bg-[#1C1C1C] border-[#262626] border-[1px] w-[80%] py-1 px-6 rounded-[30px] my-4 flex items-center justify-between">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="50" viewBox="0 0 100 120">
            <polygon
              points="50,5 95,30 95,90 50,115 5,90 5,30"
              stroke="#fff"
              strokeWidth="8"
              fill="none"
            />
            <text
              x="50"
              y="65"
              textAnchor="middle"
              fill="#fff"
              fontFamily="'Roboto Mono', monospace"
              fontSize="50"
              dy=".3em"
            >
              V
            </text>
          </svg>

          <h1 className="text-white tracking-[2px] font-[600]">Voicify</h1>
        </div>
      </div>
      <div className="w-[80%] mx-auto">
        <div className="w-[60%] mx-auto pt-6">
          <p className="text-center text-[#C4C4C4] font-[500] text-[14px]">Voicify is a simple text-to-speech web app that converts your text into natural-sounding speech. With customizable voices, languages, and settings, it lets you listen to any content effortlessly. Just type, select your preferences, and enjoy!</p>
        </div>
        <div className="flex justify-between mt-4">
          <div className="bg-[#1C1C1C] p-4 border-[1px] border-[#262626] rounded-[4px]">
            <h1 className="text-4xl font-bold text-center text-[#C4c4c4]">Voicify - Text to Speech</h1>
            <textarea
              className="w-full p-2 border rounded-md"
              placeholder="Enter text here."
              value={text}
              onChange={handleTextChange}
            />
            <div className="mt-4">
              <label className="mr-2">Language:</label>
              <select
                className="border rounded-md p-2"
                value={language}
                onChange={handleLanguageChange}
              >
                <option value="en-us">English (US)</option>
                <option value="en-uk">English (UK)</option>
                <option value="es-es">Spanish</option>
                <option value="fr-fr">French</option>
                <option value="de-de">German</option>
                <option value="it-it">Italian</option>
              </select>
            </div>
            <div className="mt-4">
              <label className="mr-2">Voice:</label>
              <select
                className="border rounded-md p-2"
                value={voiceType}
                onChange={handleVoiceChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
              onClick={handleGenerateSpeech}
              disabled={isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate Speech'}
            </button>
            {audioUrl && (
              <div className="mt-4">
                <audio controls>
                  <source src={audioUrl} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
