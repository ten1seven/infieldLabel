# infieldLabel

infieldLabel is a jQuery plugin that creates a compact, text-over-input, form layout while using semabtic HTML and preserving usability and accessibility.

Check out the demo: http://ten1seven.github.io/infieldLabel/.
Read the full post: http://viget.com/inspire/making-infield-form-labels-suck-less-2.

## How it works

- Using good HTML structure, the label is positioned over the input.
- When the input receives focus, the label is moved to above the input as a tooltip.
- If the input contains text, the label is hidden.
- Hidden labels re-appear above the input any time it receives focus.

## Install with Bower

```console
$ bower install infieldLabel
```

## Usage

- Build input fields like normal using a label.
- Wrap the label and input in a container, like a span, and give it the class of `infield-label`.

```html
<p>
	<span class="infield-label">
		<label for="myLabel">My Label</label>
		<input type="text" name="myLabel" id="myLabel" class="input" size="50">
	</span>
</p>
````

- Include jQuery, jquery.infieldLabel.js and jquery.infieldLabel.css.
- Call infieldLabel.

```html
<link href="jquery.infieldLabel.css" rel="stylesheet">
<script src="jquery.js"></script>
<script src="jquery.sticky.js"></script>
<script>
	$(function() {
		$('.infield-label').infieldLabel();
	});
</script>
```

## Options

- `focusClass`: Class applied to wrapper when input receives focus.
- `hideClass`: Class applied to wrapper when input contains text.
