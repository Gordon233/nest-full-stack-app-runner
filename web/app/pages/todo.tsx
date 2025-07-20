import React, { useState, useEffect } from 'react';
import { Link, useFetcher, useRevalidator } from 'react-router';
import { TodosApi, Configuration } from '../api-client';
import type { Todo, CreateTodoDto } from '../api-client';
import type { Route } from './+types/todo';

// 配置 API 客户端
const apiConfig = new Configuration({
  basePath: 'http://localhost:3000',
});

const todosApi = new TodosApi(apiConfig);

// clientLoader 保持不变
export async function clientLoader(): Promise<Todo[]> {
  try {
    const response = await todosApi.todosControllerFindAll();
    return response.data;
  } catch (err) {
    console.error('Error fetching todos:', err);
    throw new Error('获取待办事项失败');
  }
}

// clientAction 保持不变
export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const intent = formData.get('intent') as string;

  try {
    switch (intent) {
      case 'create': {
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;

        if (!title.trim()) {
          return { error: '标题不能为空' };
        }

        const createData: CreateTodoDto = {
          title: title.trim(),
          description: description || undefined,
          completed: false
        };

        const response = await todosApi.todosControllerCreate(createData);
        return { success: '待办事项创建成功', data: response.data };
      }

      case 'update': {
        const id = Number(formData.get('id'));
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const completed = formData.get('completed') === 'true';

        const updates: Partial<Todo> = { title, description, completed };
        const response = await todosApi.todosControllerUpdate(id, updates);
        return { success: '待办事项更新成功', data: response.data };
      }

      case 'toggle': {
        const id = Number(formData.get('id'));
        const completed = formData.get('completed') === 'true';

        const response = await todosApi.todosControllerUpdate(id, { completed: !completed });
        return { success: '状态更新成功', data: response.data };
      }

      case 'delete': {
        const id = Number(formData.get('id'));
        await todosApi.todosControllerRemove(id);
        return { success: '待办事项删除成功', deletedId: id };
      }

      default:
        return { error: '未知操作' };
    }
  } catch (err) {
    console.error('Action error:', err);
    return { error: '操作失败，请重试' };
  }
}

export function HydrateFallback() {
  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <p className="mt-2 text-gray-600">加载中...</p>
      </div>
    </div>
  );
}

