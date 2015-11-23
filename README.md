# electron-visualizer

### Problems with teslaworksumn/lightshow-visualizer
1.  The code there basically reimplements a nicer graphics engine on top of
    Graphics2D.
2.  The format is non-standardized and the imagery needs to be regenerated at
    each runtime.
3.  The code just kind of sucks.
4.  Turning a JAR into platform executables was annoyingly difficult.

### Solutions from electron-visualizer
1.  We're using CSS opacity on '.channel<CHANNEL>' classes to adjust elements in
    a more centralized manner.
2.  An SVG file will be generated once from a layout and will be packaged into
    the app.
3.  We should have cleaner code with a rewrite and better architecture.
4.  See [maxogden/electron-packager](https://github.com/maxogden/electron-packager).
