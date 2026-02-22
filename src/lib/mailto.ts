type BuildMailtoArgs = {
  to: string;
  subject: string;
  body: string;
};

export function buildMailto({ to, subject, body }: BuildMailtoArgs) {
  const normalizedBody = body.replace(/\r?\n/g, "\r\n");
  const query = new URLSearchParams({
    subject,
    body: normalizedBody,
  });

  return `mailto:${encodeURIComponent(to)}?${query.toString()}`;
}