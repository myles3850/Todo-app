import { FormEvent, useEffect, useState } from 'react';
import './App.css';
import { FirebaseService } from './classes/firebase-service';
import { ToDoObject } from './types';
import { onSnapshot, query } from 'firebase/firestore';

const fb = FirebaseService.getInstance();

function App() {
	const [todo, setTodo] = useState<ToDoObject[]>([]);

	async function getTodoList() {
		const list = await fb.getAllTodo();
		setTodo(list ?? []);
	}

	async function addTodoItem(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const todoItem = (event.currentTarget.elements[0] as HTMLInputElement).value;
		await fb.addTodo({ item: todoItem });
		await getTodoList();
	}

	useEffect(() => {
		async function fetchData() {
			const q = query(await fb.getCollection());
			onSnapshot(q, () => {
				getTodoList();
			});
		}
		fetchData();
	}, []);

	return (
		<>
			<h2>To-do App</h2>
			<div className='newTodo'>
				<form onSubmit={addTodoItem}>
					<input placeholder='Enter A New To Do Item'></input>
					<button type='submit'>add todo</button>
				</form>
			</div>
			<button onClick={getTodoList}>show todo list</button>
			{todo.map((item) => (
				<tr itemID={item.id}>
					<td>{item.data.item}</td>
				</tr>
			))}
		</>
	);
}

export default App;
