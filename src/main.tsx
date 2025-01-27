  import { StrictMode } from 'react';
  import { createRoot } from 'react-dom/client';
  import {WeatherProvider} from "./weather-context"
  import './index.css';  
  import App from './App';

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <WeatherProvider> 
      <App />
      </WeatherProvider> 
    </StrictMode>,
  );
