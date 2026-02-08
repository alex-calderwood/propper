function uuid(prefix) {
    return prefix + "-" + Math.random().toString(36).substring(2, 15);
}

let storyBlocks = [{
        name: "tiger",
        cue: "Is that a tiger?",
        discovery: "It's a tiger!",
        failure: "It's possible I imagined it...",
    },
    {
        name: "coatrack",
        cue: "Is that a coatrack?",
        discovery: "It's a coatrack!",
        failure: "It's possible I imagined it...",
    },
]

export class StoryBlock {
    constructor(data) {
        this.data = {
            name: "" || uuid("storyblock"),
            cue: "",
            discovery: "",
            failure: "",
            ...data
        }
    }

    // Get the story functions that could occur from this story block given 
    // a map of story functions
    getPossibleFunctions(storyfunctionMap) {
        return storyfunctionMap.filter(sf => sf.blocks.includes(this.data.name));
    }
}

// https://www.yorku.ca/mlc/4319/03-04/clacken/clacken6.html
export class StoryFunction {
    constructor(data) {
        this.data = {
            name: "" || uuid("storyfunction"),
            description: "",
            blocks: [],
            ...data
        }
    }
}

let storyfunctionMap = [
    {
        name: "absentation",
        description: "The tiger tamer absond-absented",
        blocks: ["tiger", "coatrack" ]

    } // sf
]


export class Challenge {
    constructor(data) {
        this.data = {
            name: "" || uuid("challenge"),
            distance: 500, // m
            time:  2 * 60, // s
            ...data
        }
    }
}

let challenge1 = {
    distance: 500, // m
    time:  2 * 60, // s
}

export class DialogueEvent {
    constructor(data) {
        this.data = {
            name: "" || uuid("dialogueevent"),
            text: "",
            ...data
        }
    }
}

let de1 = {
    text: "Hi welcome to the game",
}