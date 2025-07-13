import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import pfp from './images/pfp1.gif';
import twitter from './images/x.png';
import insta from './images/insta.png';
import yt from './images/yt.png';
import discord from './images/discord.png';
import cover from './images/cover1.jpeg';
import cover2 from './images/cover2.jpg';
import track1 from './song/sticktogether.mp3';
import track2 from './song/slowdown.mp3';
import bg from './videos/cod.mp4';
import git from './images/git2.png';

function App() {
  const audioRef = useRef(null);  
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [isOverlayClicked, setIsOverlayClicked] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const [bio, setBio] = useState('');
  const [entered, setEntered] = useState(false); // State for animation
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const tracks = [
  {
    src: track1,
    title: "Stick Together",
    artist: "Elijah N",
    album: "No Album",
    cover: cover,
    url: "https://music.youtube.com/watch?v=LaRzVVYH1x4"
  },
  {
    src: track2,
    title: "Slow Down",
    artist: "Lights Follow",
    album: "No Album",
    cover: cover2,
    url: "https://music.youtube.com/watch?v=BdKw0uGbzW8"
  },
];


  // Typewriter effect
  const [bioText, setBioText] = useState("Life is eternal, and love is immortal, and death is only a horizon; and a horizon is nothing save the limit of our sight.");
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
  const audioElement = audioRef.current;
  if (!audioElement) return;

  const handleLoadedMetadata = () => {
    setMaxTime(audioElement.duration);
  };

  audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);

  return () => {
    audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
  };
}, [currentTrackIndex]);

  useEffect(() => {
  if (audioRef.current && isOverlayClicked) {
    audioRef.current.load();    // Reload new track source
    audioRef.current.play();    // Play the new track
    setIsPlaying(true);
  }
}, [currentTrackIndex, isOverlayClicked]);


  useEffect(() => {
    const timer = setInterval(() => {
      if (isTyping) {
        if (index < bioText.length) {
          setBio(prevBio => prevBio + bioText.charAt(index));
          setIndex(prevIndex => prevIndex + 1);
        } else {
          setIsTyping(false);
        }
      } else {
        if (index >= 0) {
          setBio(prevBio => prevBio.slice(0, index));
          setIndex(prevIndex => prevIndex - 1);
        } else {
          setIsTyping(true);
        }
      }
    }, 100);

    return () => clearInterval(timer); // Cleanup the timer
  }, [bioText, index, isTyping]);


  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  // Update currentTime and handle track end
  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    if (!isPlaying && isOverlayClicked) {
      audioElement.play();
      setIsPlaying(true);
    }

    const interval = setInterval(() => {
      setCurrentTime(audioElement.currentTime);

      if (audioElement.ended) {
        // Auto play next track
        handleNextTrack();
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isPlaying, isOverlayClicked, currentTrackIndex]);

  const currentTrack = tracks[currentTrackIndex];
  const [maxTime, setMaxTime] = useState(0);


  // Controls

  function audioPlay() {
    if (audioRef.current) {
      audioRef.current.volume = 1;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    setCurrentTime(0);
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? tracks.length - 1 : prevIndex - 1
    );
    setCurrentTime(0);
  };

  const handleOverlayClick = () => {
    setShowOverlay(false);
    setIsOverlayClicked(true);
    audioPlay();
    setEntered(true);
  };

  const handleCopyAddress = (address, label) => {
    navigator.clipboard.writeText(address)
      .then(() => {
        setCopyStatus('Copied');
        setCssLabel('Copied');
        setTimeout(() => {
          setCopyStatus('');
          setCssLabel('Copy BTC Address');
        }, 2000);
      })
      .catch(error => console.error('Error copying address to clipboard:', error));
  };

  const handleCopyAddress1 = (address, label) => {
    navigator.clipboard.writeText(address)
      .then(() => {
        setCopyStatus('Copied');
        setCssLabel1('Copied');
        setTimeout(() => {
          setCopyStatus('');
          setCssLabel1('Copy LTC Address');
        }, 2000);
      })
      .catch(error => console.error('Error copying address to clipboard:', error));
  };

  return (
    <div className='app-container'>
      <video autoPlay loop muted className='video-background'>
        <source src={bg} type='video/mp4' />
        Your browser does not support the video tag.
      </video>

      {showOverlay && (
        <div className='overlay' onClick={handleOverlayClick}>
          <p className='click'>Click Anywhere</p>
        </div>
      )}

      <div className={`main-container ${entered ? 'entered' : ''}`}>
        <img src={pfp} className='pfp' alt="Profile Picture" />
        <div className='info'>
          <h1 className='name'>alphaTCT3209</h1>
          <h1 className='bio'>{bio}</h1>
        </div>

        <div className='links'>
          <a href="https://twitter.com/2HB2QedJXb7055" target="_blank" rel="noopener noreferrer">
            <img src={twitter} className='link1' alt="Twitter" />
          </a>
          <a href="https://github.com/alphatct3209" target="_blank" rel="noopener noreferrer">
            <img src={git} className='link2' alt="GitHub" />
          </a>
          <a href="https://www.instagram.com/movemented/" target="_blank" rel="noopener noreferrer">
            <img src={insta} className='link3' alt="Instagram" />
          </a>
          <a href="https://www.youtube.com/@alphaTCT3209" target="_blank" rel="noopener noreferrer">
            <img src={yt} className='link4' alt="YouTube" />
          </a>
          <a href="https://discord.com/users/719202658048540940" target="_blank" rel="noopener noreferrer">
            <img src={discord} className='link5' alt="Discord" />
          </a>
        </div>

        <div className='div1'></div>

        <div className='song'>
          <div className='progress-bar-container'>
            <div className='progress-bar' style={{ width: `${(currentTime / maxTime) * 100}%` }} />
          </div>

          <a href={currentTrack.url} target='_blank' rel='noopener noreferrer'>
  <img src={currentTrack.cover} className='songcover' alt='Cover' />
</a>


          <div className='songinfo'>
            <p className='songtitle'>{currentTrack.title}</p>
            <p className='artist'>by {currentTrack.artist}</p>
            <p className='album'>{currentTrack.album}</p>
          </div>

          <div className='time-label'>
            {formatTime(currentTime)} / {formatTime(maxTime)}
          </div>

          <audio
            id='audio'
            src={currentTrack.src}
            ref={audioRef}
            onEnded={handleNextTrack}
          />
        </div>

        <div className='div2'></div>

        <div className="rich-presence">
          <a href="https://example.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://i.imgur.com/qJf9Ssh.jpg"
              alt="Presence Cover"
              className="presence-cover"
            />
          </a>

          <div className="presence-info">
            <p className="presence-title">Blackhawk Rescue Mission 5</p>
            <p className="presence-desc">Playing Openworld in RonoGrad</p>
            <p className="presence-party">In a Party (5 of 30)</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
