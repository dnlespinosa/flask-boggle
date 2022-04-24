from flask import Flask, request, render_template, redirect, flash, jsonify, session
from boggle import Boggle

boggle_game = Boggle()
app = Flask(__name__)
app.config["SECRET_KEY"] = "chickens"

@app.route('/', methods=['GET','POST'])
def home_page():
    # r = requests.post('http://127.0.0.1:5000/', params=payload)
    board = boggle_game.make_board()
    session['board'] = board
    highscore = session.get('score', 0)
    play_nums = session.get('play_nums', 0)
    return render_template('index.html', board=board, play_nums=play_nums, highscore=highscore)

@app.route('/check')
def check():
    res = request.args['guess']
    board = session['board']
    valid = boggle_game.check_valid_word(board, res)
    return jsonify({'result': valid}) 

@app.route('/score', methods=['POST'])
def score():
    score = request.json['score']
    highscore = session.get('highscore', 0)
    play_nums = session.get('play_nums', 0)
    session['play_nums'] = play_nums + 1
    session['highscore'] = max(score, highscore)
    return jsonify(record = score > highscore)

