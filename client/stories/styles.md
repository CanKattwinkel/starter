# Styles


## Folder Structure 
Component styles should remain with the component in the corresponding folder. The `./src/styling` folder is used for holding all global styles. Since they get in included anyway - try to keep them small. Also it is very useful to organize them by library. E.g. all styles that extend a data table library should be in the folder `./src/styling/some-data-table/`. This makes it easier to drop dependencies and the corresponding styles.

Always create a `_index.scss` file in every folder that contains all imports. Not independent SCSS resources are also prefixed with an underscore (if the file will be included in other scss files, prefix with '_').

## Style Libraries
This project utilizes Material 2 and Bootstrap as style libraries. While Material 2 is primarily used to build the reactive user interface, Bootstrap is used for the page layout (grid etc). Therefore Bootstrap is not imported completly. Instead, we import only the used parts.
Also the very mature utility classes of Bootstrap are used - e.g. `.my-3`. But you shoudn't Bootstraps content elements like buttons, cards and so on. Instead use Material 2 for components.

