export default class Game {
    constructor(params) {
        this.params = {
            ui: null,
            ...params
        }

        if (!this.params.ui) {
            throw new Error('Game: UI is required', this.params.ui);
        }

        this.ui = this.params.ui;

        this.ui.onUserAction = this.onUserAction.bind(this);
    }

    onUserAction(action, data) {
        console.log("Usasdfer action: ", action, data);
    }

}