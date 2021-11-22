// ✅ HTTP Verbs

    // CRUD => POST, GET, PATCH, DELETE

// ✅ CRUD with Fetch: GET Requests

	// ❗ when retrieving multiple items
	
		// function getItems() {
			// fetch('http://localhost:3000/pokemons') // returns a promise
			
			// // once first Promise is resolved...
			// .then(resp => resp.json()) //
			
			// // once second Promise is resolved...
			// .then(pokemons => {

			// 	// ...console.log the JS response
		
			// // ❗ should return an Array of retrieved items
			// 	console.log(pokemons)
			// });
		// }

	// ❗ when retrieving one item

		// function getItem(item) {
			// fetch(`http://localhost:3000/items/${item.id}`) // returns a promise
			
			// // once first Promise is resolved...
			// .then(resp => resp.json()) //
			
			// // once second Promise is resolved...
			// .then(item => {

			// 	// ...console.log the JS response
		
			// // ❗ should return the retrieved JS object
			// 	console.log(item)
			// });
		// }

// ✅ CRUD with Fetch: POST Requests
       
	// let item = { id: 1, content: "my item" };

	function createItem(item) {
		fetch('http:localhost:3000/pokemons', {
			
			// ❗ specify method
			method: 'POST',
			
			// ❗ specify headers
			headers: {
				'Content-Type': 'application/json',
			},
	
			// ❗ convert the item into a JSON string, necessary for compatibility with db.json 
			body: JSON.stringify(item),
		})
		.then(resp => resp.json())

		// ❗ should return the newly created JS object
		.then(item => console.log(item));
	}

// ✅ CRUD with Fetch: PATCH Requests
		
	// 2nd Pokemon
	// {
	// 	"id": 2,
	// 	"name": "Ivysaur",
	// 	"img": "./images/ivysaur.png",
	// 	"likes": 0
	// }

	// function updatePokemon(pokemon) {
	// 	// update pokemon object before sending it in body of fetch request
	// 	++pokemon.likes

	// 	// ❗ make sure to include identifier (id) in request URL
	// 	fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {
		
	// 		// ❗ specify method
	// 		method: 'PATCH',

	// 		// ❗ specify headers
	// 		headers: {
	// 			'Content-Type': 'application/json'
	// 		},

	// 		// ❗ convert the item into a JSON string
	// 		body: JSON.stringify(pokemon)
	// 	})
	// 	.then(resp => resp.json())
	// 	// ❗ should return the updated JS object
	// 	.then(pokemon => console.log(pokemon));
	// }

// ✅ CRUD with Fetch: DELETE Requests

	// function deleteMultipleItems(items) {
	// 	items.forEach( item => {
	// 		fetch(`http:localhost:3000/items/${item.id}`, {
	// 			// ❗ specify method
	// 			method: 'DELETE',
				
	// 			// ❗ specify headers
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			}
	// 		})
	// 		.then(resp => resp.json())

	// 		// ❗ should return an empty JS object
	// 		.then(item => console.log(item));
	// 	});
	// }

// -------------------------------------------

