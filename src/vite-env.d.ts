/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMIN_EXPORT_SECRET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
