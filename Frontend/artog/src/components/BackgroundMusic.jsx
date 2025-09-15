import React, { useState, useRef, useEffect } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

// Using a royalty-free placeholder audio URL
const audioSrc = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

const BackgroundMusic = ({ isAutoplayEnabled }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isAutoplayEnabled) {
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Autoplay prevented by browser:", error);
            setIsPlaying(false);

            // One-time listener to start playback on first interaction
            const startAudioOnInteraction = () => {
              audio
                .play()
                .then(() => setIsPlaying(true))
                .catch((err) =>
                  console.error("Error playing audio after interaction:", err)
                );
            };

            window.addEventListener("click", startAudioOnInteraction, { once: true });
            window.addEventListener("keydown", startAudioOnInteraction, { once: true });
          });
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [isAutoplayEnabled]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} src={audioSrc} loop />
      <button
        onClick={togglePlay}
        className="fixed bottom-5 right-5 z-50 p-3 rounded-full bg-orange-600/80 text-white hover:bg-orange-500 transition-all duration-300 shadow-lg backdrop-blur-sm"
        aria-label={isPlaying ? "Mute background music" : "Unmute background music"}
      >
        {isPlaying ? (
          <FaVolumeUp className="w-6 h-6" />
        ) : (
          <FaVolumeMute className="w-6 h-6" />
        )}
      </button>
    </>
  );
};

export default BackgroundMusic;
