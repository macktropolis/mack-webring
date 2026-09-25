(() => {
  const SITES = [
    { id: 'mackrichardson', label: 'Mack Richardson', url: 'https://mackrichardson.com' },
    { id: 'hiremack',       label: 'Hire Mack',       url: 'https://hiremack.com'       },
    { id: 'retrocult',      label: 'The RetroCult',   url: 'https://theretrocult.com'   },
    { id: 'rocketcomics',   label: 'Rocket Comics',   url: 'https://rocketcomics.com'   },
  ];

  const CSS = `
    :host { display: block; }

    a { text-decoration: none; }

    nav {
      background: var(--webring-bg, #e63225);
      border-top: 1px solid var(--webring-border-top, rgba(0,0,0,0.15));
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0;
      padding: 0 1.25rem;
      min-height: 40px;
    }

    .label {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-family: var(--webring-font, 'Courier New', Courier, monospace);
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 0.25em;
      color: var(--webring-label-color, rgba(255,255,255,0.6));
      padding-right: 1.25rem;
      margin-right: 0.25rem;
      border-right: 1px solid var(--webring-label-border, rgba(255,255,255,0.3));
      white-space: nowrap;
      flex-shrink: 0;
    }

    .arrow {
      color: var(--webring-arrow-color, #fff);
      text-decoration: none;
      font-size: 11px;
      letter-spacing: 0;
      padding: 0.2em 0.25em;
      border-radius: 2px;
      transition: color 0.15s, background 0.15s;
      line-height: 1;
    }

    .arrow:hover {
      color: var(--webring-arrow-hover-color, #f5ea2c);
      background: var(--webring-arrow-hover-bg, rgba(0,0,0,0.15));
    }

    .label-text {
      user-select: none;
    }

    .sites {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: center;
    }

    a.site-link, span.current {
      font-family: var(--webring-font, 'Courier New', Courier, monospace);
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      padding: 0.75rem 1rem;
      white-space: nowrap;
      position: relative;
      display: inline-flex;
      align-items: center;
    }

    a.site-link {
      color: var(--webring-link-color, rgba(255,255,255,0.9));
      text-decoration: none;
      transition: color 0.15s;
    }

    a.site-link:hover { color: var(--webring-link-hover, #f5ea2c); }

    span.current {
      color: var(--webring-active-color, #f5ea2c);
      cursor: default;
    }

    span.current::after {
      content: '';
      position: absolute;
      bottom: 6px;
      left: 0.75rem;
      right: 0.75rem;
      height: 1px;
      background: var(--webring-active-underline, rgba(245,234,44,0.6));
    }

    .dot {
      color: var(--webring-dot-color, rgba(255,255,255,0.35));
      font-size: 14px;
      line-height: 1;
      pointer-events: none;
      user-select: none;
    }

    @media (max-width: 640px) {
      nav {
        padding: 0.5rem 1.25rem;
        min-height: 52px;
      }
      .label {
        border-right: none;
        padding-right: 0.75rem;
        margin-right: 0;
      }
    }
  `;

  class MackWebring extends HTMLElement {
    static get observedAttributes() { return ['active']; }

    connectedCallback()        { this._render(); }
    attributeChangedCallback() { if (this.shadowRoot) this._render(); }

    _render() {
      const active       = (this.getAttribute('active') || '').toLowerCase().trim();
      const currentIndex = SITES.findIndex(s => s.id === active);
      const prevSite     = SITES[(currentIndex - 1 + SITES.length) % SITES.length];
      const nextSite     = SITES[(currentIndex + 1) % SITES.length];
      const root         = this.shadowRoot || this.attachShadow({ mode: 'open' });

      const items = SITES.flatMap((site, i) => {
        const isActive = site.id === active;
        const el = isActive
          ? `<span class="current" aria-current="page">${site.label}</span>`
          : `<a class="site-link" href="${site.url}">${site.label}</a>`;
        const dot = i < SITES.length - 1 ? `<span class="dot" aria-hidden="true">·</span>` : '';
        return [el, dot];
      }).join('');

      root.innerHTML = `
        <style>${CSS}</style>
        <nav aria-label="Mack Richardson site network">
          <span class="label">
            <a class="arrow" href="${prevSite.url}" aria-label="Previous site: ${prevSite.label}">◄</a>
            <span class="label-text">Mack's Web</span>
            <a class="arrow" href="${nextSite.url}" aria-label="Next site: ${nextSite.label}">►</a>
          </span>
          <div class="sites">${items}</div>
        </nav>
      `;
    }
  }

  if (!customElements.get('mack-webring')) {
    customElements.define('mack-webring', MackWebring);
  }
})();
