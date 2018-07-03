## Tetration ACI App

```bash
 ├── artwork                 # tool native format/svg files used in the project for icons and images
 ├── public                  # Templates for HtmlWebpackPlugin
 ├── build                   # Build output
 └── src
    ├── assets               # Static files and global sass
    ├── common               # Common code
        ├── api.js           # Basic request/response handling with secure header logic
        └── endpoint.js      # Example of an API that supports both Mock and Http request based responses
    ├── components           # React components folder (with jsx/scss files)
    ├── scss                 # SASS files to manage CSS rules
    ├── pages                # Example views tied to routing rules defined in App.jsx
    ├── state                # Redux actions and reducer example defining a simple showSidebar action
    ├── App.jsx              # App react component
    ├── ...
    ├── index.js             # Entry point for webpack config
    ├── .eslint              # Prvides code linting is a type of static analysis that is frequently used to find problematic patterns or code that doesn’t adhere to certain style guidelines.
    └── .editorconfig        # EditorConfig helps developers define and maintain consistent coding styles between different editors and IDEs.
 ├── ...
 ├── test                    # Unit test configuration files
 ├── .babelrc
 └── webpack.config.js
```

### Tools
#### Babel
Babel configuration can be found in `.babelrc`
Basically the module allows developers to use new js features without waiting for browser support.
The package has the following presets:
* "env" https://github.com/babel/babel-preset-env
* "react" https://babeljs.io/docs/plugins/preset-react/
* "stage-2" https://babeljs.io/docs/plugins/preset-stage-2/

#### Webpack
Webpack configuration can be found in `webpack.config.js`.
This tool is launched from package.json scripts to actually create and export the module to external context.
Webpack can be launched in different environment contexts:

##### Development (launched without defining `NODE_ENV=\"production\"` within `package.json` scripts):
At development time, webpack take the content of `./src/index.js` and pack it with `HtmlWebpackPlugin`.
 Later runs webpack-dev-server to make the content available in the browser.
 Lots of features are available at this time including live reload of react components, hot-loader for css/scss, css modules to hash class names and many others.

##### Production (launched defining `NODE_ENV=\"production\"` within `package.json` scripts):
Webpack build content from `./src/index.js` into `./build/index.js`.

Please see `./webpack.config.js` for more information.

##### Eslint and editorconfig
With editorconfig support (`.editorconfig` file) code formatting rules can be shared across all most popular IDE. Be sure that editorconfig support is enabled in your editor (it should be by default).
Eslint rules are defined in `.eslintrc` config file. By default webpack autofix warnings and trivial formatting issues for you (`fix: true` in `webpack.config.js`) when project is built or started.


### Setup

Install dependencies:

```bash
npm install
```

Start project in dev mode:

```bash
npm start
```

Production build preview:

```bash
npm run preview
```

Build project for development:

```bash
npm run build-dev
```

Build project for production:

```bash
npm run build-prod
```

#### Working with cisco-ui-components npm module
To work with cisco-ui-components clone on you local machine you need to link its module from your ACI app.

1) Move into cisco-ui-components folder (where you cloned it from git) and type:
```bash
npm link
```

2) Then build cisco-ui-components project running:
```bash
npm run build-dev
OR
npm run build-prod
```

3) Move into the root directory of your app and run:
```bash
npm link cisco-ui-components
```

This operation needs to be run just once. When cisco-ui-components folder is updated and built (with step 2) npm will reflect changes globally on your machine. So all modules with link references to it will see the new changes.


