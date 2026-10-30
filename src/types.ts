export type WeddingEvent = {
  id: string
  title: string
  date: string
  startTime: string
  endTime: string
  note?: string
}

export type FamilySide = 'groom' | 'bride'

export type WeddingPerson = {
  name: string
  shortName: string
  parents: [string, string]
}

export type CoupleOrder = { first: WeddingPerson; second: WeddingPerson }

export type WeddingData = {
  groom: WeddingPerson
  bride: WeddingPerson
  weddingDate: string
  heroDate: string
  venue: { name: string; address: string; mapUrl: string }
  contacts: { groomSide: string; brideSide: string }
  events: WeddingEvent[]
  hashtag: string
  assets: { mandap: string; videoUrl: string; musicUrl: string }
}

export type Wish = {
  id: string
  name: string
  message: string
  createdAt: number
}

