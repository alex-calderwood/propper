class Tracker {
    constructor(params) {
        this.params = {
            maximumAge: 30000,
            timeout: 20000,
            game: null,

            ...params
        }

        if (!this.params.game) {
            throw new Error('Tracker: Game is required', this.params.game);
        }

        this.game = this.params.game;

        this.state = {
            time: null,
            distance: null,
            speed: null,
        }

        setupLocationTracker();
    }

    // https://www.smartjava.org/content/html5-geolocation-api-measure-speed-and-heading-your-car/
    setupLocationTracker() {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                this._handleLocationChange.bind(this),
                this._handleLocationError.bind(this),
                {
                    enableHighAccuracy:true,
                    maximumAge: this.params.maximumAge,
                    timeout: this.params.timeout
                }
            );
        
            //moveSpeed(30);
            //moveCompassNeedle(56);
        }
    }

    // interface Position {
    //     readonly attribute Coordinates coords;
    //     readonly attribute DOMTimeStamp timestamp;
    //   };
    
    // This object has a Coordinate object that contains the information we’re looking for:
    
    
    // interface Coordinates {
    //     readonly attribute double latitude;
    //     readonly attribute double longitude;
    //     readonly attribute double? altitude;
    //     readonly attribute double accuracy;
    //     readonly attribute double? altitudeAccuracy;
    //     readonly attribute double? heading;
    //     readonly attribute double? speed;
    //   };

    _handleLocationChange(position) {
        console.log("Location change: ", position);

        this.state.speed = position.coords.speed;

        let delta = getCurrentTime() - this.state.time;
        this.state.time += delta;
        this.state.distance += this.state.speed * delta;

        // trigger game stuff
        this.game.onLocationChange(this.state);
    }

    _handleLocationError(error) {
        console.error("Location error: ", error);
    }

    getState() {
        return this.state;
    }

}