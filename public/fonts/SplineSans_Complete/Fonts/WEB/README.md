# Installing Webfonts
Follow these simple Steps.

## 1.
Put `spline-sans/` Folder into a Folder called `fonts/`.

## 2.
Put `spline-sans.css` into your `css/` Folder.

## 3. (Optional)
You may adapt the `url('path')` in `spline-sans.css` depends on your Website Filesystem.

## 4.
Import `spline-sans.css` at the top of you main Stylesheet.

```
@import url('spline-sans.css');
```

## 5.
You are now ready to use the following Rules in your CSS to specify each Font Style:
```
font-family: SplineSans-Light;
font-family: SplineSans-Regular;
font-family: SplineSans-Medium;
font-family: SplineSans-SemiBold;
font-family: SplineSans-Bold;
font-family: SplineSans-Variable;

```
## 6. (Optional)
Use `font-variation-settings` rule to controll axes of variable fonts:
wght 400.0

Available axes:
'wght' (range from 300.0 to 700.0

