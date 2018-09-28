from boggle import Boggle
from flask import Flask, request, render_template, session, flash, make_response, redirect, jsonify
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"

debug = DebugToolbarExtension(app)

boggle_game = Boggle()

@app.route('/')
def generate_board():
    """creates a new board and stores board in session"""
    new_board = boggle_game.make_board()
    session['board'] = new_board


    return render_template('board.html', board=new_board,)


@app.route('/', methods=['POST'])
def validate_guess():
    """receives guess from Ajax call and validates if guess is a word. Returns json response which
    contains dictionary {'result': ok} {'result': not-on-board} {'result': not-a-word} """
    guess = request.form.get('guess')
    is_word = boggle_game.check_valid_word(session['board'], guess)
    result = {'result': is_word}
    return jsonify(result)
