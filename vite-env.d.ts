/// <reference types="vite/client" />

interface ImportMetaEnv {

    readonly VITE_AWS_REGION: string;
    // Add other environment variables as needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }