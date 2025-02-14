import React, { useState, useEffect } from 'react';
import { ChevronUp, Maximize, Minimize } from 'lucide-react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { Toolbar } from '../Toolbar/Toolbar';
import { ImageViewer } from '../ImageViewer/ImageViewer';
import { CameraView } from '../Camera/CameraView';
import { useFanData } from '../../hooks/useFanData';
import { useFullscreen } from '../../hooks/useFullscreen';

export function SceneViewer() {
  const { fanName } = useParams<{ fanName: string }>();
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [cameraError, setCameraError] = useState<Error | null>(null);
  const { fanData, loading, error } = useFanData();
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const navigate = useNavigate();

  // Show tooltip once after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
      // Hide tooltip after animation completes
      setTimeout(() => setShowTooltip(false), 3000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && !error && fanData.length > 0) {
      const fanExists = fanData.some(fan => fan.urlCode === fanName);
      if (!fanExists) {
        navigate('/', { replace: true });
      }
    }
  }, [fanName, fanData, loading, error, navigate]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900">
      {!cameraError && <CameraView onError={setCameraError} />}
      {fanName && <ImageViewer fanName={fanName} />}
      
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={toggleFullscreen}
          className="rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white/20"
        >
          {isFullscreen ? (
            <Minimize className="h-6 w-6 text-white" />
          ) : (
            <Maximize className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      <div className="fixed bottom-4 right-4 z-50">
        {showTooltip && (
          <div className="absolute bottom-full left-1/2 mb-4 tooltip-slide">
            <div className="relative -left-1/2 rounded-lg bg-black/80 px-4 py-2 text-sm text-white backdrop-blur-sm">
              <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-black/80" />
              More Options
            </div>
          </div>
        )}
        <button
          onClick={() => setIsToolbarOpen(!isToolbarOpen)}
          className={`rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white/20 ${
            isToolbarOpen ? 'rotate-180' : ''
          } ${!isToolbarOpen && !showTooltip ? 'pulse-glow' : ''}`}
        >
          <ChevronUp className="h-6 w-6 text-white" />
        </button>
      </div>

      <Toolbar isOpen={isToolbarOpen} currentFan={fanName || ''} />
    </div>
  );
}