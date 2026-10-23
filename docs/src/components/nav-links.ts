// Top-level links shared by the home page's glass nav and the docs header
export const navLinks = [
  { text: "Guide", href: "/guide/" },
  { text: "Components", href: "/components/google-signin-button/" },
  { text: "Composables", href: "/composables/use-one-tap/" },
  { text: "FAQ", href: "/guide/faq/" },
  { text: "Changelog", href: "/changelog/" },
];

export const wavezync = { text: "WaveZync", href: "https://wavezync.com" };

/** The link for the section `path` is in: the longest matching section prefix */
export const currentLink = (path: string) =>
  navLinks
    .map((link) => ({
      link,
      section:
        link.href === "/guide/faq/"
          ? link.href
          : `/${link.href.split("/")[1]}/`,
    }))
    .filter(({ section }) => path.startsWith(section))
    .sort((a, b) => b.section.length - a.section.length)[0]?.link;