const TodoPage = ({ loaderData }: Route.ComponentProps) => {
  const initialTodos = loaderData;
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  
  // 使用 fetcher 而不是 Form 来避免自动重新验证
  const createFetcher = useFetcher();
  const updateFetcher = useFetcher();
  const toggleFetcher = useFetcher();
  const deleteFetcher = useFetcher();
  
  const revalidator = useRevalidator();

  // 乐观更新：根据 fetcher 的结果更新本地状态
  useEffect(() => {
    if (createFetcher.data?.data) {
      setTodos(prev => [...prev, createFetcher.data.data]);
    }
  }, [createFetcher.data]);

  useEffect(() => {
    if (updateFetcher.data?.data) {
      setTodos(prev => prev.map(todo => 
        todo.id === updateFetcher.data.data.id ? updateFetcher.data.data : todo
      ));
      setEditingTodo(null);
    }
  }, [updateFetcher.data]);

  useEffect(() => {
    if (toggleFetcher.data?.data) {
      setTodos(prev => prev.map(todo => 
        todo.id === toggleFetcher.data.data.id ? toggleFetcher.data.data : todo
      ));
    }
  }, [toggleFetcher.data]);

  useEffect(() => {
    if (deleteFetcher.data?.deletedId) {
      setTodos(prev => prev.filter(todo => todo.id !== deleteFetcher.data.deletedId));
    }
  }, [deleteFetcher.data]);

  // 当 loader 数据更新时同步本地状态
  useEffect(() => {
    setTodos(initialTodos);
  }, [initialTodos]);

  const isSubmitting = createFetcher.state === 'submitting' || 
                     updateFetcher.state === 'submitting' || 
                     toggleFetcher.state === 'submitting' || 
                     deleteFetcher.state === 'submitting';

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      {/* 导航 */}
      <div className="flex items-center justify-between mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-700 hover:underline"
        >
          ← 返回首页
        </Link>
      </div>

      {/* 页面标题 */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">待办事项管理</h1>
        <p className="text-gray-600">
          使用 useFetcher 实现无闪烁更新
        </p>
      </div>

      {/* 操作结果提示 */}
      {(createFetcher.data?.error || updateFetcher.data?.error || toggleFetcher.data?.error || deleteFetcher.data?.error) && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {createFetcher.data?.error || updateFetcher.data?.error || toggleFetcher.data?.error || deleteFetcher.data?.error}
        </div>
      )}
      
      {(createFetcher.data?.success || updateFetcher.data?.success || toggleFetcher.data?.success || deleteFetcher.data?.success) && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          {createFetcher.data?.success || updateFetcher.data?.success || toggleFetcher.data?.success || deleteFetcher.data?.success}
        </div>
      )}

      {/* 创建新待办事项表单 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">添加新待办事项</h2>
        <createFetcher.Form method="post" className="space-y-4">
          <input type="hidden" name="intent" value="create" />

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              标题 *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="输入待办事项标题"
              required
              disabled={createFetcher.state === 'submitting'}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              描述
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="输入待办事项描述（可选）"
              rows={3}
              disabled={createFetcher.state === 'submitting'}
            />
          </div>

          <button
            type="submit"
            disabled={createFetcher.state === 'submitting'}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {createFetcher.state === 'submitting' ? '添加中...' : '添加待办事项'}
          </button>
        </createFetcher.Form>
      </div>

      {/* 待办事项列表 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">待办事项列表</h2>
          <button
            onClick={() => revalidator.revalidate()}
            disabled={revalidator.state === 'loading'}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {revalidator.state === 'loading' ? '刷新中...' : '刷新列表'}
          </button>
        </div>

        {todos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg">暂无待办事项</p>
            <p className="text-sm mt-1">添加你的第一个待办事项吧！</p>
          </div>
        ) : (
          <div className="space-y-4">
            {todos.map((todo: Todo) => (
              <div
                key={todo.id}
                className={`border rounded-lg p-4 transition-colors ${
                  todo.completed
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                {editingTodo && editingTodo.id === todo.id ? (
                  // 编辑模式
                  <updateFetcher.Form method="post" className="space-y-3">
                    <input type="hidden" name="intent" value="update" />
                    <input type="hidden" name="id" value={todo.id} />
                    <input type="hidden" name="completed" value={todo.completed.toString()} />

                    <input
                      type="text"
                      name="title"
                      defaultValue={editingTodo.title}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      disabled={updateFetcher.state === 'submitting'}
                    />
                    <textarea
                      name="description"
                      defaultValue={editingTodo.description || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                      disabled={updateFetcher.state === 'submitting'}
                    />
                    <div className="flex space-x-2">
                      <button
                        type="submit"
                        disabled={updateFetcher.state === 'submitting'}
                        className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 disabled:opacity-50"
                      >
                        {updateFetcher.state === 'submitting' ? '保存中...' : '保存'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingTodo(null)}
                        className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                      >
                        取消
                      </button>
                    </div>
                  </updateFetcher.Form>
                ) : (
                  // 显示模式
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`font-medium text-lg ${
                        todo.completed
                          ? 'line-through text-gray-500'
                          : 'text-gray-900'
                      }`}>
                        {todo.title}
                      </h3>
                      {todo.description && (
                        <p className={`text-sm mt-1 ${
                          todo.completed
                            ? 'text-gray-400'
                            : 'text-gray-600'
                        }`}>
                          {todo.description}
                        </p>
                      )}
                      <div className="flex items-center space-x-4 mt-3 text-xs text-gray-400">
                        <span>创建: {new Date(todo.createdAt).toLocaleString()}</span>
                        <span>更新: {new Date(todo.updatedAt).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="ml-4 flex flex-col space-y-2">
                      {/* 切换完成状态 */}
                      <toggleFetcher.Form method="post" className="inline">
                        <input type="hidden" name="intent" value="toggle" />
                        <input type="hidden" name="id" value={todo.id} />
                        <input type="hidden" name="completed" value={todo.completed.toString()} />
                        <button
                          type="submit"
                          disabled={toggleFetcher.state === 'submitting'}
                          className={`px-3 py-1 rounded text-sm font-medium transition-colors disabled:opacity-50 ${
                            todo.completed
                              ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                              : 'bg-green-500 text-white hover:bg-green-600'
                          }`}
                        >
                          {todo.completed ? '取消完成' : '标记完成'}
                        </button>
                      </toggleFetcher.Form>

                      {/* 编辑按钮 */}
                      <button
                        type="button"
                        onClick={() => setEditingTodo({ ...todo })}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                      >
                        编辑
                      </button>

                      {/* 删除按钮 */}
                      <deleteFetcher.Form
                        method="post"
                        className="inline"
                        onSubmit={(e) => {
                          if (!confirm('确定要删除这个待办事项吗？')) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <input type="hidden" name="intent" value="delete" />
                        <input type="hidden" name="id" value={todo.id} />
                        <button
                          type="submit"
                          disabled={deleteFetcher.state === 'submitting'}
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 disabled:opacity-50"
                        >
                          删除
                        </button>
                      </deleteFetcher.Form>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 统计信息 */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">统计信息</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{todos.length}</div>
            <div className="text-sm text-blue-600">总计</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {todos.filter((todo: Todo) => todo.completed).length}
            </div>
            <div className="text-sm text-green-600">已完成</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {todos.filter((todo: Todo) => !todo.completed).length}
            </div>
            <div className="text-sm text-orange-600">待完成</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;