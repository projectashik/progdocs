
## Introduction
![ProgDocs](./logo.svg)

**ProgDocs** - Documentation for your programs

**ProgDocs** is a documentation generator for your programs. It is designed to be used with your programs, not as a standalone documentation generator.

It converts your boring markdown files into a beautiful website.

## Setup Documentation

1. Create a file named `progdocs.json` in your project root directory.
2. Add the details of your project in the `progdocs.json` file.
```
{
  "$schema": "https://progdocs.tech/api/schema.json",
  "description": "Convert your boring markdown files into a beautiful website.",
  "indexDoc": "getting-started.md",
  "landingMarkdown": "landing.md",
  "sidebar": [
    {
        file: "getting-started.md",
    },
    {
        title: "Features",
        children: [
            "features/one.md",
        ]
    }
  ],
  "developers": ["projectashik"],
}
```
> The schema for `progdocs.json` can be found [here](https://progdocs.tech/api/schema.json).
> Schema will provide you with the intellisense for the `progdocs.json` file.

3. Create a `docs` folder in your project root directory.
4. Create a markdown file named `landing.md` in the `docs` folder.
> In this file add the content that you want to be seen in the landing page of your website.
5. Create the markdown files for the documentation in the `docs` folder.
6. Link the markdown files in the `sidebar` array in the `progdocs.json` file.

## Generate Documentation
1. Head to [progdocs.tech](https://progdocs.tech) and click on the `Get started` button.
2. Sign in to your account.
3. Click on the `Create new project` button.
4. Enter the details of your project.
5. Click on the `Create` button.
6. Now, you will have the documentation website for your project.
