import sanitizeHtml from "sanitize-html";

export default function sanitizeCode(code) {
  const { html, css, js } = code;

  const sanitizeHtmlCondition = {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img",
      "html",
      "head",
      "body",
    ]),
    allowedAttributes: false,
    enforceHtmlBoundary: true,
  };

  const sanitizedCode = {
    html: sanitizeHtml(html, sanitizeHtmlCondition),
    css: css,
    js: js,
  };

  return sanitizedCode;
}
