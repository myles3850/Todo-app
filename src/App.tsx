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

	async function removeTodoItem(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		const entryId = (event.target as HTMLInputElement).id;
		await fb.deleteTodo(entryId);
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
			<form className='newTodo' onSubmit={addTodoItem}>
				<input placeholder='Enter A New To Do Item'></input>
				<button type='submit' className='create'>
					Add to-do
				</button>
			</form>
			<hr />
			<div className='todoList'>
				<table className='todoList'>
					<tbody>
						{todo.map((item) => (
							<tr id={item.id}>
								<td className='todoText'>{item.data.item}</td>
								<td>
									<button
										id={item.id}
										onClick={removeTodoItem}
										className='delete'
									>
										Remove
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default App;
