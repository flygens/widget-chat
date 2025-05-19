# Flygens AI Widget

Flygens AI Widget is an embeddable AI assistant widget for any website.\
You can easily load it from a CDN with a single `<script>` or use it as a library for modern frameworks (React, SolidJS, Vue, etc).

## 🚀 Features

- Embeddable via URL (CDN) without the need for compilation or bundler
- Easy integration with any framework or web app
- Written in SolidJS for performance and reactivity
- Lightweight and fast loading

---

## Installation

Install the dependencies:

```bash
pnpm add @flygens/widget-chat
```

## Usage

### Import as a module

```ts
import { initFlygensWidget, showFlygensWidget } from "@flygens/widget-chat";

initFlygensWidget("api-key");
showFlygensWidget();
```

### Use via CDN

Simply add the following code to your HTML:

```html
<script src="https://unpkg.com/@flygens/widget-chat@0.0.6/widget.js"></script>
<script>
    FlygensWidget.initFlygensWidget("api-key");
    FlygensWidget.showFlygensWidget();
</script>
```

## License

See the [LICENSE](LICENSE) file.