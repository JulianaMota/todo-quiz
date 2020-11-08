const nav = document.querySelector('nav');
const quiz = document.querySelector('#quiz');
const todo = document.querySelector('#todo');
const answerArr = [ 'A', 'B', 'B', 'B' ];
const quizForm = document.querySelector('.quizForm');
const result = document.querySelector('.result');
const addForm = document.querySelector('.add');
const tasks = document.querySelector('.tasks');
const doneTasks = document.querySelector('.done');
const searchForm = document.querySelector('.search input');
const modalDiv = document.querySelector('.modal');
const backBtn = document.querySelectorAll('.back');
addForm.style.display = 'grid';

//back
backBtn.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		e.preventDefault();
		nav.classList.remove('hide');
		todo.classList.add('hide');
		quiz.classList.add('hide');
	});
});

//navigation
nav.addEventListener('click', (e) => {
	e.preventDefault();
	if (e.target.id === 'btnQ') {
		quiz.classList.remove('hide');
		quiz.classList.add('anime');
		todo.classList.add('hide');
		nav.classList.add('hide');
		todo.classList.remove('anime');
	} else if (e.target.id === 'btnT') {
		todo.classList.remove('hide');
		todo.classList.add('anime');
		nav.classList.add('hide');
		quiz.classList.add('hide');
		quiz.classList.remove('anime');
	}
});

//quiz form
quizForm.addEventListener('submit', (e) => {
	e.preventDefault();
	let score = 0;
	const userAnswer = [ quizForm.q1.value, quizForm.q2.value, quizForm.q3.value, quizForm.q4.value ];

	//check answers
	userAnswer.forEach((answer, index) => {
		if (answer === answerArr[index]) {
			score += 25;
		}
	});

	result.classList.remove('hide');

	let output = 0;
	const timer = setInterval(() => {
		result.querySelector('.percentage').textContent = `${output}%`;
		if (output === score) {
			clearInterval(timer);
		} else {
			output++;
		}
	}, 10);
});

//add task
addForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const task = addForm.add.value.trim();

	if (task.length) {
		displayTask(task);
		addForm.reset();
	}
});

//display task
const displayTask = (task) => {
	const id = Array.from(tasks.children).length + 1;
	const html = `
		<li class="" id="${id}">
			<span>${task}</span>
			<i class="far fa-check-circle done"></i>
			<i class="far fa-edit edit"></i>
			<i class="far fa-times-circle delete"></i>
		</li>
	`;

	tasks.innerHTML += html;
};

//done task or undone
tasks.addEventListener('click', (e) => {
	if (e.target.classList.contains('done')) {
		//if done
		e.target.parentElement.children[1].classList = 'fas fa-check-circle undone';
		e.target.parentElement.style.opacity = '0.5';
		e.target.parentElement.remove();
		tasks.appendChild(e.target.parentElement);
	} else if (e.target.classList.contains('undone')) {
		//if undone
		e.target.parentElement.children[1].classList = 'far fa-check-circle done';
		e.target.parentElement.style.opacity = '1';
		e.target.parentElement.remove();
		tasks.insertBefore(e.target.parentElement, tasks.firstChild);
	} else if (e.target.classList.contains('delete')) {
		//if delete
		e.target.parentElement.remove();
	} else if (e.target.classList.contains('edit')) {
		//if edit
		openModal(e.target.parentElement);
		addForm.style.display = 'none';
	}
});

//search Task
searchForm.addEventListener('keyup', () => {
	const searchValue = searchForm.value.trim().toLowerCase();
	filterTasks(searchValue);
});

const filterTasks = (searchValue) => {
	Array.from(tasks.children)
		.filter((task) => !task.textContent.toLowerCase().includes(searchValue))
		.forEach((task) => (task.style.display = 'none'));

	Array.from(tasks.children)
		.filter((task) => task.textContent.toLowerCase().includes(searchValue))
		.forEach((task) => (task.style.display = 'block'));
};

//edit task
const openModal = (task) => {
	modalDiv.classList.remove('hide');

	const modal = `
	<form class="edit-form" id="${task.id}">	
		<label class="">Update a Task: </label>
		<input type="text" name="update" value="${task.textContent.trim()}">
		<input type="submit" value="Update" class="btn">
		<button class="close">Cancel</button>
	</form>
	`;

	modalDiv.innerHTML = modal;
	document.querySelector('.edit-form').addEventListener('submit', editForm);
	document.querySelector('.close').addEventListener('click', closeModal);
};

//update task
const editForm = (e) => {
	e.preventDefault();
	const form = document.querySelector('.edit-form');
	Array.from(tasks.children).forEach((task) => {
		if (task.id === form.id) {
			task.children[0].textContent = form.update.value;
		}
	});
	modalDiv.classList.add('hide');
	addForm.style.display = 'grid';
};

//close modal
const closeModal = () => {
	modalDiv.classList.add('hide');
	addForm.style.display = 'grid';
};
