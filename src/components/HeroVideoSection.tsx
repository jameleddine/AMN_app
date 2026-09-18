import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  Phone,
  MessageCircle,
  QrCode,
  CheckCircle2,
  Upload,
  ArrowRight,
  MapPin,
  Film,
  Check,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/servicesData';
import { WhatsAppQRCode } from './WhatsAppQRCode';
import QRCode from 'qrcode';

interface HeroVideoSectionProps {
  onOpenQuote: (serviceId?: string) => void;
}

export const HeroVideoSection: React.FC<HeroVideoSectionProps> = ({ onOpenQuote }) => {
  const [videoSource, setVideoSource] = useState<string>('/2.mp4');
  const [customFileName, setCustomFileName] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true); // Start muted so browsers allow autoplay
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  // Synchronize playback state with video element
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let isMounted = true;
    const generateQR = async () => {
          try {
            // High-contrast ISO-compliant QR Code for WhatsApp direct click-to-chat
            const url = COMPANY_INFO.whatsappUrl;
            const dataUrl = await QRCode.toDataURL(url, {
              width: 512, // High resolution for razor-sharp camera scanning
              margin: 2, // Standard quiet-zone required for instant phone camera recognition
              color: {
                dark: '#000000', // Pure black for maximum optical contrast
                light: '#ffffff', // Pure white
              },
              errorCorrectionLevel: 'M',
            });
            if (isMounted) {
              setQrDataUrl(dataUrl);
            }
          } catch (err) {
            console.error('Failed to generate WhatsApp QR code:', err);
          }
        };
    
        generateQR();

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => {
      setDuration(video.duration || 0);
      if (isPlaying) {
        video.play().catch(() => {
          // Autoplay policy fallback: mute and retry
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => setIsPlaying(false));
        });
      }
    };
    const handleEnded = () => {
      // Loop seamlessly
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
      isMounted = false;
    };
  }, [videoSource]);

  // Toggle play / pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  // Seek video
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const newTime = parseFloat(e.target.value);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // User video upload handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSource(url);
      setCustomFileName(file.name);
      setIsPlaying(true);
      setIsMuted(false); // Enable sound for user's personal video
      if (videoRef.current) {
        videoRef.current.src = url;
        videoRef.current.muted = false;
        videoRef.current.play().catch(() => {});
      }
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <section id="video-presentation" className="relative pt-24 pb-14 sm:pt-28 sm:pb-16 md:pt-36 md:pb-24 bg-slate-950 text-white">
      {/* Ambient solar warmth */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            Entreprise de Nettoyage & Rénovation • Isère et Savoie (38000)
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-3 sm:mb-4">
            L'Excellence du Nettoyage Professionnel avec <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300">AMN</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-normal">
            Remise en état après travaux, traitement de sol, vitrerie grande hauteur, chalets alpins et débarras garages. Un artisan qualifié au service des professionnels et particuliers en Isère.
          </p>
        </div>

        {/* Video Feature & Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {/* Main Video Box (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div
              ref={playerContainerRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-black flex-1 flex flex-col justify-between group"
            >
              {/* Native HTML5 Video Element */}
              <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                <video
                  ref={videoRef}
                  src={videoSource}
                  playsInline
                  autoPlay
                  muted={isMuted}
                  loop
                  preload="auto"
                  onClick={togglePlay}
                  className="w-full h-full object-cover cursor-pointer"
                />

                {/* Top Overlay Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
                  <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-white text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                    <Film className="w-3.5 h-3.5 text-amber-400" />
                    <span>{customFileName ? 'Vidéo AMN Attachée' : 'Vidéo en Action • Démonstration'}</span>
                  </div>

                  {customFileName ? (
                    <span className="bg-emerald-600/90 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-sm flex items-center gap-1">
                      <Check className="w-3 h-3" /> Fichier chargé
                    </span>
                  ) : (
                    <span className="bg-amber-500 text-slate-950 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                      AMN 38000
                    </span>
                  )}
                </div>

                {/* Center Big Play Button (when paused) */}
                {!isPlaying && (
                  <button
                    onClick={togglePlay}
                    className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl transition-transform hover:scale-110 z-20 cursor-pointer"
                    aria-label="Lancer la lecture"
                  >
                    <Play className="w-7 h-7 fill-slate-950 ml-1" />
                  </button>
                )}

                {/* Sound reminder overlay if video is muted on load */}
                {isMuted && isPlaying && (
                  <button
                    onClick={toggleMute}
                    className="absolute bottom-16 right-3 z-20 bg-slate-900/90 hover:bg-amber-500 hover:text-slate-950 text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
                  >
                    <VolumeX className="w-4 h-4 text-amber-400" />
                    <span>Activer le son</span>
                  </button>
                )}
              </div>

              {/* Video Player Controls Bar */}
              <div className="bg-slate-950/95 backdrop-blur-md px-3 sm:px-4 py-2.5 border-t border-slate-800 flex flex-col gap-2 z-20">
                {/* Progress Scrubber */}
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    step="0.1"
                    value={currentTime}
                    onChange={handleSeek}
                    className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:h-2 transition-all"
                    aria-label="Curseur de lecture"
                  />
                  <span className="text-[11px] text-slate-400 font-mono shrink-0">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={togglePlay}
                      className="p-1.5 rounded-lg hover:bg-slate-800 text-white transition-colors cursor-pointer"
                      aria-label={isPlaying ? 'Pause' : 'Lecture'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-amber-400 fill-amber-400" />}
                    </button>

                    <button
                      onClick={() => {
                        if (videoRef.current) {
                          videoRef.current.currentTime = 0;
                          videoRef.current.play().catch(() => {});
                          setIsPlaying(true);
                        }
                      }}
                      className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Recommencer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={toggleMute}
                      className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                      aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                      <span className="text-[11px]">{isMuted ? 'Muet' : 'Son activé'}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleFullscreen}
                      className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Plein écran"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Direct Attach Video Tool & Indicator */}
              {/* <div className="bg-slate-900 px-3 sm:px-4 py-2.5 text-xs border-t border-slate-800 flex items-center justify-between flex-wrap gap-2 text-slate-300">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-[11px] sm:text-xs text-slate-300">
                    {customFileName ? `Fichier actif : ${customFileName}` : 'Vous avez votre propre vidéo MP4 / MOV ?'}
                  </span>
                </div>

                <label className="inline-flex items-center gap-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 hover:text-amber-200 border border-amber-500/40 px-3 py-1.5 rounded-lg cursor-pointer font-semibold text-[11px] sm:text-xs transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{customFileName ? 'Remplacer la vidéo' : 'Attacher votre vidéo (.mp4, .mov)'}</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime,video/m4v"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div> */}
            </div>
          </div>

          {/* Right Side: Direct Contact Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {/* Quick Contact & WhatsApp Scan Box */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-5 sm:p-6 rounded-2xl border border-slate-800 shadow-xl flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Contact Direct Artisan
                    </span>
                    <h3 className="text-xl font-bold text-white mt-0.5">
                      AMN Nettoyage
                    </h3>
                    <p className="text-xs text-slate-300 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      Isère et Savoie (38000)
                    </p>
                  </div>

                  <button
                    onClick={() => setShowQrModal(true)}
                    className="p-2 sm:p-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl text-amber-400 hover:text-amber-300 transition-all text-center flex flex-col items-center shrink-0 cursor-pointer"
                    title="Agrandir le QR Code WhatsApp"
                  >
                    <QrCode className="w-5 h-5" />
                    <span className="text-[9px] sm:text-[10px] mt-0.5 font-bold">QR Code</span>
                  </button>
                </div>

                {/* Direct Calling & WhatsApp Buttons */}
                <div className="grid grid-cols-2 gap-2.5 mb-5">
                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold py-3 px-3 rounded-xl transition-all shadow-sm text-xs sm:text-sm active:scale-95 text-center"
                  >
                    <Phone className="w-4 h-4 fill-slate-950" />
                    <span>{COMPANY_INFO.phoneFormatted}</span>
                  </a>
                  <a
                    href={COMPANY_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-3 rounded-xl transition-all shadow-sm text-xs sm:text-sm active:scale-95 text-center"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Direct</span>
                  </a>
                </div>

                {/* Key Guarantees */}
                <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Devis 100% gratuit et sans engagement sous 24h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Matériel professionnel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Vitrerie perches carbone & interventions nacelle</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Disponible 7j/7 pour urgences et remises en état</span>
                  </div>
                </div>
              </div>

              {/* Call to action */}
              <button
                onClick={() => onOpenQuote()}
                className="w-full mt-5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold py-3 rounded-xl transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 text-sm cursor-pointer active:scale-98"
              >
                <span>Calculer une estimation de devis</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>

            {/* Quick mini services pill box */}
            <div className="bg-slate-900/60 p-3.5 sm:p-4 rounded-xl border border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Prestations phares en Isère
              </span>
              <div className="flex flex-wrap gap-1.5 text-xs">
                <span className="bg-slate-800/80 text-amber-300/90 border border-amber-500/20 px-2.5 py-1 rounded-lg">Remise en état</span>
                <span className="bg-slate-800/80 text-slate-200 px-2.5 py-1 rounded-lg">Nettoyage fin de chantier</span>
                <span className="bg-slate-800/80 text-amber-300/90 border border-amber-500/20 px-2.5 py-1 rounded-lg">Traitement de sol & Lino</span>
                <span className="bg-slate-800/80 text-slate-200 px-2.5 py-1 rounded-lg">Vitrerie grande hauteur</span>
                <span className="bg-slate-800/80 text-amber-300/90 border border-amber-500/20 px-2.5 py-1 rounded-lg">Chalets de montagne</span>
                <span className="bg-slate-800/80 text-slate-200 px-2.5 py-1 rounded-lg">Débarras garages & parkings</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQrModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="bg-white text-slate-900 rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-lg font-extrabold text-slate-900">
              Contacter AMN par WhatsApp
            </h4>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Scannez le QR code avec votre smartphone pour ouvrir la conversation avec AMN
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 inline-block shadow-inner">
              {/* Real Scannable WhatsApp Box */}
                {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="QR Code WhatsApp AMN Nettoyage Grenoble"
              className="w-32 h-32 sm:w-36 sm:h-36 object-contain rounded-md"
              style={{ imageRendering: 'pixelated' }}
            />
          ) : (
            <div className="w-32 h-32 sm:w-36 sm:h-36 bg-slate-100 animate-pulse rounded-md flex items-center justify-center">
              <span className="text-xs text-slate-400 font-medium">Génération...</span>
            </div>
          )}
            </div>

            <div className="mt-4 space-y-1">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="text-base font-extrabold text-slate-900 hover:text-amber-600 block transition-colors"
              >
                {COMPANY_INFO.phoneFormatted}
              </a>
              <span className="text-xs text-slate-500 block">
                {COMPANY_INFO.email}
              </span>
            </div>

            <div className="mt-4 flex gap-2">
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Ouvrir WhatsApp</span>
              </a>
              <button
                onClick={() => setShowQrModal(false)}
                className="px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
