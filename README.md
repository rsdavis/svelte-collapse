# Svelte Collapse

A Svelte Action that is applied to an element to transition its height between open and closed states.

## Usage

```bash
npm install svelte-collapse
```

```html
<script>
    import collapse from 'svelte-collapse'
    let open = true
</script>

<div use:collapse={{open}}>
    <p>Lorem ipsum</p>
    <p>Lorem ipsum</p>
</div>

<button on:click={() => open = !open}>
    Toggle
</button>
```

Additional parameters that can be used to modify the transition properties, the defaults are shown below.

```html
<div use:collapse={{ open: true, duration: 0.2, easing: 'ease' }}>
```

## Motivation

Transitioning the height of an element using CSS alone is generally not sufficient.
We need to use some Javascript to keep the height variable, so that it responds naturally to added content or a screen resize. 
This action relies on CSS to handle the transitions smoothly, and Javascript to manage the styles.

By wrapping the logic of this approach in an Action, the elements can be easily styled.
Additionally, by maintaining the open state outside of the action, the user has complete control over the open/close mechanism.

The transitions are reversible, so that an open or close transition can be safely interrupted.