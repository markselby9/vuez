<style src="todomvc-app-css/index.css"></style>

<template>
    <section class="todoapp">
        <!-- header -->
        <header class="header">
            <h1>todos</h1>
            <input class="new-todo"
                   autofocus
                   autocomplete="off"
                   placeholder="What needs to be done?"
                   @keyup.enter="addTodo">
        </header>
        <!-- main section -->
        <section class="main" v-show="todos.length">
            <input class="toggle-all"
                   type="checkbox"
                   :checked="allChecked"
                   @change="toggleAll({ done: !allChecked })">
            <ul class="todo-list">
                <todo v-for="(todo, index) in filteredTodos" :key="index" :todo="todo"></todo>
            </ul>
        </section>
        <!-- footer -->
        <footer class="footer" v-show="todos.length">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ remaining | pluralize('item') }} left
      </span>
            <ul class="filters">
                <li v-for="(val, key) in filters">
                    <a :href="'#/' + key"
                       :class="{ selected: visibility === key }"
                       @click="visibility = key">{{ key | capitalize }}</a>
                </li>
            </ul>
            <button class="clear-completed"
                    v-show="todos.length > remaining"
                    @click="clearCompleted">
                Clear completed
            </button>
        </footer>
    </section>
</template>

<script>
    import Todo from './components/Todo.vue';
    import Todos from './data/Todos';
    import TodoItem from './data/TodoItem';
    import {STORAGE_KEY, TODOS_ACTION, DELETE_TODO_ACTION} from './data/const';

    const filters = {
        all: todos => todos,
        active: todos => todos.filter(todo => !todo.done),
        completed: todos => todos.filter(todo => todo.done)
    };

    export default {
        components: {Todo},
        created: function () {
            this.$store.action(TODOS_ACTION, (todos) => {
                console.log('todos action triggered: ', todos);

                // update local storage
                window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
            });
            this.$store.action(DELETE_TODO_ACTION, (todo) => {
                console.log('willDeleteTodo action triggered: ', todo.text);
                // delete this todo item from this.todos array
                this.todos.splice(this.todos.indexOf(todo), 1);
            });
        },
        data () {
            return {
                todos: this.$store.observe(TODOS_ACTION, Todos()),
                visibility: 'all',
                filters: filters
            }
        },
        computed: {
            allChecked () {
                return this.todos.every(todo => todo.done)
            },
            filteredTodos () {
                return filters[this.visibility](this.todos)
            },
            remaining () {
                return this.todos.filter(todo => !todo.done).length
            }
        },
        methods: {
            addTodo (e) {
                let text = e.target.value;
                if (text.trim()) {
                    this.todos.push(TodoItem(text));
                }
                e.target.value = ''
            },
            clearCompleted () {
                this.todos = this.todos.filter((todo) => !todo.done);
                this.$store.observe(TODOS_ACTION, this.todos);  // trigger action function
            }
        },
        filters: {
            pluralize: (n, w) => n === 1 ? w : (w + 's'),
            capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
        }
    }
</script>