console.log("------------------------");
console.log("⬇️ Break Out Activities ⬇️");
console.log("🚨 Comment Out Lecture Code Above Before Starting 🚨");
console.log("💡 Use console.log() To Check Answers 💡");
console.log("------------------------");

	// ❗ Use these constants / functions in your solutions
	const BASE_URL = 'http://localhost:3000';
	const pokeContainer = document.getElementById('poke-container');
	const commentsContainer = document.getElementById('comments-container');
	const commentsForm = document.getElementById('comments-form');

	const earthElement = document.createElement('div');
	const fireElement = document.createElement('div');
	const waterElement = document.createElement('div');
	
	function renderPokemon(pokemon) {
		const pokeCard = document.createElement("div");
		const pokeImg = document.createElement("img");
		const pokeName = document.createElement("h3");
		const pokeLikes = document.createElement("h3");
		const likesNum = document.createElement("h5");
		const likeBttn = document.createElement("button");
		const deleteBttn = document.createElement("button");

		pokeCard.id = `poke-${pokemon.id}`;
		pokeCard.className = "poke-card";
		
		pokeImg.src = pokemon.img;
		pokeImg.alt = `${pokemon.name} image`;

		pokeName.textContent = pokemon.name;
		
		pokeLikes.textContent = "Likes: ";
		
		likesNum.className = "like-num";
		likesNum.textContent = pokemon.likes;
		
		likeBttn.className = "like-bttn";
		likeBttn.textContent = "♥";
		likeBttn.addEventListener("click", () => increaseLike(pokemon, likesNum));

		deleteBttn.className = "delete-bttn";
		deleteBttn.textContent = "Delete";
		deleteBttn.addEventListener("click", () => deletePoke(pokemon, pokeCard));

		pokeCard.append(pokeImg, pokeName, pokeLikes, likesNum, likeBttn, deleteBttn);
		pokeContainer.appendChild(pokeCard);
	}

	function loadPokemons() {
		fetch(BASE_URL + '/pokemons')
		.then(resp => resp.json())
		.then(pokemons => {
			pokemons.forEach(renderPokemon);  
		});
	}

	// PREVIOUS LECTURE (Fetch with POST Requests)

	function loadComments() {
		fetch(BASE_URL + '/comments') // returns a promise
		.then(resp => resp.json()) // another promise
		.then(comments => {
			comments.forEach(renderComment);  
			// console.log(comments);
		});
	}

	function renderComment(comment) {
		const commentCard = document.createElement("div");
		const userName = document.createElement("h3");
		const userContent = document.createElement("p");

		commentCard.className = "comment-card";
		
		userName.textContent = comment.content;

		userContent.textContent = `Added by ${comment.user}`;

		commentCard.append(userName, userContent);
		commentsContainer.append(commentCard);
	}

	function createComment(e) {
		e.preventDefault();
		
		let commentUser = commentsForm.querySelector("#user").value;
		let commentContent = commentsForm.querySelector("#content").value;
		let comment = {
			// id: commentsContainer.children.length + 1, 
			// if we don't want json-server to handle id generation
			user: commentUser,
			content: commentContent,
		};
	
		fetch(BASE_URL + '/comments/', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify(comment),
		})
		.then(resp => resp.json())
		.then(newComment => {
			console.log(newComment);
			commentsForm.reset();
			commentsContainer.replaceChildren();
			loadComments();
		});
	}

	function init() {
		loadPokemons();
		loadComments();
		commentsForm.addEventListener("submit", createComment);
	}

	init();

// 🚧 Break Out Activity 1: Handling / Rendering PATCH Requests

	// 🚨 Comment out any conflicting code above before proceeding.

	// 1️⃣ Build upon increaseLike() such that it:

		// 	✔️	Initiates a fetch() request to update the Pokemon object in question

			// ❗ Remember to interpolate the Pokemon object's ID into your fetch request URL

		// 	✔️	Updates the Pokemon's number of likes both in "db.json" and in the DOM

		// 	✔️	Returns and logs the updated Pokemon object to the Browser console

		// 	✨ BONUS: Include meaningful error catching / reporting using "console.error"

		function increaseLike(pokemon, likesNum) {
			// update Pokemon object before issuing fetch PATCH reqest
			++pokemon.likes;

			const configObj = {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(pokemon)
			}

			// const BASE_URL = 'http://localhost:3000';
			// initiate PATCH fetch request
			fetch(BASE_URL + `/pokemons/${pokemon.id}`, configObj)
			.then(resp => resp.json())
			.catch(error => { 
				// incorporate error handling
				// helping end users
					// redirect
					// update the DOM with UI friendly error message
				// helping devs
				console.error('ERROR:', error); 
			})
			// log updatedPokemon object to Browser console
			.then(updatedPokemon => { 
				console.log(updatedPokemon);
				
				// make DOM updates only after successful fetch
				likesNum.textContent = pokemon.likes;
			});
		}

		// ✅ Check Answer in Browser / Console

// 🚧 Break Out Activity 2: Handling / Rendering DELETE Requests

	// 🚨 Comment out any conflicting code above before proceeding.

	// 1️⃣ Build upon deletePoke() such that it:

		//  ✔️  Accepts an additional parameter, "pokemon"

		// 	✔️  Initiates a fetch() request to delete the Pokemon object in question

			// ❗ Remember to interpolate the Pokemon object's ID into your fetch request URL

		// 	✔️	Removes the Pokemon object both in "db.json" and in the DOM (pokeCard)

		// 	✔️	Returns and logs an empty JS object to the Browser console

		// 	✨ BONUS: Include meaningful error catching / reporting using "console.error"

		function deletePoke(pokemon, pokeCard) {

			const configObj = {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				}
			}

			fetch(BASE_URL + `/pokemons/${pokemon.id}`, configObj)
			.then(resp => resp.json())
			.catch(error => console.error('ERROR:', error))
			// ❗ should return an empty JS object (if deleted successfully)
			.then(deletedPokemon => { 
				console.log(deletedPokemon);
				
				// make DOM changes only after successful deletion
				pokeCard.remove();
			});
		}

		// ✅ Check Answer in Browser / Console