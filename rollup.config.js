// Rollup plugins
import babel from "rollup-plugin-babel";
import hypothetical from "rollup-plugin-hypothetical";
import resolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
import commonjs from "rollup-plugin-commonjs";
import lessModules from "rollup-plugin-less-modules";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

const plugins = [
  replace({
    "process.env.NODE_ENV": JSON.stringify("development")
  }),
  lessModules({
    output: "dist/styles.css"
  }),
  resolve({
    jsnext: true,
    main: true,
    browser: true
  }),
  hypothetical({
    allowRealFiles: true,
    files: {
      "./node_modules/babel-runtime/node_modules/core-js/library/modules/es6.object.to-string.js":
        "export default null"
    }
  }),
  commonjs({
    include: ["node_modules/**"],
    exclude: ["node_modules/process-es6/**"],
    namedExports: {
      "node_modules/react/react.js": [
        "Children",
        "Component",
        "PropTypes",
        "createElement",
        "isValidElement",
        "cloneElement"
      ],
      "node_modules/react-dom/index.js": ["render"],
      "node_modules/semantic-ui-react/dist/es/index.js": ["semanticUIReact"]
    }
  }),
  babel({
    exclude: "node_modules/**"
  })
];

if (process.env.BUILD !== "production") {
  plugins.push(
    serve({
      contentBase: ".",
      open: true,
      verbose: true
    })
  );

  plugins.push(livereload("dist"));
}

export default {
  entry: "src/main.js",
  dest: "dist/index.js",
  format: "umd",
  sourceMap: "inline",
  plugins
};
