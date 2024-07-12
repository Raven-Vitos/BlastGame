const UIProgress = {
    canvas: undefined,
    progress: undefined,

    image_bg: undefined,
    image_st: undefined,
    image_end: undefined,
    image_progress: undefined,

    value_progress: 0,
    cur_value_progress: 0,

    init: function() {
        this.canvas = document.getElementById("progress-panel");
        this.progress = this.canvas.getContext("2d");

        this.image_bg = new Image()
        this.image_st = new Image()
        this.image_end = new Image()
        this.image_progress = new Image()

        this.image_bg.src = "Assets/Images/PanelProgress/BG.png";
        this.image_st.src = "Assets/Images/PanelProgress/st.png";
        this.image_end.src = "Assets/Images/PanelProgress/end.png";
        this.image_progress.src = "Assets/Images/PanelProgress/progress.png";
    },

    render: function(deltaTime) {
        this.progress.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.progress.drawImage(this.image_bg, 0, 0, 400, 100);

        this.progress.drawImage(this.image_st, 14, 60, 12, 23);

        this.cur_value_progress = easing(this.cur_value_progress, this.value_progress * 344, 0.2, deltaTime)
        this.progress.drawImage(this.image_progress, 26, 60, this.cur_value_progress, 23);

        let value_x = 26 + this.cur_value_progress
        this.progress.drawImage(this.image_end, value_x, 60, 12, 23);
    },

    set_value: function(value) {
        this.value_progress = (value <= 1.0) ? value : 1.0;
    }
}