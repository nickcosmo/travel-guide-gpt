import { Configuration, OpenAIApi } from "openai";

export default defineEventHandler(async (event) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAPI_API_KEY
  });

  const openai = new OpenAIApi(configuration);

  const { country, city, startDate, endDate } = await readBody(event);
  // TODO add validation for 2 days!
  const prompt = `
    Write a travel itinerary to ${city}, ${country} for a trip to visit from ${startDate} to ${endDate}.\n
    For each day give a recommendation of a restaurant to eat at for Breakfast, Lunch, and Dinner, with a link to the website if there is one, and the latitude and longitude of the location.\n
    For each day give 3 recommendations of popular attractions to see while visiting, with links to the websites of any recommended attractions, specify if anything requires booking in advance, and the latitude and longitude of the location.\n
    Return the information in JSON format like the following:\n
    {
      "city_location": {
        "lat": ...,
        "lng": ...
      },
      "itinerary": [
        {
          "date": ...,
          "breakfast": {
            "name": ...,
            "link": ...,
            "position": {"lat": ..., "lng": ...}
          },
          "lunch": {
            "name": ...,
            "link": ...,
            "position": {"lat": ..., "lng": ...}
          },
          "dinner": {
            "name": ...,
            "link": ...,
            "position": {"lat": ..., "lng": ...}
          },
          "attraction1": {
            "name": ...,
            "link": ...,
            "bookingRequired": true/false,
            "position": {"lat": ..., "lng": ...}
          },
          "attraction2": {
            "name": ...,
            "link": ...,
            "bookingRequired": true/false,
            "position": {"lat": ..., "lng": ...}
          },
          "attraction3": {
            "name": ...,
            "link": ...,
            "bookingRequired": true/false,
            "position": {"lat": ..., "lng": ...}
          }
        }
      ]
    }
  `

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.6,
      max_tokens: 2000,
    });

    return {
      response: completion.data
    }
  } catch (e) {
    console.log('e :>> ', e);
    throw e;
  }
})