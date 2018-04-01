# Client Folder Structure

The main folders you need to knwo are the `common` and the `routes` folder located unter `./src/`. The routes folder aims to map the real url structure form the browser into file structure. So that it is easy to find the correct entry point during development. All other components/services/modules are stored in the common folder.

Another characteristic is that most components under common are dumb. Usually they arent aware of the context they'll be used. Unlike smart components - they are context aware. This means they know e.g. that they will be included via routing, have access to various services and so on. 

In order to to achieve fast build times you are required to slice small modules. Therefore you should create a module per feature under common.
