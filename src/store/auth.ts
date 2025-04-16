import { create } from "zustand";


const SECRET_NAME = "secret"

const getSecret = (): string => {
  const cookies = document.cookie
  if (cookies) {
    return cookies
      .split(';')
      .map(cookie => cookie.trim())
      .map(cookie => {
        const [name, value] = cookie.split('=');
        return { name, value };
      })
      .filter(cookie => cookie.name === `${SECRET_NAME}`)[0].value
  }
  else {
    return ''
  }

}

const setSecret = (secret: string) => {
  document.cookie = `${SECRET_NAME}=${secret}; expires=${import.meta.env.VITE_COOKIE_EXPIRES}; path=/;`
}

const deleteSecret = () => {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    document.cookie = cookies[i] + "=; expires=" + new Date(0).toUTCString() + "; path=/;";
  }
}

interface AuthState {
  secret: string
  update: (secret: string) => void,
  delete: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  secret: getSecret(),
  update: (secret: string) => {
    setSecret(secret)
    set({ secret: secret })
  },
  delete: () => {
    deleteSecret()
    set({ secret: '' })
  }
}));