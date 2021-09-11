function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  webpack5: true,
  webpack: (config, options) => {
    config.resolve.fallback = { fs: false, path: false, os: false, crypto: false, module: false };
    console.log(config);
    // console.log(options);
    // config.module.rules[1].use.options.preset = ['next/babel'];
    // config.module.rules[1].use.options.plugins = ['relay'];
    // await sleep(100000000);
    // config.module.rules = [
    //   {
    //     test: /\.tsx?$/,
    //     exclude: /node_modules/,
    //     use: {
    //       loader: 'babel-loader',
    //       options: {
    //         plugins: ['relay'],
    //       },
    //     },
    //   },
    //   ...config.module.rules,
    // ];
    // const loaderOptions = { ...options.defaultLoaders.babel.options };
    // // console.log('loaderOptions', loaderOptions);
    // console.log(loaderOptions.plugins);
    // loaderOptions.plugins = ['relay'];
    // config.module.rules.push({
    //   test: /\.tsx?$/,
    //   use: [
    //     options.defaultLoaders.babel,
    //     {
    //       loader: 'babel-loader',
    //       options: loaderOptions,
    //     },
    //   ],
    // });
    // throw 'e';
    return config;
  },
};
