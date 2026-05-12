export type Locale = "en" | "es";

export type TranslationKey =
  | "nav.home"
  | "nav.posts"
  | "nav.users"
  | "nav.comments"
  | "posts.title"
  | "posts.loading"
  | "posts.error"
  | "posts.tryAgain"
  | "users.title"
  | "users.loading"
  | "users.error"
  | "users.tryAgain"
  | "comments.title"
  | "comments.loading"
  | "comments.error"
  | "comments.tryAgain"
  | "home.headline"
  | "home.body"
  | "home.templates"
  | "home.learning"
  | "home.deployNow"
  | "home.documentation"
  | "theme.dark"
  | "theme.light"
  | "lang.en"
  | "lang.es"
  | "dashboard.title"
  | "dashboard.totalPosts"
  | "dashboard.totalUsers"
  | "dashboard.totalComments"
  | "dashboard.recentPosts"
  | "dashboard.topCommenters"
  | "dashboard.comments"
  | "dashboard.loading"
  | "dashboard.error"
  | "dashboard.viewAllPosts";

type Translations = Record<TranslationKey, string>;

export const translations: Record<Locale, Translations> = {
  en: {
    "nav.home": "Home",
    "nav.posts": "Posts",
    "nav.users": "Users",
    "nav.comments": "Comments",
    "posts.title": "Posts",
    "posts.loading": "Loading posts...",
    "posts.error": "Failed to fetch posts",
    "posts.tryAgain": "Try again",
    "users.title": "Users",
    "users.loading": "Loading users...",
    "users.error": "Failed to fetch users",
    "users.tryAgain": "Try again",
    "comments.title": "Comments",
    "comments.loading": "Loading comments...",
    "comments.error": "Failed to fetch comments",
    "comments.tryAgain": "Try again",
    "home.headline": "To get started, edit the page.tsx file.",
    "home.body":
      "Looking for a starting point or more instructions? Head over to",
    "home.templates": "Templates",
    "home.learning": "Learning",
    "home.deployNow": "Deploy Now",
    "home.documentation": "Documentation",
    "theme.dark": "Dark mode",
    "theme.light": "Light mode",
    "lang.en": "EN",
    "lang.es": "ES",
    "dashboard.title": "Dashboard",
    "dashboard.totalPosts": "Total Posts",
    "dashboard.totalUsers": "Total Users",
    "dashboard.totalComments": "Total Comments",
    "dashboard.recentPosts": "Recent Posts",
    "dashboard.topCommenters": "Top Commenters",
    "dashboard.comments": "comments",
    "dashboard.loading": "Loading dashboard...",
    "dashboard.error": "Failed to load dashboard data",
    "dashboard.viewAllPosts": "View all posts",
  },
  es: {
    "nav.home": "Inicio",
    "nav.posts": "Publicaciones",
    "nav.users": "Usuarios",
    "nav.comments": "Comentarios",
    "posts.title": "Publicaciones",
    "posts.loading": "Cargando publicaciones...",
    "posts.error": "Error al cargar las publicaciones",
    "posts.tryAgain": "Intentar de nuevo",
    "users.title": "Usuarios",
    "users.loading": "Cargando usuarios...",
    "users.error": "Error al cargar los usuarios",
    "users.tryAgain": "Intentar de nuevo",
    "comments.title": "Comentarios",
    "comments.loading": "Cargando comentarios...",
    "comments.error": "Error al cargar los comentarios",
    "comments.tryAgain": "Intentar de nuevo",
    "home.headline": "Para comenzar, edita el archivo page.tsx.",
    "home.body": "¿Buscas un punto de partida o más instrucciones? Ve a",
    "home.templates": "Plantillas",
    "home.learning": "Aprendizaje",
    "home.deployNow": "Desplegar ahora",
    "home.documentation": "Documentación",
    "theme.dark": "Modo oscuro",
    "theme.light": "Modo claro",
    "lang.en": "EN",
    "lang.es": "ES",
    "dashboard.title": "Panel",
    "dashboard.totalPosts": "Total de publicaciones",
    "dashboard.totalUsers": "Total de usuarios",
    "dashboard.totalComments": "Total de comentarios",
    "dashboard.recentPosts": "Publicaciones recientes",
    "dashboard.topCommenters": "Principales comentaristas",
    "dashboard.comments": "comentarios",
    "dashboard.loading": "Cargando panel...",
    "dashboard.error": "Error al cargar los datos del panel",
    "dashboard.viewAllPosts": "Ver todas las publicaciones",
  },
};
