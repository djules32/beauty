export default async (request: Request, context: any) => {
  const user = Netlify.env.get("SITE_USER");
  const pass = Netlify.env.get("SITE_PASS");
  const expected = "Basic " + btoa(`${user}:${pass}`);

  if (request.headers.get("authorization") === expected) {
    return context.next();
  }
  return new Response("Accès restreint", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="spawn-beauty"' },
  });
};

export const config = { path: "/*" };
