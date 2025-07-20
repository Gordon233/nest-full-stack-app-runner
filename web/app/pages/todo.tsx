import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { TodosApi, Configuration } from '../api-client';
import type { Todo, CreateTodoDto } from '../api-client';

// 配置 API 客户端
const apiConfig = new Configuration({
  basePath: 'http://localhost:3000',
  // 如果需要认证，可以添加：
  // accessToken: 'your-jwt-token'
});

const todosApi = new TodosApi(apiConfig);

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  // 获取所有待办事项
  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await todosApi.todosControllerFindAll();
      setTodos(response.data);
    } catch (err) {
      setError('获取待办事项失败');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  // 创建新的待办事项
  const createTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;

    try {
      const createData: CreateTodoDto = {
        title: newTodo.title,
        description: newTodo.description || undefined,
        completed: false
      };

      const response = await todosApi.todosControllerCreate(createData);
      setTodos([...todos, response.data]);
      setNewTodo({ title: '', description: '' });
    } catch (err) {
      setError('创建待办事项失败');
      console.error('Error creating todo:', err);
    }
  };

  // 更新待办事项
  const updateTodo = async (id: number, updates: Partial<Todo>) => {
    try {
      const response = await todosApi.todosControllerUpdate(id, updates);
      setTodos(todos.map(todo =>
        todo.id === id ? response.data : todo
      ));
      setEditingTodo(null);
    } catch (err) {
      setError('更新待办事项失败');
      console.error('Error updating todo:', err);
    }
  };

  // 删除待办事项
  const deleteTodo = async (id: number) => {
    if (!confirm('确定要删除这个待办事项吗？')) return;

    try {
      await todosApi.todosControllerRemove(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('删除待办事项失败');
      console.error('Error deleting todo:', err);
    }
  };

  // 切换完成状态
  const toggleComplete = async (todo: Todo) => {
    await updateTodo(todo.id, { completed: !todo.completed });
  };

  // 开始编辑
  const startEdit = (todo: Todo) => {
    setEditingTodo({ ...todo });
  };

  // 保存编辑
  const saveEdit = async () => {
    if (!editingTodo) return;
    await updateTodo(editingTodo.id, {
      title: editingTodo.title,
      description: editingTodo.description
    });
  };

  // 组件挂载时获取数据
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      {/* 导航 */}
      <div className="flex items-center justify-between mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-700 hover:underline dark:text-blue-500"
        >
          ← 返回首页
        </Link>
      </div>

      {/* 页面标题 */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">待办事项管理</h1>
        <p className="text-gray-600 dark:text-gray-400">
          使用 NestJS API 客户端管理你的待办事项
        </p>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* 创建新待办事项表单 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">添加新待办事项</h2>
        <form onSubmit={createTodo} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              标题 *
            </label>
            <input
              type="text"
              id="title"
              value={newTodo.title}
              onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="输入待办事项标题"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              描述
            </label>
            <textarea
              id="description"
              value={newTodo.description}
              onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="输入待办事项描述（可选）"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            添加待办事项
          </button>
        </form>
      </div>

      {/* 待办事项列表 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">待办事项列表</h2>
          <button
            onClick={fetchTodos}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            刷新列表
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">加载中...</p>
          </div>
        ) : todos.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p className="text-lg">暂无待办事项</p>
            <p className="text-sm mt-1">添加你的第一个待办事项吧！</p>
          </div>
        ) : (
          <div className="space-y-4">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className={`border rounded-lg p-4 transition-colors ${
                  todo.completed
                    ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                    : 'bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600'
                }`}
              >
                {editingTodo && editingTodo.id === todo.id ? (
                  // 编辑模式
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editingTodo.title}
                      onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    />
                    <textarea
                      value={editingTodo.description || ''}
                      onChange={(e) => setEditingTodo({ ...editingTodo, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                      rows={2}
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={saveEdit}
                        className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                      >
                        保存
                      </button>
                      <button
                        onClick={() => setEditingTodo(null)}
                        className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                ) : (
                  // 显示模式
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`font-medium text-lg ${
                        todo.completed
                          ? 'line-through text-gray-500 dark:text-gray-400'
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {todo.title}
                      </h3>
                      {todo.description && (
                        <p className={`text-sm mt-1 ${
                          todo.completed
                            ? 'text-gray-400 dark:text-gray-500'
                            : 'text-gray-600 dark:text-gray-300'
                        }`}>
                          {todo.description}
                        </p>
                      )}
                      <div className="flex items-center space-x-4 mt-3 text-xs text-gray-400 dark:text-gray-500">
                        <span>创建: {new Date(todo.createdAt).toLocaleString()}</span>
                        <span>更新: {new Date(todo.updatedAt).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="ml-4 flex flex-col space-y-2">
                      <button
                        onClick={() => toggleComplete(todo)}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                          todo.completed
                            ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                      >
                        {todo.completed ? '取消完成' : '标记完成'}
                      </button>

                      <button
                        onClick={() => startEdit(todo)}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                      >
                        编辑
                      </button>

                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 统计信息 */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">统计信息</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{todos.length}</div>
            <div className="text-sm text-blue-600 dark:text-blue-400">总计</div>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {todos.filter(todo => todo.completed).length}
            </div>
            <div className="text-sm text-green-600 dark:text-green-400">已完成</div>
          </div>
          <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {todos.filter(todo => !todo.completed).length}
            </div>
            <div className="text-sm text-orange-600 dark:text-orange-400">待完成</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;