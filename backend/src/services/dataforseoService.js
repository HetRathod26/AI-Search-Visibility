import axios from "axios";

export async function getGoogleSERPData(searchQuery = 'OpenAI', locationName = 'India') {
  try {
    console.log(`Calling DataForSEO API for query: "${searchQuery}" in ${locationName}...`);
    
    // Load credentials inside function to ensure dotenv is loaded
    const login = process.env.DATAFORSEO_LOGIN;
    const password = process.env.DATAFORSEO_PASSWORD;
    
    console.log('DataForSEO Login:', login ? 'SET' : 'NOT SET');
    console.log('DataForSEO Password:', password ? 'SET' : 'NOT SET');
    
    if (!login || !password) {
      throw new Error('DataForSEO credentials not found in environment variables');
    }
    
    const auth = Buffer.from(`${login}:${password}`).toString("base64");
    
    const response = await axios.post(
      "https://api.dataforseo.com/v3/serp/google/organic/live/advanced",
      [
        {
          keyword: searchQuery,
          location_name: locationName,
          language_name: "English",
          depth: 10
        }
      ],
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log(`DataForSEO response received for "${searchQuery}"`);
    return response.data;
  } catch (error) {
    console.error('DataForSEO API Error:', error.response?.data || error.message);
    throw new Error(`DataForSEO API failed: ${error.message}`);
  }
}
