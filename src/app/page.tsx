"use client";
import { useState, useEffect, useRef } from "react";
import { getVoiceRSSAudio } from "@/utils/voicerss";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PlayIcon from "@mui/icons-material/PlayArrowRounded";
import PauseIcon from "@mui/icons-material/PauseRounded"; // Import Pause Icon
import { ModeToggle } from "@/components/ui/modal-toogle"; // Import ModeToggle
import { Button } from "@/components/ui/button";

function Home() {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("en-us");
  const [voiceType, setVoiceType] = useState("male");
  const [isPlaying, setIsPlaying] = useState(false); // To toggle play/pause
  const audioRef = useRef<HTMLAudioElement | null>(null); // Reference to the audio element
  const [currentTime, setCurrentTime] = useState(0);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value); // Update the language state when a new language is selected
  };

  const handleVoiceChange = (value: string) => {
    setVoiceType(value); // Update the voice type state when a new voice type is selected
  };


  const handlePlayPause = () => {
    if (!audioUrl) return;

    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.currentTime = currentTime; // Resume from last position
        audioRef.current.play();
        document.querySelector(".wave")?.classList.add("playing"); // Start animation
        setIsPlaying(true);
      } else {
        setCurrentTime(audioRef.current.currentTime); // Store current time
        audioRef.current.pause();
        document.querySelector(".wave")?.classList.remove("playing"); // Stop animation
        setIsPlaying(false);
      }
    }
  };

  const handleGenerateSpeech = async () => {
    if (!text.trim()) return;

    setIsLoading(true);

    const audio = await getVoiceRSSAudio(text, language, voiceType);
    setIsLoading(false);

    if (audio) {
      setAudioUrl(audio);

      if (audioRef.current) {
        audioRef.current.pause(); // Pause if playing
        audioRef.current.src = audio; // Set new audio
        audioRef.current.currentTime = 0; // Reset position only when generating new speech
        audioRef.current.play();
        setIsPlaying(true);
        document.querySelector(".wave")?.classList.add("playing"); // Start animation
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
        document.querySelector(".wave")?.classList.remove("playing"); // Stop animation when audio ends
      });
    }
  }, []);


  useEffect(() => {
    setAudioUrl(null);
  }, [text, language, voiceType]);

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center">
        <div className="bg-transparent border border-[#E4E4E7] dark:border-[#27272A] shadow-sm w-[90%] md:w-[80%] py-1 px-6 rounded-[30px] my-4 flex items-center justify-between">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="50" viewBox="0 0 100 120">
            <polygon
              points="50,5 95,30 95,90 50,115 5,90 5,30"
              className="stroke-[#18181B] dark:stroke-white" // Light mode stroke dark mode stroke color
              strokeWidth="10"
              fill="none"
            />
            <text
              x="50"
              y="65"
              textAnchor="middle"
              className="fill-[#18181B] dark:fill-white" // Light mode text fill dark mode text color
              fontFamily="'Roboto Mono', monospace"
              fontSize="50"
              fontWeight="700"
              dy=".3em"
            >
              V
            </text>
          </svg>

          <h1 className="text-[18px] tracking-[2px] font-[700]">Voicify</h1>
          <ModeToggle /> {/* Mode Toggle Component here */}
        </div>
      </div>

      <div className="w-[90%] md:w-[80%] mx-auto">
        <div className="w-[90%] md:w-[80%] lg:w-[60%] mx-auto pt-6">
          <p className="text-center font-[600] text-[14px]">
            Voicify is a simple text-to-speech web app that converts your text into natural-sounding speech.
            With customizable voices, languages, and settings, it lets you listen to any content effortlessly.
            Just type, select your preferences, and enjoy!
          </p>
        </div>

        <div className="flex justify-between mt-[20px] md:mt-[50px] flex-col-reverse sm:flex-row w-full pb-3 md:pb-0">
          <div className="bg-transparent flex-grow border border-[#E4E4E7] dark:border-[#27272A] w-full p-4 rounded-[4px] md:w-[60%] shadow-sm">
            <h1 className="text-[22px] font-[800] text-center pb-3">Voicify</h1>
            <Textarea
              placeholder="Type your message here."
              value={text}
              onChange={handleTextChange}
            />

            <div className="flex items-center pt-4">
              {/* Language Select */}
              <Select value={language} onValueChange={handleLanguageChange}> {/* onValueChange for controlled select */}
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Languages</SelectLabel>
                    <SelectItem value="en-us">English (US)</SelectItem>
                    <SelectItem value="es-es">Spanish (ES)</SelectItem>
                    <SelectItem value="fr-fr">French (FR)</SelectItem>
                    <SelectItem value="de-de">German (DE)</SelectItem>
                    <SelectItem value="it-it">Italian (IT)</SelectItem>
                    <SelectItem value="pt-pt">Portuguese (PT)</SelectItem>
                    <SelectItem value="zh-cn">Chinese (Simplified)</SelectItem>
                    <SelectItem value="ja-jp">Japanese (JP)</SelectItem>
                    <SelectItem value="ko-kr">Korean (KR)</SelectItem>
                    <SelectItem value="ru-ru">Russian (RU)</SelectItem>
                    <SelectItem value="ar-sa">Arabic (SA)</SelectItem>
                    <SelectItem value="hi-in">Hindi (IN)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <div className="px-4">|</div>

              {/* Voice Type Select */}
              <Select value={voiceType} onValueChange={handleVoiceChange}> {/* onValueChange for controlled select */}
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Voice" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Voice Type</SelectLabel>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Button
                aria-label="Generate Speech"
                className="mt-4 bg-[#18181B] dark:bg-[#FFF] px-4 py-2 rounded-lg"
                onClick={handleGenerateSpeech}
                disabled={isLoading || !text.trim()}
              >
                {isLoading ? "Generating..." : "Generate"}
              </Button>
              <Button
                aria-label={isPlaying ? "Pause Speech" : "Play Speech"}
                className={`mt-4 ml-2 rounded-full bg-[#18181B] text-white dark:text-[#18181B] dark:bg-[#FFF] flex justify-center items-center w-10 h-10 ${!audioUrl ? "cursor-not-allowed" : ""
                  }`}
                onClick={handlePlayPause}
                disabled={!audioUrl}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </Button>

            </div>
            <audio ref={audioRef} />
          </div>
          <div className="wave-wrapper w-full md:w-[40%]">
            <div className="wave dark:bg-[#FFF]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
