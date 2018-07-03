const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const autoprefixerOptions = {
    browsers: [
        'last 3 version',
        'ie >= 10'
    ]
};

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const IS_DEVELOPMENT = !IS_PRODUCTION;

// -------
// ENTRY
// -------
const entry = [
    'whatwg-fetch',
    path.resolve('src', 'index.js')
];

// -------
// OUTPUT
// -------
const PUBLIC_FOLDER = 'public';
const OUTPUT_FOLDER = 'build';
const ACI_UI_ASSETS = 'UIAssets';
const ACI_APP_START = 'app.html';

const output = {
    path: path.resolve(OUTPUT_FOLDER, ACI_UI_ASSETS),
    filename: 'index.js'
};

// ----------
// RESOLVE
// ----------

const resolve = {
    extensions: ['.js', '.jsx'],
    symlinks: false // This is required from webpack to exclude linked modules together with node_modules (e.g. eslint won't analyse these modules)
};

// ----------
// RULES
// ----------

// Shared rules
const rules = [
    {
        test: /\.(js|jsx)$/,
        exclude: [
            path.resolve('node_modules')
        ],
        use: ['babel-loader',
            {
                loader: 'eslint-loader',
                options: {
                    failOnWarning: false,
                    failOnError: true,
                    fix: false
                }
            }
        ]
    }
];

if (IS_DEVELOPMENT) {
    // Add support of hot loader dev only
    rules[0].use.unshift('react-hot-loader');
}

let getCSSLoaders = (enableCSSModule) => {
    const loaders = [];
    loaders.push({
        loader: 'style-loader'
    });

    const cssLoaderConfig = {
        loader: 'css-loader',
        options: {
            sourceMap: IS_DEVELOPMENT,
            minimize: IS_PRODUCTION
        }
    };

    if (enableCSSModule) {
        cssLoaderConfig.options.modules = true;
        cssLoaderConfig.options.localIdentName = '[name]__[local]___[hash:base64:5]';
    }

    loaders.push(cssLoaderConfig);
    loaders.push({
            loader: 'postcss-loader',
            options: {
                sourceMap: IS_DEVELOPMENT,
                plugins: () => [
                    autoprefixer(autoprefixerOptions)
                ]
            }
        },
        {
            loader: 'sass-loader',
            options: {sourceMap: IS_DEVELOPMENT}
        }
    );
    return loaders;
};

rules.push({
    test: /\.s?css$/,
    use: getCSSLoaders()
});

// Loader for all external files (e.g. font or image files)
rules.push({
    test: /\.(woff|woff2|eot|ttf|jpg|svg|png)$/,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: 'static/[name]-[hash].[ext]'
            }
        }
    ]
});

// -------
// DEV SERVER
// -------

const devServer = {
    contentBase: path.resolve(OUTPUT_FOLDER, ACI_UI_ASSETS),
    publicPath: '/',
    port: 6001,
    hot: true,
    open: true,
    openPage: ACI_APP_START,
    historyApiFallback: {
        index: '/app.html'
    }
};

// -------
// PLUGINS
// -------

//const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: path.resolve(PUBLIC_FOLDER, 'index.html'),
    filename: ACI_APP_START,
    inject: 'body'
});

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CopyWebpackPluginConfig = new CopyWebpackPlugin([
    {from: path.resolve(PUBLIC_FOLDER, 'icons/icon.png'), to: path.resolve(OUTPUT_FOLDER, ACI_UI_ASSETS)},
    {from: path.resolve(PUBLIC_FOLDER, 'aci_app_template'), to: path.resolve(OUTPUT_FOLDER)}
]);

const plugins = [
    HtmlWebpackPluginConfig,
    CopyWebpackPluginConfig
];

if (IS_PRODUCTION) {
    // Temporary disabled Uglify since is not fully compatible with some ES6 syntax like ('target.new' in 'src/common/lang.js')
    // plugins.push(new webpack.optimize.UglifyJsPlugin());
} else {
    plugins.push(new webpack.HotModuleReplacementPlugin())
}

const devtool = 'source-map';

module.exports = {
    devtool,
    entry,
    output,
    resolve,
    module: {
        rules
    },
    plugins,
    devServer
};
