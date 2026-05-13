export type Locale = "en" | "es";

export type TranslationKey =
  | "nav.home"
  | "nav.posts"
  | "nav.users"
  | "nav.comments"
  | "nav.books"
  | "nav.photos"
  | "nav.anime"
  | "nav.menu"
  | "nav.close"
  | "error.tryAgain"
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
  | "dashboard.comment"
  | "dashboard.comments"
  | "dashboard.loading"
  | "dashboard.error"
  | "dashboard.viewAllPosts"
  | "posts.searchPlaceholder"
  | "posts.empty"
  | "users.searchPlaceholder"
  | "users.empty"
  | "comments.searchPlaceholder"
  | "comments.empty"
  | "pagination.showing"
  | "pagination.of"
  | "postDetail.comments"
  | "postDetail.noComments"
  | "postDetail.back"
  | "postDetail.loading"
  | "postDetail.error"
  | "postDetail.notFound"
  | "userDetail.posts"
  | "userDetail.noPosts"
  | "userDetail.back"
  | "userDetail.loading"
  | "userDetail.error"
  | "userDetail.notFound"
  | "books.title"
  | "books.searchPlaceholder"
  | "books.error"
  | "books.empty"
  | "bookDetail.back"
  | "bookDetail.error"
  | "bookDetail.notFound"
  | "bookDetail.by"
  | "bookDetail.firstPublished"
  | "bookDetail.subjects"
  | "bookDetail.editions"
  | "photos.title"
  | "photos.searchPlaceholder"
  | "photos.error"
  | "photos.empty"
  | "photoDetail.back"
  | "photoDetail.error"
  | "photoDetail.notFound"
  | "photoDetail.by"
  | "photoDetail.dimensions"
  | "photoDetail.viewOriginal"
  | "anime.title"
  | "anime.searchPlaceholder"
  | "anime.error"
  | "anime.empty"
  | "animeDetail.back"
  | "animeDetail.error"
  | "animeDetail.notFound"
  | "animeDetail.episodes"
  | "animeDetail.score"
  | "animeDetail.status"
  | "animeDetail.type"
  | "animeDetail.genres"
  | "animeDetail.synopsis";

type Translations = Record<TranslationKey, string>;

