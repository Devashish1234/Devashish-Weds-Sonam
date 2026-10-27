import type { CoupleOrder, FamilySide, WeddingData } from '../types'

const publicBase = import.meta.env.BASE_URL

export const weddingData: WeddingData = {
  groom: {
    name: 'Devashish Shukla',
    shortName: 'Devashish',
    parents: ['Kamal Kishor Shukla', 'Anita Shukla'],
  },
  bride: {
    name: 'Sonam Durga',
    shortName: 'Sonam',
    parents: ['Dev Chand Durga', 'Rukmini Durga'],
  },
  weddingDate: '2026-11-30',
  heroDate: '30 November 2026',
  venue: {
    name: 'Royal Anand Resort & Club',
    address: 'Anandpuram, Tikra, Kanpur, Uttar Pradesh 209101',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Royal+Anand+Resort+%26+Club%2C+Anandpuram%2C+Tikra%2C+Kanpur%2C+Uttar+Pradesh+209101',
  },
  contacts: {
    groomSide: '+91 90443 31930',
    brideSide: '+91 70245 52600',
  },
  events: [
    {
      id: 'haldi',
      title: 'Haldi',
      date: '2026-11-29',
      startTime: '12:00 PM',
      endTime: '3:00 PM',
      note: 'A morning of turmeric, laughter, and blessings.',
    },
    {
      id: 'ring-ceremony',
      title: 'Ring Ceremony',
      date: '2026-11-29',
      startTime: '7:00 PM',
      endTime: '10:00 PM',
      note: 'An evening to celebrate the promise of forever.',
    },
    {
      id: 'wedding',
      title: 'Varmala & Reception',
      date: '2026-11-30',
      startTime: '6:00 PM',
      endTime: '10:00 PM',
      note: 'Join us as we begin our next chapter together.',
    },
  ],
  hashtag: '#DevashishWedsSonam',
  assets: {
    mandap: `${publicBase}images/temple-mandap.png`,
    couplePhotos: [
      { src: `${publicBase}images/couple-snow.jpeg`, alt: 'Together outdoors in a snowy landscape.' },
      { src: `${publicBase}images/couple-portrait.jpeg`, alt: 'A close-up selfie together.' },
      { src: `${publicBase}images/couple-lights.jpeg`, alt: 'Sharing a smile beneath warm lights.' },
    ],
    videoUrl: '',
    musicUrl: '',
  },
}

export function getCoupleOrder(side: FamilySide): CoupleOrder {
  return side === 'bride'
    ? { first: weddingData.bride, second: weddingData.groom }
    : { first: weddingData.groom, second: weddingData.bride }
}
