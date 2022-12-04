import { DocsThemeConfig } from 'nextra-theme-docs';
import { useRouter } from 'next/router';

const config: DocsThemeConfig = {
  logo: <strong>Column Resizer Documentation</strong>,
  docsRepositoryBase: 'https://github.com/Runjuu/column-resizer/tree/main/packages/docs/pages',
  project: {
    link: 'https://github.com/Runjuu/column-resizer',
  },
  useNextSeoProps() {
    const { route } = useRouter();

    return {
      titleTemplate: route !== '/' ? '%s – Column Resizer' : '%s',
    };
  },
  footer: {
    text() {
      return (
        <div>
          <p>MIT © 2022 Runjuu</p>
        </div>
      );
    },
  },
};

export default config;
