const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.(glsl|vs|fs|vert|frag)$/,
            use: ['raw-loader', 'glslify-loader'],
        });

        return config;
    }
}

module.exports = nextConfig