export const translations: Record<Locale, Translations> = {
  en: {
    "nav.home": "Home",
    "nav.posts": "Posts",
    "nav.users": "Users",
    "nav.comments": "Comments",
    "nav.books": "Books",
    "nav.photos": "Photos",
    "nav.anime": "Anime",
    "nav.menu": "Open navigation menu",
    "nav.close": "Close navigation menu",
    "error.tryAgain": "Try again",
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
    "dashboard.comment": "comment",
    "dashboard.comments": "comments",
    "dashboard.loading": "Loading dashboard...",
    "dashboard.error": "Failed to load dashboard data",
    "dashboard.viewAllPosts": "View all posts",
    "posts.searchPlaceholder": "Search posts…",
    "posts.empty": "No posts found",
    "users.searchPlaceholder": "Search users…",
    "users.empty": "No users found",
    "comments.searchPlaceholder": "Search comments…",
    "comments.empty": "No comments found",
    "pagination.showing": "Showing",
    "pagination.of": "of",
    "postDetail.comments": "Comments",
    "postDetail.noComments": "No comments yet",
    "postDetail.back": "Back to posts",
    "postDetail.loading": "Loading post...",
    "postDetail.error": "Failed to load post",
    "postDetail.notFound": "Post not found",
    "userDetail.posts": "Posts",
    "userDetail.noPosts": "No posts yet",
    "userDetail.back": "Back to users",
    "userDetail.loading": "Loading user...",
    "userDetail.error": "Failed to load user",
    "userDetail.notFound": "User not found",
    "books.title": "Books",
    "books.searchPlaceholder": "Search books…",
    "books.error": "Failed to fetch books",
    "books.empty": "No books found",
    "bookDetail.back": "Back to books",
    "bookDetail.error": "Failed to load book",
    "bookDetail.notFound": "Book not found",
    "bookDetail.by": "by",
    "bookDetail.firstPublished": "First published",
    "bookDetail.subjects": "Subjects",
    "bookDetail.editions": "editions",
    "photos.title": "Photos",
    "photos.searchPlaceholder": "Search photos…",
    "photos.error": "Failed to fetch photos",
    "photos.empty": "No photos found",
    "photoDetail.back": "Back to photos",
    "photoDetail.error": "Failed to load photo",
    "photoDetail.notFound": "Photo not found",
    "photoDetail.by": "by",
    "photoDetail.dimensions": "Dimensions",
    "photoDetail.viewOriginal": "View original",
    "anime.title": "Anime",
    "anime.searchPlaceholder": "Search anime…",
    "anime.error": "Failed to fetch anime",
    "anime.empty": "No anime found",
    "animeDetail.back": "Back to anime",
    "animeDetail.error": "Failed to load anime",
    "animeDetail.notFound": "Anime not found",
    "animeDetail.episodes": "Episodes",
    "animeDetail.score": "Score",
    "animeDetail.status": "Status",
    "animeDetail.type": "Type",
    "animeDetail.genres": "Genres",
    "animeDetail.synopsis": "Synopsis",
  },
  es: {
    "nav.home": "Inicio",
    "nav.posts": "Publicaciones",
    "nav.users": "Usuarios",
    "nav.comments": "Comentarios",
    "nav.books": "Libros",
    "nav.photos": "Fotos",
    "nav.anime": "Anime",
    "nav.menu": "Abrir menú de navegación",
    "nav.close": "Cerrar menú de navegación",
    "error.tryAgain": "Intentar de nuevo",
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
    "dashboard.comment": "comentario",
    "dashboard.comments": "comentarios",
    "dashboard.loading": "Cargando panel...",
    "dashboard.error": "Error al cargar los datos del panel",
    "dashboard.viewAllPosts": "Ver todas las publicaciones",
    "posts.searchPlaceholder": "Buscar publicaciones…",
    "posts.empty": "No se encontraron publicaciones",
    "users.searchPlaceholder": "Buscar usuarios…",
    "users.empty": "No se encontraron usuarios",
    "comments.searchPlaceholder": "Buscar comentarios…",
    "comments.empty": "No se encontraron comentarios",
    "pagination.showing": "Mostrando",
    "pagination.of": "de",
    "postDetail.comments": "Comentarios",
    "postDetail.noComments": "Sin comentarios aún",
    "postDetail.back": "Volver a publicaciones",
    "postDetail.loading": "Cargando publicación...",
    "postDetail.error": "Error al cargar la publicación",
    "postDetail.notFound": "Publicación no encontrada",
    "userDetail.posts": "Publicaciones",
    "userDetail.noPosts": "Sin publicaciones aún",
    "userDetail.back": "Volver a usuarios",
    "userDetail.loading": "Cargando usuario...",
    "userDetail.error": "Error al cargar el usuario",
    "userDetail.notFound": "Usuario no encontrado",
    "books.title": "Libros",
    "books.searchPlaceholder": "Buscar libros…",
    "books.error": "Error al cargar los libros",
    "books.empty": "No se encontraron libros",
    "bookDetail.back": "Volver a libros",
    "bookDetail.error": "Error al cargar el libro",
    "bookDetail.notFound": "Libro no encontrado",
    "bookDetail.by": "por",
    "bookDetail.firstPublished": "Primera publicación",
    "bookDetail.subjects": "Temas",
    "bookDetail.editions": "ediciones",
    "photos.title": "Fotos",
    "photos.searchPlaceholder": "Buscar fotos…",
    "photos.error": "Error al cargar las fotos",
    "photos.empty": "No se encontraron fotos",
    "photoDetail.back": "Volver a fotos",
    "photoDetail.error": "Error al cargar la foto",
    "photoDetail.notFound": "Foto no encontrada",
    "photoDetail.by": "por",
    "photoDetail.dimensions": "Dimensiones",
    "photoDetail.viewOriginal": "Ver original",
    "anime.title": "Anime",
    "anime.searchPlaceholder": "Buscar anime…",
    "anime.error": "Error al cargar el anime",
    "anime.empty": "No se encontró anime",
    "animeDetail.back": "Volver a anime",
    "animeDetail.error": "Error al cargar el anime",
    "animeDetail.notFound": "Anime no encontrado",
    "animeDetail.episodes": "Episodios",
    "animeDetail.score": "Puntuación",
    "animeDetail.status": "Estado",
    "animeDetail.type": "Tipo",
    "animeDetail.genres": "Géneros",
    "animeDetail.synopsis": "Sinopsis",
  },
};
