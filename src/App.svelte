
<script>
    import collapse from './collapse.js'
    let open = true
    let duration = 0.5
    let blocks = [1]
</script>

<button on:click={() => open = !open}>toggle</button>
<button on:click={() => blocks = [...blocks, 1]}>add block</button>

<div use:collapse={{ open, duration }}>
{ #each blocks as _, i }
    <p>
        {i} Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero impedit id veniam error rem quisquam explicabo expedita fugit recusandae quas. Distinctio quia nemo deserunt, culpa perspiciatis nobis omnis ducimus impedit!
    </p>
{ /each }
</div>

<style>

    div {
        border: 1px solid black;
    }

</style>