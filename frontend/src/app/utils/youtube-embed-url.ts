export function normalizeVideoEmbedUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return trimmed;

  let m = trimmed.match(
    /^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/i
  );
  if (m) {
    const proto = m[1] || 'https';
    return `${proto}://www.youtube.com/embed/${m[2]}?showinfo=0`;
  }

  // YouTube watch
  m = trimmed.match(
    /^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*[?&]v=([a-zA-Z0-9_-]+)/i
  );
  if (m) {
    const proto = m[1] || 'https';
    return `${proto}://www.youtube.com/embed/${m[2]}?showinfo=0`;
  }

  // youtu.be
  m = trimmed.match(/^(?:(https?):\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/i);
  if (m) {
    const proto = m[1] || 'https';
    return `${proto}://www.youtube.com/embed/${m[2]}?showinfo=0`;
  }

  // Vimeo (misma lógica que Quill base.js)
  m = trimmed.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/i);
  if (m) {
    const proto = m[1] || 'https';
    return `${proto}://player.vimeo.com/video/${m[2]}/`;
  }

  return trimmed;
}

export function fixYoutubeShortsIframesInHtml(html: string): string {
  if (!html?.length) return html;
  return html.replace(
    /src=(["'])((?:https?:)?\/\/(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]+)[^'"]*)\1/gi,
    (_match, quote, _fullSrc, videoId) =>
      `src=${quote}https://www.youtube.com/embed/${videoId}?showinfo=0${quote}`
  );
}

export function hrefToVideoEmbedSrc(href: string): string | null {
  const raw = href.trim();
  if (!raw) return null;
  const u = raw.startsWith('//') ? `https:${raw}` : raw;

  const embedMatch = u.match(/^https?:\/\/(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+)/i);
  if (embedMatch) {
    return `https://www.youtube.com/embed/${embedMatch[1]}?showinfo=0`;
  }

  const normalized = normalizeVideoEmbedUrl(u);
  if (/^https?:\/\/(?:www\.)?youtube\.com\/embed\//i.test(normalized)) {
    return normalized;
  }
  if (/^https?:\/\/player\.vimeo\.com\/video\//i.test(normalized)) {
    return normalized;
  }
  return null;
}

const YOUTUBE_VIMEO_URL_IN_P_RE =
  /^https?:\/\/(?:www\.)?(?:youtube\.com\/(?:embed\/|watch\?|shorts\/)|youtu\.be\/|vimeo\.com\/\d+)/i;

export function upgradeVideoLinksToEmbedsInHtml(html: string): string {
  if (!html?.length) return html;

  if (typeof DOMParser === 'undefined') {
    return html;
  }

  try {
    const doc = new DOMParser().parseFromString(`<div id="nova-core-html-root">${html}</div>`, 'text/html');
    const root = doc.getElementById('nova-core-html-root');
    if (!root) return html;

    root.querySelectorAll('a[href]').forEach((a) => {
      const href = a.getAttribute('href');
      if (!href) return;
      const embedSrc = hrefToVideoEmbedSrc(href);
      if (!embedSrc) return;
      const wrap = doc.createElement('div');
      wrap.className = 'blog-detail-video-embed';
      const iframe = doc.createElement('iframe');
      iframe.className = 'blog-detail-video-iframe';
      iframe.setAttribute('src', embedSrc);
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allowfullscreen', 'true');
      iframe.setAttribute(
        'allow',
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      );
      iframe.setAttribute('loading', 'lazy');
      iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      iframe.setAttribute('title', 'Video incrustado');
      wrap.appendChild(iframe);
      a.replaceWith(wrap);
    });

    root.querySelectorAll('p').forEach((p) => {
      if (p.children.length > 0) return;
      const text = (p.textContent || '').trim();
      if (!text || !YOUTUBE_VIMEO_URL_IN_P_RE.test(text)) return;
      const embedSrc = hrefToVideoEmbedSrc(text);
      if (!embedSrc) return;
      const wrap = doc.createElement('div');
      wrap.className = 'blog-detail-video-embed';
      const iframe = doc.createElement('iframe');
      iframe.className = 'blog-detail-video-iframe';
      iframe.setAttribute('src', embedSrc);
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allowfullscreen', 'true');
      iframe.setAttribute(
        'allow',
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      );
      iframe.setAttribute('loading', 'lazy');
      iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      iframe.setAttribute('title', 'Video incrustado');
      wrap.appendChild(iframe);
      p.replaceWith(wrap);
    });

    return root.innerHTML;
  } catch {
    return html;
  }
}
