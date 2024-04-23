const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
    resolver: {
        // Ajoutez ici les alias pour les modules que vous utilisez
        extraNodeModules: {
          'react-redux': require.resolve('react-redux'),
        },
      },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
