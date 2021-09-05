const withAntdLess = require("next-plugin-antd-less");

/** @type {import('next').NextConfig} */
module.exports = withAntdLess({
  modifyVars: {
    "@font-family": "font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace"
  },
  reactStrictMode: true,
});
