const { defineConfig } = require("@vue/cli-service");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;
module.exports = defineConfig({
  publicPath: "auto",
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "downed",
        filename: "remoteEntry.js",
        remotes: {
          running: "running@http://localhost:8090/remoteEntry.js",
        },
        exposes: {
          "./About": "./src/views/AboutView",
        },
        shared: {
          ...deps,
          vue: {
            eager: true,
            singleton: true,
            requiredVersion: deps.vue,
            strictVersion: true,
          },
        },
      }),
    ],
  },
  devServer: {
    port: 8091,
    historyApiFallback: true,
  },
  transpileDependencies: true,
});
