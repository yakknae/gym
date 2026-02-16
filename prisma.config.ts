// prisma.config.ts
import { defineConfig } from '@prisma/config';

export default defineConfig({
  datasource: {
    url: 'mysql://root:1234@localhost:3306/atenas',
  },
});