import React, { Component } from 'react';
import logo from './logo.svg';
import Application from './Components/Map'
import firebase from 'firebase';
import './App.css';
import Login from './Components/Login';

	constructor() {
		super()
		this.handleAuth = this.handleAuth.bind(this)
		this.handleLogout = this.handleLogout.bind(this)
	}

	state = {
		user: null
	}

	componentWillMount() {
		firebase.auth().onAuthStateChanged(user => {
			this.setState({ user })
		})
	}

	handleAuth() {
		const provider = new firebase.auth.GoogleAuthProvider()
		provider.addScope('https://www.googleapis.com/auth/plus.login')

		firebase.auth().signInWithPopup(provider)
			.then(result => console.log(`${result.user.email} ha iniciado sesión`))
			.catch(error => console.log(`Error ${error.code}: ${error.message}`))
	}

	handleLogout() {
		firebase.auth().signOut()
			.then(result => console.log('Te has desconectado correctamente'))
			.catch(error => console.log(`Error ${error.code}: ${error.message}`))
	}

	render() {
		return (
			<div className="App">
				<Login
					user={this.state.user}
					onAuth={this.handleAuth}
					onLogout={this.handleLogout}
				/>
			</div>
			<Application/>
		);
	}
}

export default App;

