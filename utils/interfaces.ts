export interface IPositionBlock {
  lat: number,
  lng: number
}

export interface IMealBlock {
  name: string,
  link: string,
  position: IPositionBlock
}

export interface IAttractionBlock {
  name: string,
  link: string,
  bookingRequired: boolean,
  position: IPositionBlock
}

export interface IItinerary {
  date: string,
  breakfast: IMealBlock,
  lunch: IMealBlock,
  dinner: IMealBlock,
  attraction1: IAttractionBlock,
  attraction2: IAttractionBlock,
  attraction3: IAttractionBlock,
}