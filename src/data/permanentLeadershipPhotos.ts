export interface LeadershipPhotoInfo {
  id: string;
  defaultPath: string;
  label: string;
}

export const LEADERSHIP_PHOTO_DEFAULTS: Record<string, string> = {
  'nazar-alvi': '/images/founder-nazar.jpg',
  'zamin-alvi': '/images/ceo-zamin-alvi.jpg',
  'khawar-awan': '/images/director-khawar-awan.jpg',
  'custom-dept': '/images/custom-dept-facility.jpg',
};
