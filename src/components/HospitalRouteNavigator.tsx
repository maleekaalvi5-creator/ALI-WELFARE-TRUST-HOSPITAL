import React, { useState, useEffect, useRef, useCallback } from 'react';
import L from 'leaflet';
import { 
  Navigation, 
  MapPin, 
  Car, 
  Bike, 
  Footprints, 
  LocateFixed, 
  Play, 
  Pause, 
  RotateCcw, 
  Compass, 
  Clock, 
  Search,
  X,
  Globe,
  Radio,
  Building2,
  CornerUpRight, 
  CornerUpLeft, 
  MoveUp, 
  Crosshair, 
  ShieldAlert, 
  CheckCircle2, 
  Layers, 
  Phone,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Info,
  SlidersHorizontal,
  Volume2,
  VolumeX,
  FastForward,
  Rewind,
  AlertTriangle
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

// Hospital Exact Coordinates on Chahal Kalan Road, Qila Didar Singh, Gujranwala
const HOSPITAL_COORDS: [number, number] = [
  HOSPITAL_INFO.coordinates.lat, // 32.1311
  HOSPITAL_INFO.coordinates.lng, // 74.0268
];

// Popular Departure Presets across Pakistan & Region
const POPULAR_HUBS = [
  {
    name: 'Lahore (Thokar Niaz Baig / Canal Rd)',
    urdu: 'لاہور ٹھوکر نیاز بیگ',
    category: 'Major Cities',
    coords: [31.4697, 74.2444] as [number, number],
    distEstimate: '~85 km',
  },
  {
    name: 'Lahore (Kalma Chowk / Gulberg)',
    urdu: 'لاہور کلمہ چوک',
    category: 'Major Cities',
    coords: [31.5036, 74.3318] as [number, number],
    distEstimate: '~88 km',
  },
  {
    name: 'Islamabad / Rawalpindi (Motorway M-2)',
    urdu: 'اسلام آباد / راولپنڈی موٹروے',
    category: 'Major Cities',
    coords: [33.6007, 73.0188] as [number, number],
    distEstimate: '~210 km',
  },
  {
    name: 'Sialkot (Kashmir Road / Cantt)',
    urdu: 'سیالکوٹ کشمیر روڈ',
    category: 'Major Cities',
    coords: [32.5020, 74.5375] as [number, number],
    distEstimate: '~55 km',
  },
  {
    name: 'Faisalabad (Clock Tower / Bypass)',
    urdu: 'فیصل آباد بائی پاس',
    category: 'Major Cities',
    coords: [31.4187, 73.0791] as [number, number],
    distEstimate: '~140 km',
  },
  {
    name: 'Gujrat (Shaheen Chowk GT Road)',
    urdu: 'گجرات شاہین چوک',
    category: 'Major Cities',
    coords: [32.5742, 74.0754] as [number, number],
    distEstimate: '~52 km',
  },
  {
    name: 'Wazirabad (Sialkot Bypass Junction)',
    urdu: 'وزیرآباد بائی پاس',
    category: 'Nearby Towns',
    coords: [32.4410, 74.1200] as [number, number],
    distEstimate: '~36 km',
  },
  {
    name: 'Hafizabad City Bypass',
    urdu: 'حافظ آباد بائی پاس',
    category: 'Nearby Towns',
    coords: [32.0710, 73.6870] as [number, number],
    distEstimate: '~38 km',
  },
  {
    name: 'Sheikhupura City Bypass',
    urdu: 'شیخوپورہ بائی پاس',
    category: 'Nearby Towns',
    coords: [31.7130, 73.9780] as [number, number],
    distEstimate: '~52 km',
  },
  {
    name: 'Gujranwala City (Chan Da Qila / GT Road)',
    urdu: 'گوجرانوالہ چاند دا قلعہ',
    category: 'Gujranwala Area',
    coords: [32.1275, 74.1983] as [number, number],
    distEstimate: '~17 km',
  },
  {
    name: 'Gujranwala Cantt (Rahwali / DC Colony)',
    urdu: 'کینٹ گوجرانوالہ',
    category: 'Gujranwala Area',
    coords: [32.2215, 74.1950] as [number, number],
    distEstimate: '~23 km',
  },
  {
    name: 'Qila Didar Singh Main Adda / Bazaar',
    urdu: 'قلعہ دیداربازار و اڈہ',
    category: 'Gujranwala Area',
    coords: [32.1338, 74.0298] as [number, number],
    distEstimate: '~1.1 km',
  },
  {
    name: 'Kamoke GT Road Interchange',
    urdu: 'کامونکی جی ٹی روڈ',
    category: 'Gujranwala Area',
    coords: [31.9745, 74.2230] as [number, number],
    distEstimate: '~26 km',
  },
];

type TravelMode = 'driving' | 'bicycle' | 'foot';

interface RouteStep {
  instruction: string;
  urduInstruction: string;
  distance: number;
  duration: number;
  name: string;
  maneuverType: string;
  maneuverModifier?: string;
  location: [number, number];
}

interface RouteData {
  distance: number; // meters
  duration: number; // seconds
  coordinates: [number, number][]; // [lat, lng] array
  steps: RouteStep[];
  summary: string;
  isFlightEstimate?: boolean;
}

interface SearchResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  type: string;
}

