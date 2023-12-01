import { CreateCompletionResponse } from "openai"

export const useItineraryData = () => {
  const itineraryData = useState<CreateCompletionResponse>('itinerary');

  const setItineraryData = (itinerary: CreateCompletionResponse) => {
    itineraryData.value = itinerary
  }

  return {
    itineraryData,
    setItineraryData
  }
}