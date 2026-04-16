import mix from "laravel-mix";
import postcssCustomProperties from "postcss-custom-properties";
import atImport from "postcss-import";
import tailwindcss from "@tailwindcss/postcss";

mix.js("resources/js/app.js", "dist")
    .vue()
    .postCss("resources/css/app.css", "dist", [
        postcssCustomProperties,
        atImport,
        tailwindcss,
    ])
    .copyDirectory("public", "dist"); // Копируем в dist
