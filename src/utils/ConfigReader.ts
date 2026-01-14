function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env variable: ${name}`);
  }
  return value;
}

export const env = {
  baseUiUrl: requireEnv('BASE_UI_URL'),
  username: requireEnv('USERNAME'),
  password: requireEnv('PASSWORD'),
  baseApiUrl: requireEnv('BASE_API_URL'),
};
