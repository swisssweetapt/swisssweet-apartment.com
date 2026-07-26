/* ===================================================================
   Swiss Sweet Apartment — Configuration centralisée des prix
   Pour changer le prix affiché sur le site, modifie UNIQUEMENT ce
   fichier (basePrice et/ou specialOffer). Les 6 pages (EN/FR/DE/IT/SQ/PL)
   le lisent automatiquement, plus besoin de toucher aux index.html.
   =================================================================== */
window.SITE_PRICE_CONFIG = {
  basePrice: 110,
  specialOffer: {
    active: true,
    price: 100,
    endDate: '2026-07-30', // la bannière disparaît automatiquement après cette date (23:59)
    label: {
      en: '28–30 July',
      fr: '28–30 juillet',
      de: '28.–30. Juli',
      it: '28–30 luglio',
      sq: '28–30 korrik',
      pl: '28–30 lipca'
    }
  }
};

(function () {
  var TXT = {
    en: { base: 'From', night: '/ night', special: 'Special offer', cta: 'Book now' },
    fr: { base: 'Dès', night: '/ nuit', special: 'Offre spéciale', cta: 'Réserver' },
    de: { base: 'Ab', night: '/ Nacht', special: 'Sonderangebot', cta: 'Jetzt buchen' },
    it: { base: 'Da', night: '/ notte', special: 'Offerta speciale', cta: 'Prenota ora' },
    sq: { base: 'Nga', night: '/ natë', special: 'Ofertë speciale', cta: 'Rezervo tani' },
    pl: { base: 'Od', night: '/ noc', special: 'Oferta specjalna', cta: 'Zarezerwuj teraz' }
  };

  function init() {
    var cfg = window.SITE_PRICE_CONFIG;
    var lang = (document.documentElement.getAttribute('lang') || 'en').slice(0, 2);
    var t = TXT[lang] || TXT.en;

    var now = new Date();
    var offerEnd = cfg.specialOffer.endDate ? new Date(cfg.specialOffer.endDate + 'T23:59:59') : null;
    var showSpecial = cfg.specialOffer.active && offerEnd && now <= offerEnd;

    // --- Bannière en haut de page (met à jour la bannière statique si elle existe déjà dans le HTML, sinon en crée une) ---
    var banner = document.getElementById('price-promo-banner');
    var bannerExisted = !!banner;
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'price-promo-banner';
    }
    banner.style.cssText = 'background:#1f6f63;color:#fff;text-align:center;padding:0.65rem 1rem;font-size:0.88rem;line-height:1.4;position:relative;z-index:1000;font-family:inherit;';
    var label = cfg.specialOffer.label[lang] || cfg.specialOffer.label.en;

    if (showSpecial) {
      banner.innerHTML = '<strong>' + t.special + ' ' + label + ':</strong> ' +
        cfg.specialOffer.price + ' EUR ' + t.night + ' &nbsp;\u00b7&nbsp; ' +
        '<a href="#booking" style="color:#fff;text-decoration:underline;">' + t.cta + '</a>' +
        ' &nbsp;\u00b7&nbsp; ' + t.base + ' ' + cfg.basePrice + ' EUR ' + t.night;
    } else {
      banner.innerHTML = t.base + ' <strong>' + cfg.basePrice + ' EUR</strong> ' + t.night +
        ' &nbsp;\u00b7&nbsp; <a href="#booking" style="color:#fff;text-decoration:underline;">' + t.cta + '</a>';
    }

    if (!bannerExisted) {
      if (document.body.firstChild) {
        document.body.insertBefore(banner, document.body.firstChild);
      } else {
        document.body.appendChild(banner);
      }
    }

    // --- Mise à jour du prix affiché dans le calculateur (#cal-amount) ---
    var amtEl = document.getElementById('cal-amount');
    if (amtEl) {
      amtEl.innerHTML = cfg.basePrice + ' EUR <span style="font-size:1rem;opacity:0.7">' + t.night + '</span>';
    }

    // --- Mise à jour du badge de prix dans le hero (FR/DE/IT/SQ/PL) ---
    document.querySelectorAll('.hero-price-badge strong').forEach(function (el) {
      el.textContent = cfg.basePrice + ' EUR';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
