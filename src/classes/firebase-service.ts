import { FirebaseApp, initializeApp } from 'firebase/app';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, getFirestore } from 'firebase/firestore';
import { toDoData, ToDoObject } from '../types';

export class FirebaseService {
	private app: FirebaseApp;
	private db: Firestore;
	private static instance: FirebaseService;

	private constructor() {
		this.app = initializeApp({
			apiKey: import.meta.env.VITE_API_KEY,
			authDomain: import.meta.env.VITE_AUTH_DOMAIN,
			databaseURL: import.meta.env.VITE_DATABASE_URL,
			projectId: import.meta.env.VITE_PROJECT_ID,
			storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
			messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
			appId: import.meta.env.VITE_APP_ID,
		});
		this.db = getFirestore(this.app);
	}

	static getInstance() {
		if (!this.instance) {
			this.instance = new FirebaseService();
		}
		return this.instance;
	}

	public async addTodo(data: toDoData) {
		try {
			await addDoc(collection(this.db, 'toDoItems'), data);
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	}

	public async getAllTodo() {
		const todoList: ToDoObject[] = [];
		try {
			const data = await getDocs(collection(this.db, 'toDoItems'));
			data.forEach((doc) => {
				const data = doc.data() as toDoData;
				todoList.push({ id: doc.id, data });
			});

			return todoList;
		} catch (e) {
			console.error('error getting todo items:', e);
		}
	}

public async getCollection() {
	return collection(this.db, 'toDoItems')
}

	public async deleteTodo(docId: string) {
		await deleteDoc(doc(this.db, 'toDoItems', docId))
	}
}
