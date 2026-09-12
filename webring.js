(() => {
  const SITES = [
    { id: 'mackrichardson', label: 'Mack Richardson', url: 'https://mackrichardson.com' },
    { id: 'hiremack',       label: 'Hire Mack',       url: 'https://hiremack.com'       },
    { id: 'retrocult',      label: 'The RetroCult',   url: 'https://theretrocult.com'   },
    { id: 'rocketcomics',   label: 'Rocket Comics',   url: 'https://rocketcomics.com'   },
  ];

  const CSS = `
    :host { display: block; }

    nav {
      background: #010102;
      border-top: 1px solid rgba(255,255,255,0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0;
      padding: 0 1.25rem;
      min-height: 40px;
    }

    .label {
      font-family: 'Courier New', Courier, monospace;
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 0.25em;
      color: rgba(255,255,255,0.25);
      padding-right: 1.25rem;
      margin-right: 0.25rem;
      border-right: 1px solid rgba(255,255,255,0.1);
      white-space: nowrap;
      user-select: none;
      flex-shrink: 0;
    }

    .sites {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: center;
    }

    a, span.current {
      font-family: 'Courier New', Courier, monospace;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      padding: 0.75rem 1rem;
      white-space: nowrap;
      position: relative;
      display: inline-flex;
      align-items: center;
    }

    a {
      color: rgba(255,255,255,0.38);
      text-decoration: none;
      transition: color 0.15s;
    }

    a:hover { color: rgba(255,255,255,0.85); }

    span.current {
      color: rgba(255,255,255,0.85);
      cursor: default;
    }

    span.current::after {
      content: '';
      position: absolute;
      bottom: 6px;
      left: 0.75rem;
      right: 0.75rem;
      height: 1px;
      background: rgba(255,255,255,0.5);
    }

    .dot {
      color: rgba(255,255,255,0.12);
      font-size: 14px;
      line-height: 1;
      pointer-events: none;
      user-select: none;
    }
  `;

  class MackWebring extends HTMLElement {
    static get observedAttributes() { return ['active']; }

    connectedCallback()            { this._render(); }
    attributeChangedCallback()     { if (this.shadowRoot) this._render(); }

    _render() {
      const active = (this.getAttribute('active') || '').toLowerCase().trim();
      const root   = this.shadowRoot || this.attachShadow({ mode: 'open' });

      const items = SITES.flatMap((site, i) => {
        const isActive = site.id === active;
        const el = isActive
          ? `<span class="current" aria-current="page">${site.label}</span>`
          : `<a href="${site.url}" target="_blank" rel="noopener noreferrer">${site.label}</a>`;
        const dot = i < SITES.length - 1 ? `<span class="dot" aria-hidden="true">·</span>` : '';
        return [el, dot];
      }).join('');

      root.innerHTML = `
        <style>${CSS}</style>
        <nav aria-label="Mack Richardson site network">
          <span class="label">◄ Mack's Web ►</span>
          <div class="sites">${items}</div>
        </nav>
      `;
    }
  }

  if (!customElements.get('mack-webring')) {
    customElements.define('mack-webring', MackWebring);
  }
})();
