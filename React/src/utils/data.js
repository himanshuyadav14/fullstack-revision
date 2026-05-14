export const explorer = {
  name: "root",
  isFolder: true,
  items: [
    {
      name: "public",
      isFolder: true,
      items: [
        {
          name: "index.html",
          isFolder: false,
        },
      ],
    },
    {
      name: "src",
      isFolder: true,
      items: [
        {
          name: "components",
          isFolder: true,
          items: [
            {
              name: "Header.js",
              isFolder: false,
            },
            {
              name: "Footer.js",
              isFolder: false,
            },
            {
              name: "Main.js",
              isFolder: false,
            },
          ],
        },
        {
          name: "index.js",
          isFolder: false,
        },
        {
          name: "App.js",
          isFolder: false,
        },
        {
          name: "index.css",
          isFolder: false,
        },
        {
          name: "logo.svg",
          isFolder: false,
        },
      ],
    },
    {
      name: "package.json",
      isFolder: false,
    },
    {
      name: "package-lock.json",
      isFolder: false,
    },
    {
      name: "README.md",
      isFolder: false,
    },
  ],
};
