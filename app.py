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
    guess = request.form.get('word')
    is_word = boggle_game.check_valid_word(session['board'], guess)
    result = {'result': is_word}
    session['guesses'] = []
    if result.get('result') is 'ok':
        session['guesses'].append(guess)
    return jsonify(result)

@app.route('/end_game', methods=['POST'])
def display_end_game_page():
    if session.get('highest_score'):
        if int(request.form.get('score')) > int(session.get('highest_score')):
            session['highest_score'] = request.form.get('score')
    else:
        session['highest_score'] = request.form.get('score')

    if session.get('num_games'):
        session['num_games'] = int(session['num_games']) + 1
    else:
        session['num_games'] = 1

    response = {'high_score': session['highest_score'], 'games_played': session['num_games']}

    return jsonify(response)