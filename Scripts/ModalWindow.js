var modal = document.getElementById("modal-window");

var span = document.getElementsByClassName("close")[0];

function show_modal_window(text) {
    const result = document.getElementById("result-game")
    result.innerText = text
    modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
  location.reload();
}


window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}