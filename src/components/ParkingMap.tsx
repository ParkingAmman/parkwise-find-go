import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

// Mock parking spots data - Amman, Jordan
const parkingSpots = [
  { id: 1, name: "موقف سيتي مول", lat: 31.9539, lng: 35.9106, available: 45, total: 100 },
  { id: 2, name: "موقف عبدون مول", lat: 31.9543, lng: 35.8775, available: 12, total: 80 },
  { id: 3, name: "موقف مكة مول", lat: 31.9686, lng: 35.8392, available: 67, total: 120 },
  { id: 4, name: "موقف تاج مول", lat: 31.9120, lng: 35.8640, available: 89, total: 150 },
  { id: 5, name: "موقف جاليريا مول", lat: 31.9965, lng: 35.8623, available: 23, total: 90 },
];

const ParkingMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [needsKey, setNeedsKey] = useState(true);

  useEffect(() => {
    if (!mapContainer.current || !apiKey) return;

    mapboxgl.accessToken = apiKey;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [35.9106, 31.9454], // Amman coordinates
        zoom: 12,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add parking spots markers
      parkingSpots.forEach(spot => {
        const availability = (spot.available / spot.total) * 100;
        const color = availability > 50 ? '#10b981' : availability > 20 ? '#f59e0b' : '#ef4444';

        const el = document.createElement('div');
        el.className = 'parking-marker';
        el.style.cssText = `
          width: 40px;
          height: 40px;
          background-color: ${color};
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 12px;
          cursor: pointer;
          transition: transform 0.2s;
        `;
        el.textContent = 'P';
        
        el.addEventListener('mouseenter', () => {
          el.style.transform = 'scale(1.2)';
        });
        
        el.addEventListener('mouseleave', () => {
          el.style.transform = 'scale(1)';
        });

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div style="padding: 10px; min-width: 200px;">
            <h3 style="font-weight: bold; margin-bottom: 8px; color: #1e293b;">${spot.name}</h3>
            <p style="margin-bottom: 4px; color: #64748b;">الأماكن المتاحة: <span style="color: ${color}; font-weight: bold;">${spot.available}</span></p>
            <p style="color: #64748b;">إجمالي الأماكن: ${spot.total}</p>
            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e2e8f0;">
              <div style="background: ${color}; height: 6px; border-radius: 3px; width: ${availability}%;"></div>
            </div>
          </div>
        `);

        new mapboxgl.Marker(el)
          .setLngLat([spot.lng, spot.lat])
          .setPopup(popup)
          .addTo(map.current!);
      });

      setNeedsKey(false);
    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      map.current?.remove();
    };
  }, [apiKey]);

  if (needsKey) {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg">
        <div className="max-w-md w-full p-6 space-y-4 bg-card rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-center">إعداد الخريطة</h3>
          <p className="text-sm text-muted-foreground text-center">
            أدخل مفتاح Mapbox API الخاص بك لعرض الخريطة
          </p>
          <Input
            type="text"
            placeholder="pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            احصل على مفتاح API مجاني من{' '}
            <a 
              href="https://mapbox.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              mapbox.com
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="bg-card rounded-lg shadow-lg p-3 flex items-center gap-2">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="ابحث عن موقف..." 
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>
      <div ref={mapContainer} className="w-full h-full rounded-lg shadow-lg" />
    </div>
  );
};

export default ParkingMap;
