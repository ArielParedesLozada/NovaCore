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
