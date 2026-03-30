import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
```

Kaydetmek için: **Ctrl+O** → Enter → **Ctrl+X**

Sonra GitHub'a push edin:
```
git add .
git commit -m "fix: remove terser"
git push

