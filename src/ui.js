export default class UI {
    constructor(params) {
        this.params = {
            container: 'game-container',
            onUserAction: (action, data) => {console.log("User action: ", action, data);}, // callback to handle user actions (such as swiping)
            ...params
        }

        // set the container element to watch for swipes
        this.swipeContainer = document.getElementById(this.params.container);
        this.initControls();
    }

    setUserActionCallback(callback) {
        this.params.onUserAction = callback;
    }


    // initialize the four direction swipe controls
    initControls() {
        this.swipeManager = new Swipe({
            container: this.swipeContainer,
            allowClicks: true, // to simulate swipe with clicks
            onSwipe: this._swipeHandler.bind(this),
        });
    }

    _swipeHandler(direction, event) {
        let debug = document.getElementById('debug');
        debug.innerHTML = direction;

        // call the game.onUserAction
        // don't pass in the event for proper abstraction
        let actionData = {};
        this.params.onUserAction(direction, actionData);
    }


}


// Modified from https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android
class Swipe {
    constructor(options) {
        this.xDown = null;
        this.yDown = null;

        this.options = options;

        this.container = options.container;
        if ( ! this.container) {
            throw new Error('Swipe container is required');
        }

        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);

        this.container.addEventListener('touchstart', this.handleTouchStart, false);
        this.container.addEventListener('touchmove', this.handleTouchMove, false);
    }

    onLeft(event) {
        this.options.onSwipe('left', event);
    }

    onRight(event) {
        this.options.onSwipe('right', event);
    }

    onUp(event) {
        this.options.onSwipe('up', event);
    }

    onDown(event) {
        this.options.onSwipe('down', event);
    }

    static getTouches(evt) {
        return evt.touches      // browser API
    }

    handleTouchStart(evt) {
        const firstTouch = Swipe.getTouches(evt)[0];
        this.xDown = firstTouch.clientX;
        this.yDown = firstTouch.clientY;
    }

    handleTouchMove(evt) {
        if ( ! this.xDown || ! this.yDown ) {
            return;
        }

        let xUp = evt.touches[0].clientX;
        let yUp = evt.touches[0].clientY;

        let xDiff = this.xDown - xUp;
        let yDiff = this.yDown - yUp;

        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) { /* most significant */
            if ( xDiff > 0) {
                this.onLeft(event);
            } else {
                this.onRight(event);
            }
        } else {
            if ( yDiff > 0 ) {
                this.onUp(event);
            } else {
                this.onDown(event);
            }
        }

        /* reset values */
        this.xDown = null;
        this.yDown = null;
    }
}