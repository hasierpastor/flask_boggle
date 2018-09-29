from unittest import TestCase
from app import app, boggle_game, generate_board
from flask import session
from boggle import Boggle



class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!

    def test_board(self):
        """testing that board is in session"""
        client = app.test_client()
        
        with client:
            response=client.get('/')
            self.assertTrue(session['board'])


    def test_post_status_guess_word(self):
        """testing the status code post request for when user submits a guess"""

        client = app.test_client()
        get_request = client.get('/')
        result = client.post('/', data={'word':'QXC'})
        self.assertEqual(result.status_code,200)

    def test_post_guess_word_correct_message(self):
        """testing that not is in message when word is either invalid or not on board"""

        client = app.test_client()
        get_request = client.get('/')
        result = client.post('/', data={'word':'QXC'})
        self.assertIn(b'not', result.data)
    
    def test_end_game_status_code(self):
        """testing the status code for end_game post request"""

        client = app.test_client()
        get_request = client.get('/')
        result = client.post('/end_game', data={'score': '5'})
        self.assertEqual(result.status_code,200)

    def test_session_after_game(self):
        """testing that session contains high_score and games_played after game"""

        client = app.test_client()

        with client:
            get_request = client.get('/')
            result = client.post('/end_game', data={'score': '5'})
            self.assertTrue(session['highest_score'], session['num_games'])


