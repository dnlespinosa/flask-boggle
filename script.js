const $guess = $('#guess')
async function ajaxPost(e) {
    e.preventDefault()
    let guess  = $guess.val()
    console.log(guess);
    const response = await fetch('http://127.0.0.1:5000/', {
        method:'POST', 
        body: JSON.stringify({
            value: guess}
            )
        }
    )
    // console.log(response)
    const valid = await axios.get('http://127.0.0.1:5000/check', { params: {guess: guess}});
    console.log(valid.data.result)
    let val = valid.data.result
    if (val == 'not-word'){
        alert(`${guess} is not an English word, try again`)
    } else if (val == 'not-on-board') {
        alert(`${guess} is not on the board`)
    } else {
        $('.valid-words').append('li', {text: guess})
    }
};

$('#guess-form').on('submit', ajaxPost)

setInterval(function() {
    $('#guess-form').remove();
}, 60000);

let x = 60
$('#time-remaining').text(`${x}`);
setInterval(function(){
    if(x > 0) {
        x -= 1
        $('#time-remaining').text(`${x}`);
    }
}, 1000)

