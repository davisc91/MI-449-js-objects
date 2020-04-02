// ----
// DATA
// ----

// A couple jokes to start with
var jokes = {
  'the horse': {
    setup: 'A horse walks into the bar. The bartender asks...',
    punchline: 'Why the long face?'
  },
  'Orion\'s pants': {
    setup: 'How does Orion keep his pants up?',
    punchline: 'With an asteroid belt.'
  }
}

// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢'

// -------------
// PAGE UPDATERS
// -------------

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var setup = document.getElementById('setup')
var punchline = document.getElementById('punchline')
var jokeBox = document.getElementById('joke-box') // result
var updateDisplayedJoke = function () {
  var requestedJokeKey = jokes[requestedJokeInput.value] // holds the joke if it is found
  if (!requestedJokeKey) {
    jokeBox.textContent = 'No matching joke found.'
  } else {
    setup = requestedJokeKey.setup
    punchline = requestedJokeKey.punchline
    var showJoke =
    '<p>' + setup + '</p>' + '<p>' + punchline + '</p>'
    jokeBox.innerHTML = showJoke
  }
}

var stringifiedJoke = window.localStorage.getItem('newJoke')
if (stringifiedJoke !== null) {
  var newJoke = JSON.parse(stringifiedJoke)
  jokes[newJoke.value] = newJoke
}

var newJokeInput = document.getElementById('new-joke-input')
var newSetupInput = document.getElementById('new-setup')
var newPunchlineInput = document.getElementById('new-punchline')
var rememberNewJoke = document.getElementById('remember-joke-btn')
rememberNewJoke.addEventListener('click', function () {
  var newJoke = {
    value: newJokeInput.value,
    setup: newSetupInput.value,
    punchline: newPunchlineInput.value
  }
  jokes[newJokeInput.value] = newJoke // gets joke

  var stringifiedJoke = JSON.stringify(newJoke)
  window.localStorage.setItem('newJoke', stringifiedJoke)
  updateJokesMenu()
})
var deleteJokeInput = document.getElementById('delete-joke-input')
var forgetNewJoke = document.getElementById('forget-joke-btn')
forgetNewJoke.addEventListener('click', function () {
  delete jokes[deleteJokeInput.value]
  updateJokesMenu()
})

// Function to keep track of all other
// page update functions, so that we
// can call them all at once

var updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
}

// -------
// STARTUP
// -------

// Update the page immediately on startup
updatePage()

// ---------------
// EVENT LISTENERS
// ---------------

// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)
