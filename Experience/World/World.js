import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Can from "./Can.js";
import Points from "./Points.js";
import Controls from "./Controls.js";

export default class World{
    constructor() {
        this.experience = new Experience();
        this.resources = this.experience.resources;

        this.resources.on("ready", () => {
            this.can = new Can();
            this.environment = new Environment();
            this.points = new Points();
            this.controls = new Controls();
        })
    }

    update(){
        if(this.can){
            this.can.update();
        }

        if(this.points){
            this.points.update();
        }
        if(this.controls){
            this.controls.update();
        }

    }
}