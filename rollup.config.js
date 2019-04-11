import fs from "fs";
import alias from "rollup-plugin-alias";
import babel from "rollup-plugin-babel";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import es3 from "rollup-plugin-es3";
import cleanup from "rollup-plugin-cleanup";

const babelRc = JSON.parse(fs.readFileSync(".babelrc"));
let pkg = JSON.parse(fs.readFileSync("./package.json"));

let external = Object.keys(pkg.peerDependencies || {}).concat(
  Object.keys(pkg.dependencies || {})
);

let format = process.env.FORMAT === "es" ? "es" : "umd";

export default {
  input: format === "umd" ? "src/default.js" : "src/index.js",
  output: {
    name: pkg.amdName,
    sourcemap: true,
    file: format === "es" ? pkg.module : pkg.main,
    exports: format === "es" ? null : "default",
    format,
    useStrict: false,
    globals: {
      preact: "preact",
      redux: "Redux"
    }
  },
  external,
  plugins: [
    alias({
      "react-redux": "node_modules/react-redux/src/index.js",
      react: __dirname + "/src/compat.js",
      invariant: __dirname + "/src/empty.js",
      "prop-types": __dirname + "/src/prop-types.js"
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
      "typeof Symbol": JSON.stringify("string"),
      "(forwardRef)": "(false)"
    }),
    babel({
      babelrc: false,
      presets: [
        [
          "@babel/preset-env",
          {
            loose: true,
            modules: false
          }
        ]
      ].concat(babelRc.presets.slice(1)),
      plugins: babelRc.plugins
    }),
    nodeResolve({
      jsnext: true,
      main: true,
      preferBuiltins: false
    }),
    commonjs({
      include: ["node_modules/**"],
      exclude: ["node_modules/react-redux/**", "node_modules/prop-types/**"],
      ignoreGlobal: true,
      namedExports: {
        "react-is": ["isValidElementType", "isContextConsumer"]
      }
    }),
    es3(),
    cleanup()
  ].filter(Boolean)
};
