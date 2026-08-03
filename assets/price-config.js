window.PRICE_CONFIG = {
  basePrice: 110,               // Août 2026
  fallSeason: {
    start: '2026-09-01',
    end: '2026-11-30',
    price: 90                   // Automne 2026 (sept-nov)
  },
  onDemandFrom: '2026-12-01',   // Déc 2026 et toute l'année 2027 : prix sur demande
  specialOffer: {
    dates: ['2026-08-09', '2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13'],
    price: 110,
    label: '9–14.08'
  }
};
