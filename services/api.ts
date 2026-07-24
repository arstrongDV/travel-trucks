// import axios from "axios";

// const baseURL = '/api';

// const nextServer = axios.create({
//     baseURL: baseURL,
// })

// export default nextServer;
import axios from 'axios';

// Get window origin if in browser, or Vercel URL / localhost if on server
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Browser environment: use relative path
    return '/api';
  }

  // Server environment (Vercel / Node)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/api`;
  }

  // Local development server environment
  return 'http://localhost:3000/api';
};

const nextServer = axios.create({
  baseURL: getBaseUrl(),
});

export default nextServer;