// Haversine distance for flight fallback
function calculateHaversineDistance(coords1: [number, number], coords2: [number, number]): number {
  const R = 6371e3; // Earth radius in meters
  const lat1 = (coords1[0] * Math.PI) / 180;
  const lat2 = (coords2[0] * Math.PI) / 180;
  const deltaLat = ((coords2[0] - coords1[0]) * Math.PI) / 180;
  const deltaLng = ((coords2[1] - coords1[1]) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export const HospitalRouteNavigator: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const routePolylineRef = useRef<L.Polyline | null>(null);
  const routeGlowPolylineRef = useRef<L.Polyline | null>(null);
  const originMarkerRef = useRef<L.Marker | null>(null);
  const hospitalMarkerRef = useRef<L.Marker | null>(null);
  const animatedVehicleMarkerRef = useRef<L.Marker | null>(null);

  // Origin State - Defaults to Lahore until detected
  const [originCoords, setOriginCoords] = useState<[number, number]>([31.5204, 74.3587]);
  const [originLabel, setOriginLabel] = useState<string>('Detecting your real location...');
  const [originSource, setOriginSource] = useState<'gps' | 'ip' | 'search' | 'pin' | 'hub'>('ip');
  
  // Geolocation & Detection Diagnostics
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationStatus, setLocationStatus] = useState<string>('Detecting location...');
  const [detectionMethod, setDetectionMethod] = useState<string>('Auto-detecting');
  const [permissionNotice, setPermissionNotice] = useState<string | null>(null);

  // Search State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const searchDebounceRef = useRef<NodeJS.Timeout | null>(null);

  // Active Category Filter for Presets
  const [selectedHubCategory, setSelectedHubCategory] = useState<string>('Major Cities');

  // Routing State
  const [travelMode, setTravelMode] = useState<TravelMode>('driving');
  const [routeData, setRouteData] = useState<RouteData | null>(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState<boolean>(false);
  const [routeError, setRouteError] = useState<string | null>(null);

  // 3D & Simulation State
  const [is3DMode, setIs3DMode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationProgress, setSimulationProgress] = useState<number>(0);
  const [simulationSpeed, setSimulationSpeed] = useState<number>(2);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Live Trip / Journey Mode State
  const [isLiveTripActive, setIsLiveTripActive] = useState<boolean>(false);
  const [isVoiceGuidanceMuted, setIsVoiceGuidanceMuted] = useState<boolean>(false);
  const [speedKmh, setSpeedKmh] = useState<number>(0);
  const [distRemainingMeters, setDistRemainingMeters] = useState<number>(0);
  const [timeRemainingSec, setTimeRemainingSec] = useState<number>(0);
  const geoWatchIdRef = useRef<number | null>(null);

  const animFrameIdRef = useRef<number | null>(null);
  const simStartTimeRef = useRef<number | null>(null);

  // Audio Voice Guidance Helper (Web Speech API)
  const speakInstruction = useCallback((text: string) => {
    if (isVoiceGuidanceMuted) return;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.warn('Speech synthesis error:', e);
      }
    }
  }, [isVoiceGuidanceMuted]);

  // Urdu Translation helper
  const getUrduManeuver = (type: string, modifier?: string, name?: string): string => {
    if (type === 'arrive') return 'آپ علی ویلفیئر ٹرسٹ ہسپتال پہنچ چکے ہیں';
    if (type === 'depart') return 'روانہ ہوں اور راستے پر چلیں';
    if (modifier?.includes('left')) return `${name ? name + ' پر ' : ''}بائیں مڑیں`;
    if (modifier?.includes('right')) return `${name ? name + ' پر ' : ''}دائیں مڑیں`;
    if (modifier?.includes('straight') || type === 'continue') return 'سیدھے آگے بڑھیں';
    if (type === 'roundabout') return 'چوک / گول چکر سے راستہ لیں';
    return 'راستے پر چلتے رہیں';
  };

  const getManeuverIcon = (type: string, modifier?: string) => {
    if (type === 'arrive') return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    if (modifier?.includes('left')) return <CornerUpLeft className="w-5 h-5 text-cyan-600" />;
    if (modifier?.includes('right')) return <CornerUpRight className="w-5 h-5 text-amber-500" />;
    if (type === 'roundabout') return <RotateCcw className="w-5 h-5 text-purple-500" />;
    return <MoveUp className="w-5 h-5 text-teal-600" />;
  };

  // Reverse Geocode helper to get real city name from coordinates
  const reverseGeocode = async (coords: [number, number]) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords[0]}&lon=${coords[1]}&zoom=14&addressdetails=1`
      );
      if (res.ok) {
        const data = await res.json();
        const address = data.address || {};
        const city = address.city || address.town || address.village || address.suburb || address.county || data.display_name.split(',')[0];
        const state = address.state || address.country || '';
        const placeName = state ? `${city}, ${state}` : city;
        setOriginLabel(placeName);
      }
    } catch {
      // Fallback coordinate label
      setOriginLabel(`Location: ${coords[0].toFixed(3)}°N, ${coords[1].toFixed(3)}°E`);
    }
  };

  // Multi-tier Real Location Detection: GPS -> IP Geolocation -> Preset
  const detectUserLocation = useCallback(async (forcedUserGesture = false) => {
    setIsLocating(true);
    setLocationStatus('Detecting your location...');
    setPermissionNotice(null);

    // Function to try IP Geolocation fallback
    const tryIpGeolocation = async (reason?: string) => {
      setLocationStatus('Locating via Network IP...');
      try {
        // Try reliable primary IP service
        const res = await fetch('https://ipwho.is/');
        const data = await res.json();

        if (data && data.success && typeof data.latitude === 'number' && typeof data.longitude === 'number') {
          const userCoords: [number, number] = [data.latitude, data.longitude];
          const detectedCity = `${data.city || data.region || 'Detected Area'}, ${data.country || 'Pakistan'}`;
          
          setOriginCoords(userCoords);
          setOriginLabel(detectedCity);
          setOriginSource('ip');
          setDetectionMethod(`Network IP (${data.city || 'Regional'})`);
          setLocationStatus(`Located: ${detectedCity}`);
          setIsLocating(false);

          if (reason) {
            setPermissionNotice(reason);
          }

          if (mapInstanceRef.current) {
            mapInstanceRef.current.flyTo(userCoords, 11, { duration: 1.2 });
          }
          return;
        }
      } catch (e) {
        console.warn('Primary IP location failed, trying secondary...', e);
      }

      // Secondary IP fallback
      try {
        const res2 = await fetch('https://ipapi.co/json/');
        const data2 = await res2.json();
        if (data2 && typeof data2.latitude === 'number' && typeof data2.longitude === 'number') {
          const userCoords: [number, number] = [data2.latitude, data2.longitude];
          const detectedCity = `${data2.city || data2.region || 'Detected Area'}, ${data2.country_name || 'Pakistan'}`;

          setOriginCoords(userCoords);
          setOriginLabel(detectedCity);
          setOriginSource('ip');
          setDetectionMethod(`Network IP (${data2.city || 'Regional'})`);
          setLocationStatus(`Located: ${detectedCity}`);
          setIsLocating(false);

          if (mapInstanceRef.current) {
            mapInstanceRef.current.flyTo(userCoords, 11, { duration: 1.2 });
          }
          return;
        }
      } catch (e2) {
        console.warn('Secondary IP location failed:', e2);
      }

      // If everything failed, default to Lahore (Central Punjab hub)
      const lahoreHub = POPULAR_HUBS[0];
      setOriginCoords(lahoreHub.coords);
      setOriginLabel(lahoreHub.name);
      setOriginSource('hub');
      setDetectionMethod('Default Hub (Lahore)');
      setLocationStatus('Select your city from the hubs or search above');
      setIsLocating(false);
      setPermissionNotice('GPS unavailable. You can search any city or tap the map to set your departure point.');
    };

    // First attempt HTML5 Device GPS
    if (!navigator.geolocation) {
      await tryIpGeolocation('Browser does not support GPS hardware');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userCoords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setOriginCoords(userCoords);
        setOriginSource('gps');
        const accuracyM = Math.round(pos.coords.accuracy);
        setDetectionMethod(`High-Precision GPS (±${accuracyM}m)`);
        setLocationStatus(`GPS Locked (±${accuracyM}m accuracy)`);
        setIsLocating(false);
        setPermissionNotice(null);

        // Fetch real street / town name via reverse geocode
        reverseGeocode(userCoords);

        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo(userCoords, 13, { duration: 1.5 });
        }
      },
      async (err) => {
        console.info('GPS error or denied, falling back to IP Geolocation:', err.code, err.message);
        let reason = 'Browser GPS permission was blocked or unavailable.';
        if (err.code === 1) reason = 'Browser location permission denied. Using Network IP location.';
        else if (err.code === 3) reason = 'GPS request timed out. Using Network IP location.';
        
        await tryIpGeolocation(reason);
      },
      { 
        enableHighAccuracy: true, 
        timeout: forcedUserGesture ? 10000 : 5000, 
        maximumAge: 60000 
      }
    );
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: HOSPITAL_COORDS,
      zoom: 11,
      zoomControl: false,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Standard OpenStreetMap Tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors | OSRM Engine',
    }).addTo(map);

    // Hospital Destination Pin (Hospital on Chahal Kalan Road)
    const hospitalIcon = L.divIcon({
      className: 'custom-hospital-marker',
      html: `
        <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
          <div class="absolute -inset-3 rounded-full bg-emerald-500/40 animate-ping"></div>
          <div class="w-11 h-11 rounded-2xl bg-[#092f3a] border-2 border-amber-400 flex items-center justify-center text-amber-300 shadow-2xl">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path>
            </svg>
          </div>
          <div class="absolute -bottom-6 whitespace-nowrap px-2 py-0.5 rounded-md bg-[#092f3a] text-amber-300 text-[10px] font-bold border border-teal-500/30 shadow-md">
            Ali Welfare Hospital
          </div>
        </div>
      `,
      iconSize: [0, 0],
    });

    const hospitalMarker = L.marker(HOSPITAL_COORDS, { icon: hospitalIcon })
      .addTo(map)
      .bindPopup(`
        <div class="text-slate-900 font-sans p-1">
          <div class="font-bold text-sm text-[#087f8c]">Ali Welfare Trust Hospital</div>
          <div class="text-xs font-semibold text-slate-700 mt-0.5">Chahal Kalan Road, Qila Didar Singh, Gujranwala</div>
          <div class="text-[11px] text-slate-500 mt-1">24/7 Emergency & Dialysis Wing</div>
          <div class="mt-2 text-[11px] font-bold text-emerald-600">Free Treatment & OPD Available</div>
        </div>
      `);

    hospitalMarkerRef.current = hospitalMarker;

    // User can click anywhere on the map to set origin
    map.on('click', (e: L.LeafletMouseEvent) => {
      const clickedCoords: [number, number] = [e.latlng.lat, e.latlng.lng];
      setOriginCoords(clickedCoords);
      setOriginSource('pin');
      setDetectionMethod('Interactive Map Pin');
      setLocationStatus('Custom map departure point');
      setPermissionNotice(null);
      reverseGeocode(clickedCoords);
    });

    mapInstanceRef.current = map;

    // Trigger multi-tier real location detection immediately on mount
    detectUserLocation(false);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [detectUserLocation]);

  // Handle Search Input Debounce
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);

    searchDebounceRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        // Query OpenStreetMap Nominatim Geocoding API
        const q = encodeURIComponent(searchQuery);
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${q}&countrycodes=pk,ae,sa,gb,us&limit=6`
        );
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data);
          setShowDropdown(data.length > 0);
        }
      } catch (err) {
        console.warn('Search geocoding error:', err);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    };
  }, [searchQuery]);

  // Select a searched place
  const handleSelectSearchResult = (result: SearchResult) => {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    if (!isNaN(lat) && !isNaN(lon)) {
      const newCoords: [number, number] = [lat, lon];
      setOriginCoords(newCoords);
      setOriginLabel(result.display_name.split(',').slice(0, 3).join(', '));
      setOriginSource('search');
      setDetectionMethod(`Searched: ${result.display_name.split(',')[0]}`);
      setLocationStatus(`Selected: ${result.display_name.split(',')[0]}`);
      setPermissionNotice(null);
      setShowDropdown(false);
      setSearchQuery('');

      if (mapInstanceRef.current) {
        mapInstanceRef.current.flyTo(newCoords, 13, { duration: 1.5 });
      }
    }
  };

  // Fetch Route from OSRM
  const fetchOSRMRoute = useCallback(async () => {
    if (!mapInstanceRef.current) return;
    setIsLoadingRoute(true);
    setRouteError(null);

    // Cancel simulation if running
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }
    setIsSimulating(false);
    setSimulationProgress(0);
    setCurrentStepIndex(0);

    const [startLat, startLng] = originCoords;
    const [destLat, destLng] = HOSPITAL_COORDS;

    // Check direct distance first
    const directDistanceMeters = calculateHaversineDistance(originCoords, HOSPITAL_COORDS);

    // Profile for OSRM
    const osrmProfile = travelMode === 'driving' ? 'driving' : travelMode === 'bicycle' ? 'bicycle' : 'foot';
    const osrmUrl = `https://router.project-osrm.org/route/v1/${osrmProfile}/${startLng},${startLat};${destLng},${destLat}?overview=full&geometries=geojson&steps=true`;

    try {
      const res = await fetch(osrmUrl);
      if (!res.ok) throw new Error(`OSRM routing server responded with status ${res.status}`);
      const data = await res.json();

      if (!data.routes || data.routes.length === 0) {
        throw new Error('No driving route found via roads between these points.');
      }

      const primaryRoute = data.routes[0];
      const rawCoords = primaryRoute.geometry.coordinates; // [lng, lat]
      const formattedCoords: [number, number][] = rawCoords.map((c: [number, number]) => [c[1], c[0]]);

      // Authentic duration calculation per mode based on real-world transit speeds
      // Walking: ~5.0 km/h (1.38 m/s)
      // Bicycle / Bike: ~18.0 km/h (5.0 m/s)
      // Driving / Motor car: realistic Pakistani road speeds (45 km/h urban/rural mix, or OSRM route speed)
      let adjustedDuration = primaryRoute.duration;
      const totalDistanceMeters = primaryRoute.distance;

      if (travelMode === 'foot') {
        // Average human walking speed: 5 km/h = 1.389 m/s
        adjustedDuration = Math.round(totalDistanceMeters / 1.389);
      } else if (travelMode === 'bicycle') {
        // Average bicycle/motorbike speed: 18 km/h = 5.0 m/s
        adjustedDuration = Math.round(totalDistanceMeters / 5.0);
      } else {
        // Driving: Ensure realistic Pakistani GT road / local road mix (approx 45-50 km/h)
        const rawSpeedKmh = (totalDistanceMeters / (primaryRoute.duration || 1)) * 3.6;
        if (rawSpeedKmh < 10 || rawSpeedKmh > 110) {
          adjustedDuration = Math.round(totalDistanceMeters / 12.5); // ~45 km/h default
        } else {
          adjustedDuration = primaryRoute.duration;
        }
      }

      const parsedSteps: RouteStep[] = [];
      if (primaryRoute.legs && primaryRoute.legs[0] && primaryRoute.legs[0].steps) {
        primaryRoute.legs[0].steps.forEach((step: any) => {
          const mType = step.maneuver?.type || 'continue';
          const mMod = step.maneuver?.modifier;
          const roadName = step.name || 'Local Highway / Road';
          
          let stepDuration = step.duration;
          if (travelMode === 'foot') {
            stepDuration = Math.round(step.distance / 1.389);
          } else if (travelMode === 'bicycle') {
            stepDuration = Math.round(step.distance / 5.0);
          }

          parsedSteps.push({
            instruction: step.maneuver?.instruction || `Proceed on ${roadName}`,
            urduInstruction: getUrduManeuver(mType, mMod, roadName),
            distance: step.distance,
            duration: stepDuration,
            name: roadName,
            maneuverType: mType,
            maneuverModifier: mMod,
            location: [step.maneuver.location[1], step.maneuver.location[0]],
          });
        });
      }

      const newRouteData: RouteData = {
        distance: totalDistanceMeters,
        duration: adjustedDuration,
        coordinates: formattedCoords,
        steps: parsedSteps,
        summary: primaryRoute.legs?.[0]?.summary || 'Approaching Chahal Kalan Road, Qila Didar Singh',
      };

      setRouteData(newRouteData);
      setDistRemainingMeters(totalDistanceMeters);
      setTimeRemainingSec(adjustedDuration);

      // Render Polylines
      const map = mapInstanceRef.current;
      if (routePolylineRef.current) map.removeLayer(routePolylineRef.current);
      if (routeGlowPolylineRef.current) map.removeLayer(routeGlowPolylineRef.current);

      const glowLine = L.polyline(formattedCoords, {
        color: '#087f8c',
        weight: 9,
        opacity: 0.35,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(map);

      const mainLine = L.polyline(formattedCoords, {
        color: travelMode === 'driving' ? '#0ea5e9' : travelMode === 'bicycle' ? '#10b981' : '#f59e0b',
        weight: 5,
        opacity: 0.95,
        dashArray: travelMode === 'foot' ? '8, 8' : undefined,
      }).addTo(map);

      routeGlowPolylineRef.current = glowLine;
      routePolylineRef.current = mainLine;

      // Update or create Draggable Origin Marker
      if (originMarkerRef.current) {
        originMarkerRef.current.setLatLng(originCoords);
      } else {
        const originIcon = L.divIcon({
          className: 'custom-origin-marker',
          html: `
            <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing">
              <div class="w-5 h-5 rounded-full bg-cyan-500 border-2 border-white shadow-xl flex items-center justify-center">
                <div class="w-2 h-2 rounded-full bg-white"></div>
              </div>
              <div class="absolute -inset-2 rounded-full bg-cyan-400/40 animate-ping"></div>
              <div class="absolute -bottom-5 whitespace-nowrap px-1.5 py-0.5 rounded bg-slate-900 text-cyan-300 text-[10px] font-bold shadow-md">
                Your Departure Point
              </div>
            </div>
          `,
          iconSize: [0, 0],
        });

        const newMarker = L.marker(originCoords, { 
          icon: originIcon,
          draggable: true 
        }).addTo(map);

        newMarker.on('dragend', (e) => {
          const marker = e.target;
          const pos = marker.getLatLng();
          const draggedCoords: [number, number] = [pos.lat, pos.lng];
          setOriginCoords(draggedCoords);
          setOriginSource('pin');
          setDetectionMethod('Dragged Pin');
          setLocationStatus('Repositioned origin pin');
          reverseGeocode(draggedCoords);
        });

        originMarkerRef.current = newMarker;
      }

      // Smoothly fit bounds
      const bounds = L.latLngBounds(formattedCoords);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });

    } catch (err: any) {
      console.warn('Road routing failed, creating direct flight path fallback:', err);
      
      // If overseas or separated by ocean, draw direct air path and provide flight estimate
      const map = mapInstanceRef.current;
      const straightCoords: [number, number][] = [originCoords, HOSPITAL_COORDS];

      if (routePolylineRef.current) map.removeLayer(routePolylineRef.current);
      if (routeGlowPolylineRef.current) map.removeLayer(routeGlowPolylineRef.current);

      const airLine = L.polyline(straightCoords, {
        color: '#e11d48',
        weight: 3,
        dashArray: '8, 8',
        opacity: 0.8,
      }).addTo(map);

      routePolylineRef.current = airLine;

      const flightDuration = Math.round((directDistanceMeters / 1000 / 800) * 3600); // 800 km/h flight speed
      
      setRouteData({
        distance: directDistanceMeters,
        duration: flightDuration,
        coordinates: straightCoords,
        summary: 'Direct Air Travel Line to Pakistan',
        isFlightEstimate: true,
        steps: [
          {
            instruction: `Depart from your overseas/distant location towards Pakistan`,
            urduInstruction: `اپنے مقام سے پاکستان کی طرف روانہ ہوں`,
            distance: directDistanceMeters * 0.9,
            duration: flightDuration * 0.9,
            name: 'International Air Corridor to Lahore / Islamabad Airport',
            maneuverType: 'depart',
            location: originCoords,
          },
          {
            instruction: `Land at Lahore Allama Iqbal (LHE) or Sialkot Airport (SKT), then take GT Road to Chahal Kalan Road, Qila Didar Singh`,
            urduInstruction: `لاہور یا سیالکوٹ ایئرپورٹ پہنچ کر جی ٹی روڈ سے چہل کلاں روڈ ہسپتال پہنچیں`,
            distance: directDistanceMeters * 0.1,
            duration: flightDuration * 0.1,
            name: 'GT Road to Qila Didar Singh',
            maneuverType: 'arrive',
            location: HOSPITAL_COORDS,
          }
        ]
      });

      setRouteError(
        'Your starting point has no direct land road connection to Pakistan (or is outside the road network). We have calculated the direct aerial path. For local driving directions, select a departure city in Pakistan below (e.g. Lahore, Islamabad, or Sialkot).'
      );

      const bounds = L.latLngBounds(straightCoords);
      map.fitBounds(bounds, { padding: [50, 50] });
    } finally {
      setIsLoadingRoute(false);
    }
  }, [originCoords, travelMode]);

  // Recalculate route whenever origin or travel mode updates
  useEffect(() => {
    fetchOSRMRoute();
  }, [fetchOSRMRoute]);

  // 3D Live Driving Simulation Loop
  const startSimulation = () => {
    if (!routeData || routeData.coordinates.length < 2 || !mapInstanceRef.current) return;

    setIsSimulating(true);
    simStartTimeRef.current = performance.now();

    const map = mapInstanceRef.current;
    const coords = routeData.coordinates;
    const totalPoints = coords.length;

    const vehicleIcon = L.divIcon({
      className: 'custom-vehicle-marker',
      html: `
        <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
          <div class="w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center border-2 border-white shadow-2xl animate-pulse">
            ${
              travelMode === 'driving' 
                ? '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/></svg>'
                : travelMode === 'bicycle'
                ? '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="5.5" cy="17.5" r="3.5" stroke-width="2"/><circle cx="18.5" cy="17.5" r="3.5" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 6a1 1 0 100-2 1 1 0 000 2zm-3 11.5L9 9l3-3 3 3v8.5"/></svg>'
                : '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>'
            }
          </div>
          <div class="absolute -top-6 whitespace-nowrap bg-[#092f3a] text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded shadow border border-amber-400/30">
            GPS Live Sim
          </div>
        </div>
      `,
      iconSize: [0, 0],
    });

    if (!animatedVehicleMarkerRef.current) {
      animatedVehicleMarkerRef.current = L.marker(coords[0], { icon: vehicleIcon, zIndexOffset: 1000 }).addTo(map);
    } else {
      animatedVehicleMarkerRef.current.setIcon(vehicleIcon);
      animatedVehicleMarkerRef.current.setLatLng(coords[0]);
    }

    const durationSec = Math.max(14, Math.min(40, totalPoints * 0.12)) / simulationSpeed;
    const totalDurationMs = durationSec * 1000;

    const animateLoop = (now: number) => {
      if (!simStartTimeRef.current) simStartTimeRef.current = now;
      const elapsed = now - simStartTimeRef.current;
      const progress = Math.min(1, elapsed / totalDurationMs);
      setSimulationProgress(progress);

      const exactIndex = progress * (totalPoints - 1);
      const floorIndex = Math.floor(exactIndex);
      const nextIndex = Math.min(totalPoints - 1, floorIndex + 1);
      const subRatio = exactIndex - floorIndex;

      const currentPoint = coords[floorIndex];
      const nextPoint = coords[nextIndex];

      const interpolatedLat = currentPoint[0] + (nextPoint[0] - currentPoint[0]) * subRatio;
      const interpolatedLng = currentPoint[1] + (nextPoint[1] - currentPoint[1]) * subRatio;
      const interpolatedPos: [number, number] = [interpolatedLat, interpolatedLng];

      if (animatedVehicleMarkerRef.current) {
        animatedVehicleMarkerRef.current.setLatLng(interpolatedPos);
      }

      if (progress < 1) {
        map.panTo(interpolatedPos, { animate: false });

        if (routeData.steps.length > 0) {
          const stepIndex = Math.min(
            routeData.steps.length - 1,
            Math.floor(progress * routeData.steps.length)
          );
          setCurrentStepIndex(stepIndex);
        }

        animFrameIdRef.current = requestAnimationFrame(animateLoop);
      } else {
        setIsSimulating(false);
        map.flyTo(HOSPITAL_COORDS, 16, { duration: 1 });
        if (hospitalMarkerRef.current) {
          hospitalMarkerRef.current.openPopup();
        }
      }
    };

    animFrameIdRef.current = requestAnimationFrame(animateLoop);
  };

  const pauseSimulation = () => {
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }
    setIsSimulating(false);
  };

  const resetSimulation = () => {
    pauseSimulation();
    setSimulationProgress(0);
    setCurrentStepIndex(0);
    if (animatedVehicleMarkerRef.current && mapInstanceRef.current) {
      mapInstanceRef.current.removeLayer(animatedVehicleMarkerRef.current);
      animatedVehicleMarkerRef.current = null;
    }
    if (mapInstanceRef.current && routePolylineRef.current) {
      mapInstanceRef.current.fitBounds(routePolylineRef.current.getBounds(), { padding: [40, 40] });
    }
  };

  // Real-Life "Start Trip / Journey" Mode
  // Locks the view onto the user's vehicle/location, tracks movement in real time,
  // gives voice and visual step alerts, and guides them turn-by-turn directly to the hospital.
  const startLiveTrip = () => {
    if (!routeData || routeData.coordinates.length < 2) return;
    setIsLiveTripActive(true);
    setIs3DMode(true); // Automatically tilt map into 3D navigation perspective

    // Voice announcement
    const startText = `Starting trip to Ali Welfare Trust Hospital, Chahal Kalan Road, Qila Didar Singh. Distance is ${(routeData.distance / 1000).toFixed(1)} kilometers. Safe journey!`;
    speakInstruction(startText);

    const map = mapInstanceRef.current;
    if (map) {
      map.setView(originCoords, 17, { animate: true });
    }

    // Start watching real device GPS if supported
    if ('geolocation' in navigator) {
      try {
        geoWatchIdRef.current = navigator.geolocation.watchPosition(
          (pos) => {
            const userLat = pos.coords.latitude;
            const userLng = pos.coords.longitude;
            const userSpeed = pos.coords.speed !== null ? Math.round(pos.coords.speed * 3.6) : (travelMode === 'driving' ? 45 : 15);
            setSpeedKmh(Math.max(0, userSpeed));

            const currentPos: [number, number] = [userLat, userLng];
            setOriginCoords(currentPos);

            if (mapInstanceRef.current) {
              mapInstanceRef.current.panTo(currentPos, { animate: true });
            }

            // Recalculate remaining distance to hospital
            const remaining = calculateHaversineDistance(currentPos, HOSPITAL_COORDS);
            setDistRemainingMeters(remaining);

            // Find closest step in route
            if (routeData && routeData.steps.length > 0) {
              let closestIdx = 0;
              let minStepDist = Infinity;
              routeData.steps.forEach((st, idx) => {
                const d = calculateHaversineDistance(currentPos, st.location);
                if (d < minStepDist) {
                  minStepDist = d;
                  closestIdx = idx;
                }
              });
              if (closestIdx !== currentStepIndex) {
                setCurrentStepIndex(closestIdx);
                const nextInstruction = routeData.steps[closestIdx]?.instruction;
                if (nextInstruction) {
                  speakInstruction(nextInstruction);
                }
              }
            }

            // Check if arrived (within 40 meters of hospital)
            if (remaining < 40) {
              speakInstruction('You have arrived at Ali Welfare Trust Hospital!');
              stopLiveTrip();
            }
          },
          (err) => {
            console.warn('Geolocation watch error, falling back to simulated driving assist:', err.message);
            // If GPS hardware is unavailable, run live real-time simulation so user can follow the route
            if (!isSimulating) {
              startSimulation();
            }
          },
          { enableHighAccuracy: true, maximumAge: 3000, timeout: 10000 }
        );
      } catch (e) {
        console.warn('Could not initialize geolocation watch:', e);
      }
    } else {
      startSimulation();
    }
  };

  const stopLiveTrip = () => {
    setIsLiveTripActive(false);
    if (geoWatchIdRef.current !== null) {
      navigator.geolocation.clearWatch(geoWatchIdRef.current);
      geoWatchIdRef.current = null;
    }
    pauseSimulation();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Step jumper during Trip/Simulation
  const jumpToStep = (index: number) => {
    if (!routeData || !routeData.steps[index] || !mapInstanceRef.current) return;
    setCurrentStepIndex(index);
    const stepLoc = routeData.steps[index].location;
    mapInstanceRef.current.flyTo(stepLoc, 17, { duration: 0.8 });
    const instruction = routeData.steps[index].instruction;
    speakInstruction(instruction);
  };

  const formatDistance = (meters: number) => {
    if (meters < 1000) return `${Math.round(meters)} m`;
    return `${(meters / 1000).toFixed(1)} km`;
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.round(seconds / 60);
    if (mins < 60) return `${mins} mins`;
    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;
    return `${hrs} hr ${remMins} min`;
  };

  const filteredHubs = POPULAR_HUBS.filter(h => h.category === selectedHubCategory);

  return (
    <section 
      id="hospital-route-navigator" 
      className="py-6 sm:py-8 bg-gradient-to-b from-[#f8fafc] via-[#f0f9fa] to-white border-t border-slate-200"
    >
      <div className="site-container">

        {/* Header Section */}
        <div className="text-center max-w-3xl 2xl:max-w-4xl mx-auto mb-4 sm:mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#087f8c] text-xs font-bold uppercase tracking-wider mb-2 shadow-xs">
            <Navigation className="w-3.5 h-3.5 text-[#087f8c] animate-pulse" />
            <span>Universal Navigation Engine • Real-Life GPS & Any Location Routing</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#092f3a] tracking-tight">
            Live Hospital GPS & Turn-by-Turn Routing
          </h2>

          <p className="font-urdu text-xs sm:text-sm text-teal-800 font-semibold mt-1" dir="rtl">
            آپ پاکستان یا دنیا کے کسی بھی شہر سے ہوں، علی ویلفیئر ٹرسٹ ہسپتال، چہل کلاں روڈ تک سیدھا راستہ معلوم کریں
          </p>

          <p className="text-xs text-slate-600 mt-1">
            No Google Maps required. Automatic GPS detection, IP network geolocation, interactive search for <strong className="text-slate-800">any city or town</strong>, and turn directions straight to <strong className="text-[#087f8c]">Chahal Kalan Road, Qila Didar Singh, Gujranwala</strong>.
          </p>
        </div>

        {/* Universal Search & Quick Location Toolbar */}
        <div className="mb-4 max-w-4xl mx-auto">
          <div className="bg-white p-2.5 sm:p-3 rounded-2xl border-2 border-[#087f8c]/30 shadow-md relative">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              
              {/* Search Any City / Address Input */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-4 h-4 text-[#087f8c]" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type any city, area, or address (e.g. Lahore, Islamabad, Sialkot, Faisalabad...)"
                  className="w-full pl-10 pr-9 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-[#087f8c] rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#087f8c]/20 transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => { setSearchQuery(''); setShowDropdown(false); }}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                {isSearching && (
                  <div className="absolute right-9 top-3">
                    <RefreshCw className="w-4 h-4 text-teal-600 animate-spin" />
                  </div>
                )}

                {/* Auto-complete dropdown */}
                {showDropdown && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl border border-slate-200 shadow-2xl z-[1000] overflow-hidden max-h-60 overflow-y-auto">
                    {searchResults.map((result) => (
                      <button
                        key={result.place_id}
                        type="button"
                        onClick={() => handleSelectSearchResult(result)}
                        className="w-full px-4 py-2.5 text-left text-xs hover:bg-teal-50 flex items-start gap-2.5 border-b border-slate-100 last:border-0 transition-colors cursor-pointer"
                      >
                        <MapPin className="w-4 h-4 text-[#087f8c] shrink-0 mt-0.5" />
                        <span className="text-slate-800 font-semibold truncate">
                          {result.display_name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Force GPS Detect Button */}
              <button
                type="button"
                onClick={() => detectUserLocation(true)}
                disabled={isLocating}
                className="px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-[#087f8c] hover:bg-[#045d67] text-white flex items-center justify-center gap-2 shadow-md border border-teal-400/40 transition-all cursor-pointer whitespace-nowrap disabled:opacity-50"
                title="Detect exact device coordinates"
              >
                <LocateFixed className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
                <span>{isLocating ? 'Detecting GPS...' : 'Detect My Exact Location'}</span>
              </button>
            </div>

            {/* Live Location Status Indicator Banner */}
            <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="font-semibold text-slate-500">Origin:</span>
                <strong className="text-[#092f3a] truncate max-w-xs sm:max-w-md">
                  {originLabel}
                </strong>
                <span className="px-2 py-0.5 rounded-md bg-teal-50 text-[#087f8c] border border-teal-200 text-[10px] font-bold">
                  {detectionMethod}
                </span>
              </div>

              <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <span>{locationStatus}</span>
              </div>
            </div>

            {/* Permission / Geolocation Note if browser blocked GPS */}
            {permissionNotice && (
              <div className="mt-2 p-2 rounded-xl bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-800 flex items-center gap-2 animate-fade-in">
                <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{permissionNotice}</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Grid: Map & Controls + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* =========================================================================
              LEFT COLUMN: Interactive Leaflet Map with 3D Controls (7/12 col on lg)
              ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            
            {/* Map Action Toolbar */}
            <div className="bg-[#092f3a] text-white p-3 sm:p-4 rounded-2xl shadow-lg border border-teal-500/30 flex flex-wrap items-center justify-between gap-3">
              
              {/* Travel Mode Selector */}
              <div className="flex items-center gap-1.5 bg-black/30 p-1 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setTravelMode('driving')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    travelMode === 'driving'
                      ? 'bg-cyan-500 text-slate-950 shadow-md scale-105'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                  title="Car / Motor Car Mode"
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>Car</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTravelMode('bicycle')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    travelMode === 'bicycle'
                      ? 'bg-emerald-400 text-slate-950 shadow-md scale-105'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                  title="Bicycle / Bike Mode"
                >
                  <Bike className="w-3.5 h-3.5" />
                  <span>Bike</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTravelMode('foot')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    travelMode === 'foot'
                      ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                  title="Walking Mode"
                >
                  <Footprints className="w-3.5 h-3.5" />
                  <span>Walking</span>
                </button>
              </div>

              {/* 3D View Toggle */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIs3DMode(!is3DMode)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                    is3DMode 
                      ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md' 
                      : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                  }`}
                  title="Toggle 3D Aerial Driving Perspective"
                >
                  <Layers className="w-3.5 h-3.5 text-amber-300" />
                  <span>3D Tilt View</span>
                </button>
              </div>

            </div>

            {/* Map Canvas Box */}
            <div 
              className="relative w-full h-[280px] sm:h-[340px] lg:h-[380px] rounded-2xl overflow-hidden border-2 border-[#087f8c]/30 shadow-xl bg-slate-900 transition-all duration-500"
              style={{
                perspective: is3DMode ? '1000px' : 'none',
              }}
            >
              <div 
                ref={mapContainerRef} 
                className="w-full h-full z-10 transition-transform duration-700 ease-out"
                style={{
                  transform: is3DMode ? 'rotateX(26deg) scale(1.04)' : 'none',
                  transformOrigin: '50% 80%',
                }}
              />

              {/* Floating Real-Time Trip / Driving Navigation HUD Overlay */}
              {(isLiveTripActive || isSimulating) && routeData && (
                <div className="absolute top-3 left-3 right-3 sm:right-auto sm:max-w-lg z-[500] bg-[#092f3a]/95 backdrop-blur-md text-white p-3.5 rounded-2xl border border-teal-400/50 shadow-2xl animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-lg font-bold">
                      {getManeuverIcon(
                        routeData.steps[currentStepIndex]?.maneuverType || 'continue',
                        routeData.steps[currentStepIndex]?.maneuverModifier
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-[11px] font-bold text-teal-300 uppercase tracking-wider mb-0.5">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                          <span>{isLiveTripActive ? 'Live Trip In Progress' : '3D Route Sim'}</span>
                        </span>
                        <span className="text-amber-300 font-mono">
                          Step {currentStepIndex + 1}/{routeData.steps.length}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-black text-white truncate">
                        {routeData.steps[currentStepIndex]?.instruction || 'Proceed towards Chahal Kalan Road'}
                      </p>
                      <p className="text-[11px] sm:text-xs font-urdu text-amber-300 truncate" dir="rtl">
                        {routeData.steps[currentStepIndex]?.urduInstruction}
                      </p>
                    </div>
                    
                    {/* Voice Mute Toggle */}
                    <button
                      type="button"
                      onClick={() => {
                        const newMute = !isVoiceGuidanceMuted;
                        setIsVoiceGuidanceMuted(newMute);
                        if (!newMute && routeData.steps[currentStepIndex]?.instruction) {
                          speakInstruction(routeData.steps[currentStepIndex].instruction);
                        }
                      }}
                      className={`p-2 rounded-xl border transition-colors cursor-pointer shrink-0 ${
                        isVoiceGuidanceMuted 
                          ? 'bg-rose-950/70 border-rose-600 text-rose-300' 
                          : 'bg-teal-900/70 border-teal-500 text-teal-200'
                      }`}
                      title={isVoiceGuidanceMuted ? 'Unmute voice navigation' : 'Mute voice navigation'}
                    >
                      {isVoiceGuidanceMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Trip Sub-Bar: Speed, Distance Left, and Step Stepper */}
                  <div className="mt-2.5 pt-2 border-t border-teal-500/25 flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-white/10 text-cyan-200 font-mono text-[11px]">
                        {speedKmh > 0 ? `${speedKmh} km/h` : `${travelMode === 'driving' ? 'Driving' : travelMode === 'bicycle' ? 'Biking' : 'Walking'}`}
                      </span>
                      <span className="text-slate-300 text-[11px]">
                        Remain: <strong>{formatDistance(distRemainingMeters || routeData.distance)}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => jumpToStep(Math.max(0, currentStepIndex - 1))}
                        disabled={currentStepIndex === 0}
                        className="p-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-30 cursor-pointer"
                        title="Previous step"
                      >
                        <Rewind className="w-3.5 h-3.5 text-white" />
                      </button>
                      <button
                        type="button"
                        onClick={() => jumpToStep(Math.min(routeData.steps.length - 1, currentStepIndex + 1))}
                        disabled={currentStepIndex >= routeData.steps.length - 1}
                        className="p-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-30 cursor-pointer"
                        title="Next step"
                      >
                        <FastForward className="w-3.5 h-3.5 text-white" />
                      </button>
                      <button
                        type="button"
                        onClick={stopLiveTrip}
                        className="ml-1 px-2 py-0.5 rounded-md bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] cursor-pointer"
                      >
                        End Trip
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Loading Indicator */}
              {isLoadingRoute && (
                <div className="absolute inset-0 z-[600] bg-[#092f3a]/75 backdrop-blur-xs flex flex-col items-center justify-center text-white p-4">
                  <RefreshCw className="w-8 h-8 text-teal-300 animate-spin mb-2" />
                  <p className="text-sm font-bold">Computing Road Navigation via OSRM...</p>
                  <p className="text-xs text-slate-300 mt-1">Connecting origin to Chahal Kalan Road, Qila Didar Singh</p>
                </div>
              )}

              {/* Map Click Hint Pill */}
              <div className="absolute bottom-2 left-2 z-[400] bg-slate-900/80 backdrop-blur-xs text-slate-300 text-[10px] px-2.5 py-1 rounded-md border border-white/10 hidden sm:block pointer-events-none">
                💡 Click anywhere on map or drag your pin to change departure point
              </div>

              {/* Destination Tag */}
              <div className="absolute top-2 right-2 z-[400] bg-white/95 backdrop-blur-md text-[#092f3a] px-2.5 py-1 rounded-lg border border-teal-500/30 text-[11px] font-bold shadow-md flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Destination: Ali Welfare Hospital</span>
              </div>
            </div>

            {/* Real-Life Trip Navigation & 3D Simulation Controls */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {/* Primary Start Trip / Journey Button */}
                {!isLiveTripActive ? (
                  <button
                    type="button"
                    onClick={startLiveTrip}
                    disabled={!routeData || isLoadingRoute}
                    className="px-4 py-2.5 rounded-xl bg-[#087f8c] hover:bg-[#045d67] text-white text-xs font-black flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 active:scale-95"
                  >
                    <Navigation className="w-4 h-4 fill-current animate-pulse text-amber-300" />
                    <span>Start Live Trip / Journey</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={stopLiveTrip}
                    className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black flex items-center gap-2 shadow-md transition-all cursor-pointer active:scale-95"
                  >
                    <X className="w-4 h-4" />
                    <span>Exit Navigation Mode</span>
                  </button>
                )}

                {/* Secondary 3D Real-Life Simulation */}
                {!isSimulating ? (
                  <button
                    type="button"
                    onClick={startSimulation}
                    disabled={!routeData || isLoadingRoute}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
                    <span>3D Route Preview</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={pauseSimulation}
                    className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                  >
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>Pause Sim</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={resetSimulation}
                  disabled={simulationProgress === 0 && !isLiveTripActive}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-40"
                  title="Reset vehicle to starting point"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Speed Multipliers */}
              <div className="flex items-center gap-1 text-xs">
                <span className="text-slate-500 text-[11px] font-semibold mr-1">Speed:</span>
                {[1, 2, 4].map((spd) => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => setSimulationSpeed(spd)}
                    className={`px-2 py-1 rounded-md font-mono text-[11px] font-bold border transition-colors cursor-pointer ${
                      simulationSpeed === spd
                        ? 'bg-[#087f8c] text-white border-[#087f8c]'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* =========================================================================
              RIGHT COLUMN: Distance, Time, and Turn Directions (5/12 col)
              ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Key Metrics Card (Real-Time Distance & Estimated Travel Time) */}
            <div className="bg-gradient-to-br from-[#092f3a] to-[#045d67] text-white p-5 rounded-3xl shadow-xl border border-teal-500/30 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-teal-200 mb-3">
                <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-amber-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{routeData?.isFlightEstimate ? 'Direct Flight Assessment' : 'Real Road Assessment'}</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10.5px]">
                  {routeData?.isFlightEstimate ? 'Air Vector' : 'OSRM Real Roads'}
                </span>
              </div>

              {/* Big Metric Display */}
              <div className="grid grid-cols-2 gap-4 py-2 border-y border-teal-500/25">
                <div>
                  <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                    <Navigation className="w-3 h-3 text-cyan-300" />
                    <span>Real Distance</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                    {routeData ? formatDistance(routeData.distance) : '--'}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-300" />
                    <span>Estimated Time</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-300 mt-1">
                    {routeData ? formatDuration(routeData.duration) : '--'}
                  </div>
                </div>
              </div>

              {/* Origin & Destination Summary */}
              <div className="mt-3 text-xs space-y-1.5">
                <div className="flex items-start gap-2 text-slate-200">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1 shrink-0" />
                  <p className="truncate">
                    <strong className="text-white">From:</strong> {originLabel}
                  </p>
                </div>
                <div className="flex items-start gap-2 text-slate-200">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0" />
                  <p>
                    <strong className="text-white">To:</strong> Ali Welfare Trust Hospital, <span className="text-amber-300 font-semibold">Chahal Kalan Road, Qila Didar Singh, Gujranwala</span>
                  </p>
                </div>
              </div>

              {/* Quick Trip Trigger from card */}
              <div className="mt-4 pt-3 border-t border-teal-500/25">
                {!isLiveTripActive ? (
                  <button
                    type="button"
                    onClick={startLiveTrip}
                    disabled={!routeData || isLoadingRoute}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#087f8c] hover:bg-[#045d67] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Navigation className="w-4 h-4 fill-current text-amber-300" />
                    <span>Start Journey to Hospital Now</span>
                  </button>
                ) : (
                  <div className="flex items-center justify-between text-xs bg-teal-500/20 border border-teal-400/40 rounded-xl px-3 py-2">
                    <span className="flex items-center gap-2 font-bold text-teal-300">
                      <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                      Live Navigation Active
                    </span>
                    <button
                      type="button"
                      onClick={stopLiveTrip}
                      className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] cursor-pointer"
                    >
                      Stop
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Departure Hubs (Major Cities & Regional Centers) */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#087f8c]" />
                  <span>Popular Departure Hubs</span>
                </label>

                {/* Category Tab Pills */}
                <div className="flex items-center gap-1 text-[11px] bg-slate-100 p-0.5 rounded-lg">
                  {['Major Cities', 'Nearby Towns', 'Gujranwala Area'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedHubCategory(cat)}
                      className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                        selectedHubCategory === cat 
                          ? 'bg-white text-[#087f8c] font-bold shadow-2xs' 
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {cat.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {filteredHubs.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setOriginCoords(preset.coords);
                      setOriginLabel(preset.name);
                      setOriginSource('hub');
                      setDetectionMethod(`Hub: ${preset.name.split('(')[0]}`);
                      setLocationStatus(`Selected ${preset.name.split('(')[0]}`);
                      setPermissionNotice(null);
                      if (mapInstanceRef.current) {
                        mapInstanceRef.current.flyTo(preset.coords, 12, { duration: 1.2 });
                      }
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer text-left ${
                      originCoords[0] === preset.coords[0] && originCoords[1] === preset.coords[1]
                        ? 'bg-teal-50 border-[#087f8c] text-[#087f8c] font-bold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{preset.name.split('(')[0]}</span>
                    <span className="text-[10px] text-slate-400 ml-1">({preset.distEstimate})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Turn-by-Turn Step-by-Step Directions Container */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex-1 flex flex-col min-h-[220px] max-h-[280px]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#092f3a] flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-[#087f8c]" />
                  <span>Turn-by-Turn Directions ({routeData?.steps?.length || 0} Steps)</span>
                </h3>
                <span className="text-[10px] text-slate-400 font-bold">Urdu + English</span>
              </div>

              {/* Scrollable Steps List */}
              <div className="overflow-y-auto space-y-2 pr-1 flex-1 custom-scrollbar">
                {routeError && (
                  <div className="p-3 bg-amber-50 text-amber-800 rounded-xl text-xs flex items-start gap-2 border border-amber-200 mb-2">
                    <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                    <div>
                      <p className="font-bold">Notice</p>
                      <p className="mt-0.5 leading-relaxed">{routeError}</p>
                    </div>
                  </div>
                )}

                {routeData && routeData.steps.length > 0 ? (
                  routeData.steps.map((step, idx) => {
                    const isStepActive = idx === currentStepIndex && (isSimulating || isLiveTripActive);
                    return (
                      <div
                        key={idx}
                        onClick={() => jumpToStep(idx)}
                        className={`p-2.5 rounded-xl border transition-all text-xs flex items-start gap-3 cursor-pointer ${
                          isStepActive
                            ? 'bg-amber-50/90 border-amber-400 shadow-xs ring-2 ring-amber-400/50'
                            : 'bg-slate-50/60 border-slate-100 hover:bg-teal-50/60 hover:border-teal-200'
                        }`}
                        title="Click to focus this turn on the map"
                      >
                        {/* Step Number & Icon */}
                        <div className="flex flex-col items-center shrink-0">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                            isStepActive ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-teal-50 text-[#087f8c]'
                          }`}>
                            {getManeuverIcon(step.maneuverType, step.maneuverModifier)}
                          </div>
                          <span className="text-[10px] font-mono font-bold text-slate-400 mt-1">
                            #{idx + 1}
                          </span>
                        </div>

                        {/* Text Instruction */}
                        <div className="flex-1 min-w-0">
                          <p className={`font-bold leading-tight ${isStepActive ? 'text-amber-950' : 'text-slate-900'}`}>
                            {step.instruction}
                          </p>
                          <p className="font-urdu text-[11px] text-teal-800 font-semibold mt-0.5" dir="rtl">
                            {step.urduInstruction}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
                            <span>Distance: <strong>{formatDistance(step.distance)}</strong></span>
                            {step.duration > 0 && (
                              <span>• ~{formatDuration(step.duration)}</span>
                            )}
                            {isStepActive && (
                              <span className="text-amber-600 font-bold flex items-center gap-0.5 ml-auto">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping inline-block" />
                                Current Turn
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-slate-400 text-xs">
                    Computing route directions...
                  </div>
                )}
              </div>

              {/* Emergency Call to Action */}
              <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <a
                  href={`tel:${HOSPITAL_INFO.emergencyPhone}`}
                  className="flex-1 py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Ambulance: {HOSPITAL_INFO.emergencyPhone}</span>
                </a>

                <a
                  href={`https://wa.me/${HOSPITAL_INFO.whatsapp}?text=I%20am%20traveling%20to%20Ali%20Welfare%20Trust%20Hospital%20Chahal%20Kalan%20Road`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-3 rounded-xl bg-[#087f8c] hover:bg-[#045d67] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <span>Share Location</span>
                </a>
              </div>

            </div>

          </div>

        </div>

        {/* Campus Arrival, Access & Emergency Amenities Strip (Eliminates empty space and bridges to contact) */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3 hover:border-rose-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-800 uppercase tracking-wider">24/7 Dedicated Trauma Bay</p>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Direct ambulance ramp & zero-delay emergency stretcher access on Chahal Kalan Road.
                </p>
              </div>
            </div>

            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3 hover:border-teal-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#087f8c] shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-800 uppercase tracking-wider">Ground-Floor Dialysis Entry</p>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Barrier-free wheelchair corridor connecting parking directly to the 16-bed Dialysis Center.
                </p>
              </div>
            </div>

            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3 hover:border-teal-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#087f8c] shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-800 uppercase tracking-wider">Free Monitored Parking</p>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Spacious on-site parking lot for patient families, visitors, and patient transport vehicles.
                </p>
              </div>
            </div>

            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3 hover:border-amber-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-800 uppercase tracking-wider">24/7 Lab & Pharmacy Access</p>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Immediate emergency prescription dispensing, automated blood tests & ultrasound sonology.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
