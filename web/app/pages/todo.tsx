import { useState } from 'react'
import { create } from 'zustand'
import { useLoaderData } from 'react-router'
import { TodosApi, type Todo, type CreateTodoDto, Configuration } from '~/api-client'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import type { Route } from './+types/todo'

// Helper function to get correct API base URL
function getApiBaseUrl(isServer = false): string {
  return isServer ? 'http://api:3000' : 'http://localhost:3000'
}

// Configure API for client-side operations
const clientConfig = new Configuration({
  basePath: getApiBaseUrl(false)
})
const clientApi = new TodosApi(clientConfig)

// SSR Loader function
export async function loader(): Promise<Todo[]> {
  try {
    // Use server-side API configuration for SSR
    const serverConfig = new Configuration({
      basePath: getApiBaseUrl(true)
    })
    const serverApi = new TodosApi(serverConfig)

    const response = await serverApi.todosControllerFindAll()
    return response.data
  } catch (error) {
    console.error('Failed to load todos:', error)
    return []
  }
}

// Zustand store (simplified for client-side operations only)
interface TodoStore {
  todos: Todo[]
  setTodos: (todos: Todo[]) => void
  addTodo: (title: string) => Promise<void>
  toggleTodo: (id: number) => Promise<void>
  deleteTodo: (id: number) => Promise<void>
}

const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],

  setTodos: (todos: Todo[]) => {
    set({ todos })
  },

  addTodo: async (title: string) => {
    if (!title.trim()) return

    try {
      const createDto: CreateTodoDto = { title: title.trim() }
      const response = await clientApi.todosControllerCreate(createDto)
      set(state => ({ todos: [...state.todos, response.data] }))
    } catch (error) {
      console.error('Failed to add todo:', error)
    }
  },

  toggleTodo: async (id: number) => {
    const todo = get().todos.find(t => t.id === id)
    if (!todo) return

    try {
      const response = await clientApi.todosControllerUpdate(id, { completed: !todo.completed })
      set(state => ({
        todos: state.todos.map(t => t.id === id ? response.data : t)
      }))
    } catch (error) {
      console.error('Failed to toggle todo:', error)
    }
  },

  deleteTodo: async (id: number) => {
    try {
      await clientApi.todosControllerRemove(id)
      set(state => ({ todos: state.todos.filter(t => t.id !== id) }))
    } catch (error) {
      console.error('Failed to delete todo:', error)
    }
  }
}))

export default function TodoPage() {
  // Get SSR data
  const initialTodos = useLoaderData<typeof loader>()

  // Initialize store with SSR data
  const { todos, setTodos, addTodo, toggleTodo, deleteTodo } = useTodoStore()
  const [newTodo, setNewTodo] = useState('')

  // Set initial data from SSR on first render
  useState(() => {
    if (initialTodos && todos.length === 0) {
      setTodos(initialTodos)
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      await addTodo(newTodo)
      setNewTodo('')
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button type="submit" disabled={!newTodo.trim()}>
            Add
          </Button>
        </div>
      </form>

      {todos.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No todos yet. Add one above!
        </div>
      ) : (
        <div className="space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={cn(
                "flex items-center gap-3 p-3 border rounded-md transition-all",
                todo.completed && "bg-gray-50 opacity-75"
              )}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-4 h-4"
              />
              <span
                className={cn(
                  "flex-1",
                  todo.completed && "line-through text-gray-500"
                )}
              >
                {todo.title}
              </span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteTodo(todo.id)}
              >
                ×
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}