import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration for Qxartia World-Building Wiki
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "🌑 Qxartia",
    pageTitleSuffix: " | Qxartia Wiki",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "YOURUSERNAME.github.io/qxartia",
    ignorePatterns: ["private", "templates", ".obsidian", ".smart-env", "copilot"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Cinzel",
        body: "Crimson Text",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#faf6f1",
          lightgray: "#e5e0d8",
          gray: "#9a9285",
          darkgray: "#4a4540",
          dark: "#2b2621",
          secondary: "#6b4423",
          tertiary: "#8b6914",
          highlight: "rgba(139, 105, 20, 0.15)",
          textHighlight: "#d4a01788",
        },
        darkMode: {
          light: "#1a1816",
          lightgray: "#2a2725",
          gray: "#646058",
          darkgray: "#c4beb5",
          dark: "#f0ebe5",
          secondary: "#c49a6c",
          tertiary: "#d4a017",
          highlight: "rgba(196, 154, 108, 0.15)",
          textHighlight: "#d4a01788",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
