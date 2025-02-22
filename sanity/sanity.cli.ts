import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId:"enlu62ww" ,
    dataset:"production", 
  },
  autoUpdates: process.env.NEXT_PUBLIC_SANITY_AUTO_UPDATES === 'true',
});
