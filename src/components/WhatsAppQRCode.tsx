import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { MessageCircle, ExternalLink, Check, Download, QrCode } from 'lucide-react';
import { COMPANY_INFO } from '../data/servicesData';

interface WhatsAppQRCodeProps {
  size?: number;
  className?: string;
  showDetails?: boolean;
}

export const WhatsAppQRCode: React.FC<WhatsAppQRCodeProps> = ({
  size = 150,
  className = '',
  showDetails = true,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
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
    return () => {
      isMounted = false;
    };
  }, [size]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(COMPANY_INFO.whatsappUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = 'QR-Code-WhatsApp-AMN-Nettoyage.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`flex flex-col sm:flex-row items-center gap-5 ${className}`}>
      {/* Scannable QR Code Canvas */}
      <div className="relative group shrink-0">
        <a
          href={COMPANY_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Scanner avec l'appareil photo du smartphone ou cliquer pour ouvrir WhatsApp"
          className="block bg-white p-3 rounded-2xl shadow-xl border-2 border-emerald-500/40 hover:border-emerald-400 transition-all hover:scale-[1.02] active:scale-95"
        >
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

          {/* WhatsApp Badge */}
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-full shadow-lg border-2 border-slate-950 flex items-center justify-center">
            <MessageCircle className="w-4 h-4 fill-white text-white" />
          </div>
        </a>
      </div>

      {/* Accompanying info & direct action buttons */}
      {showDetails && (
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/90 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              WhatsApp Direct
            </span>
            <span className="text-xs text-slate-300 font-semibold">
              {COMPANY_INFO.phoneFormatted}
            </span>
          </div>

          <h4 className="text-base font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
            <QrCode className="w-4 h-4 text-emerald-400" />
            <span>Scannez avec votre smartphone</span>
          </h4>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Ouvrez simplement l'appareil photo de votre téléphone et pointez l'écran vers ce QR code pour ouvrir WhatsApp et envoyer votre demande en 1 clic.
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3.5">
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 px-3.5 py-2 rounded-xl transition-all shadow-sm active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Démarrer le chat</span>
              <ExternalLink className="w-3 h-3 text-slate-950/70" />
            </a>

            <button
              onClick={handleCopyLink}
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-200 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-xl transition-all active:scale-95 cursor-pointer"
              title="Copier le lien WhatsApp"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">Lien copié !</span>
                </>
              ) : (
                <span>Copier le lien</span>
              )}
            </button>

            {qrDataUrl && (
              <button
                onClick={handleDownloadQR}
                type="button"
                className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white bg-transparent hover:bg-white/5 px-2.5 py-2 rounded-xl transition-all cursor-pointer"
                title="Télécharger l'image du QR Code"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Sauvegarder</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
