<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p align="center">
  <a href="https://rolwinreevan.com">
    <img alt="Gatsby" src="https://github.com/rolwin100/rolwinreevan_gatsby_blog/blob/master/src/images/icon.png" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby's RolwinReevan Portfolio template using <a href='https://ant.design/' target='_blank'>ant-design</a>
</h1>
<h3 align="center">Probably the most beautiful 😍 gatsby starter template</h3>

This starter consists of ant design system you can use it for your personal blog. I have give a lot of time in developing this starter because I found that there were not much starters with a very good design. Please give a star to this project if you have like it to encourage me 😄. Thank you.


## 🚀 Quick start

1.  **Setup the project by.**

    clone the project and install the dependencies

    ```shell
    
    git clone https://github.com/rolwin100/rolwinreevan_gatsby_blog.git
    cd rolwinreevan_gatsby_blog 
    npm install
    ```

1.  **Start developing.**


    ```shell
    gatsby develop
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

## 🚀 Deployment

Deployed at: https://d1kii5o78zdw86.cloudfront.net, using the [deploy-frontend-app] Agent Standard Operation Procedure from the [AWS MCP](https://docs.aws.amazon.com/aws-mcp/latest/userguide/what-is-mcp-server.html).

Deployment command: `./scripts/deploy.sh`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full details.

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── content
    ├── node_modules
    ├── src
    ├── static
    ├── .eslintrc
    ├── .example.env
    ├── .gitignore
    ├── .prettierrc
    ├── config.js
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-config.plugins.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`config.js`**: all the configuration variables that are necessary for the site are added in this file.

6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

7.  **`gatsby-config.plugins.js`**: This file contains the plugin configurations which is used in the gatsby-config.js. For modularity purpose we do this. 

8.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

9.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

10.  **`LICENSE`**: Gatsby is licensed under the MIT license.

11. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

12. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

13. **`README.md`**: A text file containing useful reference information about your project.

14. **`content`**: This is the folder where we write our Markdowns for the blogs.

<!-- AUTO-GENERATED-CONTENT:END -->

## Pipeline

**Pipeline Console**: https://us-east-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/GatsbyBlogPipeline/view

**Deploy**: Push to `deploy-to-aws` branch triggers automatic deployment

```bash
git push origin deploy-to-aws
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full details. Created with the [deploy-codepipeline] Agent Standard Operation Procedure from the [AWS MCP](https://docs.aws.amazon.com/aws-mcp/latest/userguide/what-is-mcp-server.html).
