import { UIProgress } from './ProgressPanel.js'

export const UI = {  
    scoreView: undefined,
    stepView: undefined,

    score: 0,
    step: 0,

    need_score: 0,

    init: function(step, need_score) {
        this.step = step
        this.score = 0
        this.need_score = need_score

        this.scoreView = document.getElementById("score");
        this.stepView = document.getElementById("step");

        this.scoreView.innerText = this.score
        this.stepView.innerText = this.step

        UIProgress.init()
    },

    Update: function(score) {
        this.score += score
        this.step --;

        UIProgress.set_value(this.score / this.need_score)
        
        this.scoreView.innerText = this.score
        this.stepView.innerText = this.step

        if (this.step == 0)
        { 
            if (this.score >= this.need_score)
                show_modal_window("You Win!");
            else
                show_modal_window("Game Over!");
        }
    },

    getStep: function() {
        return this.step;
    }
}