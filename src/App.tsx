import { useState } from 'react';

type Todo = { text: string; done: boolean };

export const App = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>Todos:</h1>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} style={{ margin: '8px' }}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() =>
                setTodos(
                  todos.map((t, i) =>
                    i === index ? { text: t.text, done: !t.done } : t
                  )
                )
              }
            />
            <span
              style={{
                textDecoration: todo.done ? 'line-through' : undefined,
                margin: '16px',
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => setTodos(todos.filter((_, i) => i !== index))}
            >
              x
            </button>
          </li>
        ))}
      </ul>
      <input
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key !== 'Enter' || !text) return;
          setTodos(todos.concat({ text, done: false }));
          setText('');
        }}
      />
    </div>
  );
};
