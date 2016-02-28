(function() {

    var todos = [];

    var Elements = (function() {
        var todoApp = document.querySelector('#todoApp');

        var title = document.createElement('h1');
        var titleText = document.createTextNode("Todos:");
        title.appendChild(titleText);
        todoApp.appendChild(title);

        var todoInput = document.createElement('input');
        todoInput.setAttribute('id', 'todo');
        todoInput.setAttribute('type', 'text');
        todoInput.setAttribute('placeholder', 'new todo...');
        todoApp.appendChild(todoInput);

        var addTodoButton = document.createElement('button');
        var addTodoButtonText = document.createTextNode('Add...');
        addTodoButton.appendChild(addTodoButtonText);
        todoApp.appendChild(addTodoButton);


        var todoList = document.createElement('div');
        var todoContainer = document.createElement('ul');
        todoList.appendChild(todoContainer);
        todoApp.appendChild(todoList);

        var deleteButtons = todoList.getElementsByTagName('button');

        return {
            todoInput: todoInput,
            addTodoButton: addTodoButton,
            todoList: todoList,
            deleteButtons: deleteButtons
        };
    }).call(this);

    Elements.addTodoButton.onclick = function() {
        todos.push(Elements.todoInput.value);
        Actions.createTodo(Elements.todoInput.value);
        Elements.todoInput.value = "";
    };

    var Actions = (function() {
        function createTodo(info) {
            var el = document.createElement('li');
            var h = document.createElement('em');
            var innerText = document.createTextNode(info);
            h.appendChild(innerText);
            var removeButton = document.createElement('button');
            var buttonText = document.createTextNode("Finished");
            removeButton.appendChild(buttonText);
            el.appendChild(removeButton);
            el.appendChild(h);
            Elements.todoList.appendChild(el);
            this.loadRemoveButtons();
        }
        function loadRemoveButtons() {
            var _this = this;
            for(var i = 0; i < todos.length; i++) {
                Elements.deleteButtons[i].addEventListener('click', _this.removeTodo, false);
            }
        }
        function removeTodo() {
            var toDelete = this.parentNode;
            var deleteIndex = todos.indexOf(toDelete.firstElementChild.innerHTML);
            todos.splice(deleteIndex, 1);
            toDelete.remove();
        }

        return {
            createTodo: createTodo,
            loadRemoveButtons: loadRemoveButtons,
            removeTodo: removeTodo
        };
    }).call(this);

}).call(this);