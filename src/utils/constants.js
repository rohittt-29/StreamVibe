import logo from '../assets/Logo.svg';
import BgImage from '../assets/BgImage.png';

export const LOGO = logo;
export const BG_URL = BgImage;


export const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNWQ5MDk3ZGQ1YTVlY2E2NjY3N2ZkYTEyZTY1ZTQ2OSIsIm5iZiI6MTc0MzkyOTY0Mi4xOTYsInN1YiI6IjY3ZjI0MTJhMGYyMGY5YzQ1Y2FkNDAwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6Q7DwzojiIjUOEuthIjg_Ya2V90qQmYWf3kumM4IUFc"
    },
  };

  export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500"

  // export const BG_URL = "https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2019/11/hipertextual-si-te-vas-netflix-no-olvides-descargar-mi-actividad-mi-lista-2019814675.jpg?w=1500&quality=70&strip=all&ssl=1"

  export const SUPPORTED_LANGUAGES = [{identifier: "en", name: "english"},
     {identifier: "hindi", name: "Hindi"},
      {identifier: "spanish", name: "Spanish"}]

      export const OPENAI_KEY = import.meta.env.VITE_OPENAI_KEY;  //Gemini API key