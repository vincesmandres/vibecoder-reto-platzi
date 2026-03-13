export const artists = [
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
];

export const agendaEvents = [
  {
    day: 'Viernes 23',
    events: [
      { time: '18:00', artist: 'Instalación sonora abierta', stage: 'Escenario Principal' },
      { time: '19:30', artist: 'Rechina Pérez', stage: 'Escenario Principal' },
      { time: '21:00', artist: 'Carsten Nicolai', stage: 'Performance Audiovisual' },
      { time: '23:00', artist: 'Aphex Twin', stage: 'Escenario Principal' },
    ],
  },
  {
    day: 'Sábado 24',
    events: [
      { time: '16:00', artist: 'Juan Pablo Vega', stage: 'Escenario A' },
      { time: '17:00', artist: 'Arca', stage: 'Escenario B' },
      { time: '17:45', artist: 'Fennesz', stage: 'Escenario A' },
      { time: '18:30', artist: 'Laurie Anderson', stage: 'Escenario B' },
      { time: '19:30', artist: 'Alva Noto', stage: 'Escenario A' },
      { time: '20:30', artist: 'Charlotte Gainsbourg', stage: 'Escenario B' },
      { time: '21:30', artist: 'Autechre', stage: 'Escenario A' },
      { time: '22:30', artist: 'Oneohtrix Point Never', stage: 'Escenario B' },
      { time: '23:30', artist: 'The Radiophonic Workshop', stage: 'Escenario A' },
    ],
  },
  {
    day: 'Domingo 25',
    events: [
      { time: '15:00', artist: 'Cristian Vogel', stage: 'Escenario Principal' },
      { time: '16:30', artist: 'Jam Session Abierto', stage: 'Ambos Escenarios' },
      { time: '18:00', artist: 'Clausura + Proyección de Documentales', stage: 'Escenario Principal' },
    ],
  },
];

export const tickets = [
  {
    type: '1 Día',
    price: '$150.000',
    includes: 'Acceso a 1 escenario',
    stock: 'Ilimitado',
  },
  {
    type: 'General (3 días)',
    price: '$350.000',
    includes: 'Acceso completo ambos escenarios',
    stock: '500',
  },
  {
    type: 'VIP (3 días)',
    price: '$550.000',
    includes: 'Acceso VIP, merchandise, meet & greet',
    stock: '100',
  },
];

export const venue = {
  name: 'Parque Distrital de la Ciénaga',
  address: 'Carrera 7 #100-50, Bogotá, Colombia',
  phone: '+57 1 8000-RESONANCIA',
  email: 'info@resonancia.fest',
  parking: 'Parqueadero central (2 cuadras)',
  transport: 'TransMilenio líneas A25, K12 (Estación Ciénaga)',
  lat: 4.7169,
  lng: -74.0055,
};
