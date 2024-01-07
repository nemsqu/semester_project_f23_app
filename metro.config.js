module.exports = {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
          nonInlineRequires: [
            "@react-native-async-storage/async-storage",
+          'React',
+          'react',
+          'react-native',
          ],
        },
      }),
    },
  };