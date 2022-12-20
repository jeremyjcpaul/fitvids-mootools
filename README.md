# fitvids-mootools
A reworking of the popular jQuery fitvids plugin (https://github.com/davatron5000/FitVids.js) for MooTools.

```diff
- No longer maintained by the author, since Nov 2015
```

## Usage

```html
<script src="path/to/mootools.js"></script>
<script src="path/to/fitvids-mootools.js"></script>
<script>
  var initFitVids = function() {
    new Fitvids({
      customSelector: '.make-vid-responsive',
	    ignore: '.ignore-this-class'
    });
  }
  
  document.addEvent('domready', initFitVids);
</script>
```
