
const BASE_URL = "https://webapiorg.easetrackwms.com/api";

interface ApiOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

export const fetchApi = async (endpoint: string, options: ApiOptions = {}) => {
  try {
    const token = localStorage.getItem("token");
    const location = localStorage.getItem("locationId") || "1";
    
    const headers = {
      "Accept": "*/*",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      ...(location ? { "X-Location": location } : {}),
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers
    };
    
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: options.method || "GET",
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};
