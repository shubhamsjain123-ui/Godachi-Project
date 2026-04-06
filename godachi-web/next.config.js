module.exports = {
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|otf|eot|ttf|woff|woff2)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000,
        },
      },
    });

    return config;
  },
  images: {
    domains: ['localhost'],
  },
  // images: {
  //   domains: ['backend.godachi.com'],
  //   disableStaticImages: true
  // }
};
