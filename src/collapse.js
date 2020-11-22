
export default function collapse (node, params) {

    let { open } = params
    console.log('init', open)
    const noop = () => {}
    let transitionEndResolve = noop
    let transitionEndReject = noop

    const listener = node.addEventListener('transitionend', () => {
        transitionEndResolve()
        transitionEndResolve = noop
        transitionEndReject = noop
    })

    // convenience functions
    async function asyncTransitionEnd () {
        return new Promise((resolve, reject) => {
            transitionEndResolve = resolve
            transitionEndReject = reject
        })
    }

    async function nextFrame () {
        return new Promise(requestAnimationFrame)
    }

    // set initial styles
    node.style.overflow = 'hidden'
    node.style.transition = 'height 1s ease'
    node.style.height = open ? 'auto' : '0px'

    // setup mutation observer
    const config = {
        childList: true,
        subtree: true,
        characterData: true
        // attributes: true
    }

    function callback (mutationsList, observer) {
        console.log('mutation', params)
        if (params.open) {
            node.style.height = node.scrollHeight
        }
    }

    const observer = new MutationObserver(callback)
    observer.observe(node, config)

    async function enter () {

        // height is already in pixels
        // start the transition
        node.style.height = node.scrollHeight + 'px'

        // wait for transition to end,
        // then switch back to height auto
        try {
            await asyncTransitionEnd()
            node.style.height = 'auto'
        } catch(err) {
            // interrupted by a leave transition
        }

    }

    async function leave () {

        if (node.style.height === 'auto') {

            // temporarily turn transitions off
            node.style.transition = 'none'
            await nextFrame()

            // set height to pixels, and turn transition back on
            node.style.height = node.scrollHeight + 'px'
            node.style.transition = 'height 1s ease'
            await nextFrame()

            // start the transition
            node.style.height = '0px'

        }
        else {

            // we are interrupting an enter transition
            transitionEndReject()
            node.style.height = '0px'

        }

    }

    function update (newParams) {
        params = newParams
        params.open ? enter() : leave()
    }

    function destroy () {
        observer.disconnect()
        node.removeEventListener('transitionend', listener)
    }

    return { update, destroy }

}