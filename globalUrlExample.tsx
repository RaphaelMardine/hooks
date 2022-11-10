export const appMode = process.env.MODE

export function apiBaseUrl(): string {
  switch (appMode) {
    case 'production':
      return 'https://generic-api.com.br'
    case 'standalone':
    case 'homolog':
      // return "https://checkout-api.b2breservas.com.br"
      return 'https://generic-api-homolog.com.br'
    case 'development':
    default:
      return `http://${document.location.hostname}:3000`
  }
}

// export const graphQLURL = `${apiBaseUrl()}/graphql`
export const apiUrlHelper = (path: string): string => `${apiBaseUrl()}/${path}`
