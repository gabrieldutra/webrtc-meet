const withAntdLess = require("next-plugin-antd-less");

/** @type {import('next').NextConfig} */
module.exports = withAntdLess({
  modifyVars: {
    "@font-family": '"Nunito", sans-serif',
  },
  reactStrictMode: true,
});
