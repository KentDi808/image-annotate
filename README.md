# image-annotate
A simple example of how to load an image, annotate it and then download it.

After cloning the project run

```
npm install
```

To run in dev mode

```
npm run dev
```

You can drag the handles of the annotations around as desired. Click the save button to download the annotated image.

Please note that this will only work 'as-is' if you are downloading files from the server where the application is hosted or if you are downloading images from a server that has cross domain access for image set to `anonymous`.

There are many posts about CORS issues that you may encounter when trying to download files into a canvas and then save them from the page including [this one](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image).
