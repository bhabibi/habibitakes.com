// habibi-analytics v2.0
// Pure admin backend — invisible to all visitors
// Sends data to Discord via Cloudflare Worker proxy
// Zero user-facing output, zero performance impact
// Proxy: https://noisy-breeze-fcbd.bball9001.workers.dev

(function () {
  const PROXY = 'https://noisy-breeze-fcbd.bball9001.workers.dev';

  // ── HELPERS ─────────────────────────────────────
  function getDevice() {
    const w = window.innerWidth;
    if (w < 768)  return '📱 Mobile';
    if (w < 1024) return '💻 Tablet';
    return '🖥️ Desktop';
  }

  function getReferrer() {
    const r = document.referrer;
    if (!r) return 'Direct / Bookmark';
    try {
      const h = new URL(r).hostname;
      if (h.includes('google'))                        return '🔍 Google';
      if (h.includes('instagram'))                     return '📸 Instagram';
      if (h.includes('discord'))                       return '💬 Discord';
      if (h.includes('linkedin'))                      return '💼 LinkedIn';
      if (h.includes('twitter') || h.includes('x.com')) return '🐦 X / Twitter';
      return '🔗 ' + h;
    } catch (e) { return '🔗 Unknown'; }
  }

  function getTimeOfDay() {
    const h = new Date().getHours();
    if (h < 6)  return '🌙 Late Night';
    if (h < 12) return '🌅 Morning';
    if (h < 17) return '☀️ Afternoon';
    if (h < 21) return '🌆 Evening';
    return '🌙 Night';
  }

  function formatTime() {
    return new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
      month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }) + ' PT';
  }

  function formatDuration(ms) {
    const s = Math.floor(ms / 1000);
    if (s < 60)   return s + 's';
    if (s < 3600) return Math.floor(s / 60) + 'm ' + (s % 60) + 's';
    return Math.floor(s / 3600) + 'h ' + Math.floor((s % 3600) / 60) + 'm';
  }

  // ── SESSION ──────────────────────────────────────
  const SESSION_KEY = 'hb_session';
  let session;
  try {
    const s = sessionStorage.getItem(SESSION_KEY);
    session = s ? JSON.parse(s) : null;
  } catch (e) { session = null; }

  if (!session) {
    session = {
      id: Math.random().toString(36).slice(2, 8).toUpperCase(),
      start: Date.now(),
      device: getDevice(),
      referrer: getReferrer(),
      visitSent: false,
      scrollMilestones: []
    };
  }

  function saveSession() {
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(session)); }
    catch (e) {}
  }

  // ── DAILY COUNTERS ───────────────────────────────
  const TODAY = new Date().toDateString();
  const DAILY_KEY = 'hb_daily_' + TODAY;

  function getDaily() {
    try {
      const d = localStorage.getItem(DAILY_KEY);
      return d ? JSON.parse(d) : {
        bryanVisits: 0, htVisits: 0,
        bryanForms: 0,  htForms: 0,
        clicks: {}, easterEggs: 0
      };
    } catch (e) {
      return { bryanVisits: 0, htVisits: 0,
               bryanForms: 0,  htForms: 0,
               clicks: {}, easterEggs: 0 };
    }
  }

  function saveDaily(d) {
    try { localStorage.setItem(DAILY_KEY, JSON.stringify(d)); }
    catch (e) {}
  }

  // ── DISCORD SENDER ───────────────────────────────
  async function send(channel, payload, keepalive) {
    try {
      await fetch(PROXY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: !!keepalive,
        body: JSON.stringify({ channel, payload })
      });
    } catch (e) { /* fail silently always */ }
  }

  // ── SITE CONFIG ──────────────────────────────────
  const SITE_ID    = window.SITE_ID    || 'bryan';
  const SITE_NAME  = window.SITE_NAME  || 'Bryan Habibi';
  const SITE_EMOJI = window.SITE_EMOJI || '👔';
  const SITE_COLOR = window.SITE_COLOR || 0xb07d4e;
  const CHAN       = SITE_ID === 'ht' ? 'ht' : 'bryan';

  // ── 1. PAGE VISIT ────────────────────────────────
  function sendVisit() {
    if (session.visitSent) return;
    session.visitSent = true;
    saveSession();

    const daily = getDaily();
    if (SITE_ID === 'ht') daily.htVisits++;
    else daily.bryanVisits++;
    const todayCount = SITE_ID === 'ht'
      ? daily.htVisits : daily.bryanVisits;
    saveDaily(daily);

    send(CHAN, {
      embeds: [{
        color: SITE_COLOR,
        author: { name: SITE_EMOJI + ' ' + SITE_NAME + ' — New Visitor' },
        fields: [
          { name: '🕐 Time',     value: formatTime(),                  inline: true },
          { name: '📱 Device',   value: session.device,                inline: true },
          { name: '🌅 Period',   value: getTimeOfDay(),                inline: true },
          { name: '🔗 Referrer', value: session.referrer,              inline: true },
          { name: '🆔 Session',  value: session.id,                    inline: true },
          { name: '📊 Today',    value: todayCount + ' visits so far', inline: true }
        ],
        footer: { text: 'habibi-analytics · ' + SITE_NAME }
      }]
    });
  }

  // ── 2. SESSION END ───────────────────────────────
  function sendSessionEnd() {
    const duration = formatDuration(Date.now() - session.start);
    send(CHAN, {
      embeds: [{
        color: 0x95a5a6,
        author: { name: '👋 Session Ended — ' + SITE_NAME },
        fields: [
          { name: '⏱️ Duration', value: duration,      inline: true },
          { name: '🆔 Session',  value: session.id,    inline: true },
          { name: '🕐 Time',     value: formatTime(),  inline: true }
        ],
        footer: { text: 'habibi-analytics · ' + SITE_NAME }
      }]
    }, true);
  }

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') sendSessionEnd();
  });
  window.addEventListener('beforeunload', sendSessionEnd);

  // ── 3. CONTACT FORM ──────────────────────────────
  function watchContactForm() {
    const form      = document.querySelector('form[id^="contact-form"]');
    const successEl = document.querySelector('[data-fs-success]');
    if (!form || !successEl) return;

    const obs = new MutationObserver(function () {
      const st = window.getComputedStyle(successEl);
      if (st.display === 'none' || st.visibility === 'hidden') return;
      obs.disconnect();

      const name    = (form.querySelector('[name="name"]')    || {}).value || 'Unknown';
      const email   = (form.querySelector('[name="email"]')   || {}).value || 'Unknown';
      const message = (form.querySelector('[name="message"]') || {}).value || '';

      const daily = getDaily();
      if (SITE_ID === 'ht') daily.htForms++;
      else daily.bryanForms++;
      saveDaily(daily);

      send('contact', {
        embeds: [{
          color: 0x57F287,
          author: { name: '📬 New Message — ' + SITE_NAME },
          fields: [
            { name: '👤 Name',    value: name,      inline: true },
            { name: '📧 Email',   value: email,     inline: true },
            { name: '🌐 Site',    value: SITE_NAME, inline: true },
            { name: '💬 Message', value: message.slice(0, 200) +
              (message.length > 200 ? '…' : '') },
            { name: '🕐 Time',    value: formatTime(), inline: true },
            { name: '🆔 Session', value: session.id,   inline: true }
          ],
          footer: { text: 'Reply to: ' + email }
        }]
      });
    });

    obs.observe(successEl, {
      attributes: true, childList: true,
      subtree: true, attributeFilter: ['style', 'class']
    });
  }

  // ── 4. CLICK TRACKING ────────────────────────────
  const debounced = {};
  function trackClick(label) {
    if (debounced[label]) return;
    debounced[label] = true;
    setTimeout(function () { delete debounced[label]; }, 1500);

    const daily = getDaily();
    daily.clicks[label] = (daily.clicks[label] || 0) + 1;
    saveDaily(daily);

    send(CHAN, {
      embeds: [{
        color: 0xFEE75C,
        author: { name: '👆 Interaction — ' + SITE_NAME },
        fields: [
          { name: '🎯 Action',  value: label,        inline: true },
          { name: '🕐 Time',    value: formatTime(), inline: true },
          { name: '🆔 Session', value: session.id,   inline: true }
        ],
        footer: { text: 'habibi-analytics · ' + SITE_NAME }
      }]
    });
  }

  function initClickTracking() {
    document.querySelectorAll('[data-track]').forEach(function (el) {
      el.addEventListener('click', function () {
        trackClick(el.getAttribute('data-track'));
      }, { passive: true });
    });
  }

  // ── 5. EASTER EGG TRACKER ────────────────────────
  window.trackEasterEgg = function (eggName) {
    const daily = getDaily();
    daily.easterEggs++;
    saveDaily(daily);

    send(CHAN, {
      embeds: [{
        color: 0xEB459E,
        author: { name: '🥚 Easter Egg Found! — ' + SITE_NAME },
        fields: [
          { name: '🎮 Egg',     value: eggName,      inline: true },
          { name: '🕐 Time',    value: formatTime(),  inline: true },
          { name: '🆔 Session', value: session.id,    inline: true }
        ],
        footer: { text: 'Someone is paying attention 👀' }
      }]
    });
  };

  // ── 6. SCROLL DEPTH ──────────────────────────────
  function initScrollDepth() {
    const milestones = [25, 50, 75, 100];
    if (!session.scrollMilestones) session.scrollMilestones = [];
    let throttle = false;

    window.addEventListener('scroll', function () {
      if (throttle) return;
      throttle = true;
      setTimeout(function () { throttle = false; }, 500);

      const scrolled = window.scrollY + window.innerHeight;
      const total    = document.documentElement.scrollHeight;
      const pct      = Math.round((scrolled / total) * 100);

      milestones.forEach(function (m) {
        if (pct >= m && !session.scrollMilestones.includes(m)) {
          session.scrollMilestones.push(m);
          saveSession();

          send(CHAN, {
            embeds: [{
              color: 0x3498db,
              author: { name: '📜 Scroll Depth — ' + SITE_NAME },
              fields: [
                { name: '📏 Reached', value: m + '%',      inline: true },
                { name: '🆔 Session', value: session.id,   inline: true },
                { name: '🕐 Time',    value: formatTime(), inline: true }
              ],
              footer: { text: 'habibi-analytics · ' + SITE_NAME }
            }]
          });
        }
      });
    }, { passive: true });
  }

  // ── 7. DAILY DIGEST ──────────────────────────────
  function scheduleDailyDigest() {
    const now      = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const msLeft   = midnight - now;

    setTimeout(function () {
      const daily    = getDaily();
      const clicks   = daily.clicks || {};
      const entries  = Object.entries(clicks).sort(function (a, b) { return b[1] - a[1]; });
      const topClick = entries[0];

      send('digest', {
        embeds: [{
          color: 0x5865F2,
          author: { name: '📊 Daily Summary — ' + TODAY },
          fields: [
            { name: '👔 Bryan Habibi',
              value:  daily.bryanVisits + ' visits · ' + daily.bryanForms + ' messages',
              inline: true },
            { name: '🎬 HabibiTakes',
              value:  daily.htVisits + ' visits · ' + daily.htForms + ' messages',
              inline: true },
            { name: '👆 Top Click',
              value:  topClick
                ? topClick[0] + ' (' + topClick[1] + 'x)'
                : 'None recorded' },
            { name: '🥚 Easter Eggs', value: String(daily.easterEggs), inline: true },
            { name: '📅 Date',        value: TODAY,                    inline: true }
          ],
          footer: { text: 'habibi-analytics · End of Day Report' }
        }]
      }, true);
    }, msLeft);
  }

  // ── INIT ─────────────────────────────────────────
  window.addEventListener('DOMContentLoaded', function () {
    sendVisit();
    watchContactForm();
    initClickTracking();
    initScrollDepth();
    scheduleDailyDigest();
  });

  window.trackAnalyticsClick = trackClick;

})();
