// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Control',
  tagline: 'A unified environment for web studios, created for and by actual designers and developers.',
  url: 'https://cntrl.site',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  stylesheets: [
    'https://use.typekit.net/mct6ccn.css'
  ],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          breadcrumbs: false,
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      tableOfContents: {
        maxHeadingLevel: 2,
      },
      navbar: {
        logo: {
          alt: 'CNTRL',
          src: 'img/logo-control-eng2.svg',
        },
        items: [
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'develop',
          //   position: 'left',
          //   label: 'Develop'
          // }
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/zHQMWUh68X',
              },
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/control_tool/',
              },
              {
                label: 'Website',
                href: 'https://cntrl.site/'
              }
            ],
          },
          {
            title: 'Code',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/cntrl-site',
              },
              {
                label: 'NextJS template',
                href: 'https://github.com/cntrl-site/nextjs-template',
              }
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Control. All rights reserved.`,
      },
      prism: {
        theme: darkCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
