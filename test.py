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

