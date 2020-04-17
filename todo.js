var todo = []
  function add() {
    var todo_text = document.getElementById("myInput").value;
    document.getElementById("myInput").value = ""
    var todo_list = {
          value: todo_text,
          id: todo.length + 1,
          checked: false
    }
    todo.push(todo_list)
    localStorage.setItem("todo",JSON.stringify(todo))
    addTodo(todo_list)
  }

  function addTodo(todo_list) {
    const ulItem = document.querySelector('.todo_list_item')
    ulItem.insertAdjacentHTML('beforeend', `
            <li class="card-body-item" data-key="${todo_list.id}">
              <div class="todo_single">
                <input id="${todo_list.id}" name= "checkbox" type="checkbox"/>
                <div class="item_text" contentEditable="true">${todo_list.value}</div>
                <div class="button_div"><button  id="${todo_list.id}" class="button_delete" name="delete">Delete </button></div>
              </div>
            </li>
          `);
          var elm = document.getElementById(todo_list.id);
          elm.checked = todo_list.checked;
  }
  window.onload = function () {
    var storage =JSON.parse(localStorage.getItem("todo"))
    todo = storage ? storage : []
    for (i in todo){
      addTodo(todo[i])
    }
    const form = document.querySelector('.js-form');
    form && form.addEventListener('submit', event => {
      event.preventDefault();
      const input = document.querySelector('.myInput');
      const text = input.value.trim();
      if (text !== '') {
        todo_list = {
          value: text,
          id: todo.length + 1,
          checked: false
        }
        todo.push(todo_list)
        localStorage.setItem("todo",JSON.stringify(todo))
        addTodo(todo_list);
        input.value = '';
        input.focus();
      }
    });


    function makeChecked(id, checked) {
      let index = todo.findIndex((e) => e.id === Number(id))
      todo[index].checked = checked
      localStorage.setItem("todo",JSON.stringify(todo))
    }

    function makeClear(id) {
      todo = todo.filter((e) => e.id !== Number(id))
      console.log(id)
      console.log(todo)
      localStorage.setItem("todo",JSON.stringify(todo))
    }

    const form_events = document.querySelector('.todo_list_item');
    form_events.addEventListener('click', event => {
      if (event.target.name === "checkbox") {
        makeChecked(event.target.id, event.target.checked)

      }
      if (event.target.name === "delete") {
        makeClear(event.target.id)
        event.target.parentElement.parentElement.parentElement.remove()
      }
    })

  };
