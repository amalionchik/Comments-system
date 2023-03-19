// Объявление переменных
const commentField = document.querySelector('#comment-field')
const comments = []





// Описание функции создания комментария
function createComm() {
	event.preventDefault()

	let name = document.querySelector('#name')
	let text = document.querySelector('#text')
	let date = document.querySelector('#date')
	let likeCount = document.querySelector('#like-value')

	let comment = {
		name: name.value,
		text: text.value,
		date: getDate() || '',
		likeCounter: likeCount.textContent || 0,
	}

	if (validation(comment)) {
		name.value = ''
		text.value = ''
		date.value = ''

		comments.push(comment)
		showComm(comment)
	}
}





// Описание функции, отображающей комментарий
const showComm = (comm) => {
	let output = `
		<div class="comment">
			<div class="comment__container">
				<div class="comment__name">${comm.name}</div>
				<div class="comment__date">${comm.date}</div>
			</div>
			<div class="comment__container">
				<div class="comment__text">${comm.text}</div>
				<div class="comment__actions">
					<div class="comment__actions_element" id="like">
						<div class="comment__like">
							<div class="comment__like_icon">
								<img src="/images/like_common.svg" alt="" class="comment__like_iconC" id="like-common">
							</div>
							<div class="comment__like_icon">
								<img src="/images/like_active.svg" alt="" class="comment__like_iconA none" id="like-active">
							</div>
							<div class="comment__like_counter" id="like-value">${comm.likeCounter}</div>
						</div>
					</div>
					<div class="comment__actions_element" id="delete">
						<div class="comment__delete" id="delete-comment">
							<img src="/images/delete_icon.png" alt="">
						</div>
					</div>
				</div>
			</div>
		</div>
	`
	commentField.innerHTML += output





	// Назначение обработчиков событий на кнопки лайка и удаления комментария
	const likeBtn = commentField.lastElementChild.querySelector('#like')
	const deleteBtn = commentField.lastElementChild.querySelector('#delete')

	likeBtn.addEventListener('click', () => {
		const likeCommon = likeBtn.querySelector('#like-common')
		const likeActive = likeBtn.querySelector('#like-active')
		const likeValue = likeBtn.querySelector('#like-value')

		if (likeCommon.classList.contains('none')) {
			likeCommon.classList.remove('none')
			likeActive.classList.add('none')
			likeValue.textContent--
		} else {
			likeCommon.classList.add('none')
			likeActive.classList.remove('none')
			likeValue.textContent++
		}
	})

	deleteBtn.addEventListener('click', () => {
		commentField.removeChild(commentField.lastElementChild)
	})
}





// Описание валидации комментария
function validation(comm) {
	let nameValidation = document.querySelector('#validation-name')
	let textValidation = document.querySelector('#validation-text')
	let textarea = document.querySelector('#text')
	let input = document.querySelector('#name')

	if (comm.name.length < 3) {
		nameValidation.innerHTML += '<div class="temp">Имя должно содержать не менее трех символов</div>'
		setTimeout(() => {
			document.querySelector('.temp').remove()
		}, 1500);
		return false
	}

	if (comm.text.length < 10) {
		textValidation.innerHTML += '<div class="temp">Комментарий должен содержать не менее десяти символов</div>'
		setTimeout(() => {
			document.querySelector('.temp').remove()
		}, 1500);

	textarea.addEventListener('input', function() {
		document.querySelector('.temp').style.display = 'none'
	})

	input.addEventListener('input', function() {
		document.querySelector('.temp').style.display = 'none'
	})

			return false
	}

	return true
}





// Описание функции получения даты комментария
function getDate() {

	dateSelect = document.querySelector('#date').value
	a = new Date()

	dateToday = `${a.getFullYear()}-${(a.getMonth() + 1) < 10 ? '0' + (a.getMonth() + 1) : (a.getMonth() + 1)}-${a.getDate() < 10 ? '0' + a.getDate() : a.getDate()}`
	dateYesterday = `${a.getFullYear()}-${(a.getMonth() + 1) < 10 ? '0' + (a.getMonth() + 1) : (a.getMonth() + 1)}-${a.getDate() < 10 ? '0' + +(a.getDate() - 1) : +(a.getDate() - 1)}`
	timeNow = a.toLocaleTimeString()
	
	if (document.querySelector('#date-form').value == 'false') {
		return ``
	} else if (dateSelect == dateToday) {
		return `Сегодня, ${timeNow}`
	} else if (dateSelect == dateYesterday) {
		return `Вчера, ${timeNow}`
	} else if (dateSelect == '') {
		return `${dateToday}, ${timeNow}`
	} else {
		return `${dateSelect} ${timeNow}`
	}
}





// Отправка по Enter
document.addEventListener('keyup', e => {
	if (e.keyCode === 13) {
		createComm()
	}
})

// Отправка по кнопке
document.querySelector('#btn').onclick = () => {
	createComm()
}