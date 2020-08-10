module.exports = function (api) {
    api.cache(true);

    const presets = [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: true,
                },
            },
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
    ];

    const plugins = [];

    return {
        presets,
        plugins,
    };
};
