'use client';

export const festivalData = {
  name: 'RESONANCIA',
  tagline: 'Donde el sonido se vuelve visible',
  date: '23-25 de Agosto, 2024',
  city: 'Bogotá, Colombia',
  
  lineup: [
    { name: 'The Radiophonic Workshop', country: 'UK', genre: 'Electronic/Experimental' },
    { name: 'Laurie Anderson', country: 'USA', genre: 'Performance/Electronic' },
    { name: 'Alva Noto', country: 'UK', genre: 'Computational Sound' },
    { name: 'Autechre', country: 'UK', genre: 'IDM/Algorithmic' },
    { name: 'Arca', country: 'Venezuela', genre: 'Experimental/Avant-Garde' },
    { name: 'Oneohtrix Point Never', country: 'USA', genre: 'Vaporwave/Experimental' },
    { name: 'Ryoji Ikeda', country: 'Japan', genre: 'Data Sonification' },
    { name: 'Carsten Nicolai', country: 'Germany', genre: 'Sound Installation' },
    { name: 'Charlotte Gainsbourg', country: 'France', genre: 'Electronic/Indie' },
    { name: 'Aphex Twin', country: 'UK', genre: 'Intelligent Drum & Bass' },
    { name: 'Cristian Vogel', country: 'Colombia', genre: 'Minimal/Techno' },
    { name: 'Rechina Pérez', country: 'Colombia', genre: 'Ambient/Field Recording' },
    { name: 'Fennesz', country: 'Austria', genre: 'Glitch/Experimental' },
    { name: 'Juan Pablo Vega', country: 'Colombia', genre: 'Electronic/Ambient' },
  ],

  schedule: [
    {
      day: 'Viernes 23',
      events: [
        { time: '18:00', artist: 'Instalación sonora abierta', stage: 'Ryoji Ikeda' },
        { time: '19:30', artist: 'Rechina Pérez', stage: 'Escenario Principal' },
        { time: '21:00', artist: 'Carsten Nicolai (Performance audiovisual)', stage: 'Escenario Principal' },
        { time: '23:00', artist: 'Aphex Twin', stage: 'Escenario Principal' },
      ],
    },
    {
      day: 'Sábado 24',
      events: [
        { time: '16:00', artist: 'Juan Pablo Vega', stage: 'Escenario A' },
        { time: '17:45', artist: 'Fennesz', stage: 'Escenario A' },
        { time: '19:30', artist: 'Alva Noto', stage: 'Escenario A' },
        { time: '21:30', artist: 'Autechre', stage: 'Escenario A' },
        { time: '23:30', artist: 'The Radiophonic Workshop', stage: 'Escenario A' },
      ],
    },
    {
      day: 'Domingo 25',
      events: [
        { time: '15:00', artist: 'Cristian Vogel', stage: 'Escenario Principal' },
        { time: '16:30', artist: 'Jam Session abierto', stage: 'Ambos escenarios' },
        { time: '18:00', artist: 'Clausura + proyección documental', stage: 'Escenario Principal' },
      ],
    },
  ],

  tickets: [
    { type: '1 Día', price: 150000, includes: 'Acceso a 1 escenario', stock: 'Ilimitado' },
    { type: 'General (3 días)', price: 350000, includes: 'Acceso completo ambos escenarios', stock: 500 },
    { type: 'VIP (3 días)', price: 550000, includes: 'Acceso VIP, merchandise, meet & greet', stock: 100 },
  ],

  venue: {
    name: 'Parque Distrital de la Ciénaga',
    address: 'Carrera 7 #100-50, Bogotá, Colombia',
    phone: '+57 1 8000-RESONANCIA',
    email: 'info@resonancia.fest',
    parking: 'Parqueadero central (2 cuadras)',
    transport: 'TransMilenio líneas A25, K12 (Estación Ciénaga)',
  },
};
