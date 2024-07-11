const UI = {  
    scoreView: undefined,
    stepView: undefined,

    score: 0,
    step: 0,

    init: function(step) {
        this.step = step
        this.score = 0

        this.scoreView = document.getElementById("score");
        this.stepView = document.getElementById("step");

        this.scoreView.innerText = this.score
        this.stepView.innerText = this.step
    },

    Update: function(score) {
        this.score += score
        this.step --;
        
        this.scoreView.innerText = this.score
        this.stepView.innerText = this.step
    },

    getStep: function() {
        return this.step;
    }
}