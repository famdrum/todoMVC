import View from '../View/View'
import Model from '../Model/Model'

function findChildIndex(child){
    var i = 0;
    while( (child = child.previousSibling) != null )
        i++;
    return i
}

class Controller {
    constructor(input, todo_root, filters_root){
        const _this = this

        this.model = new Model();
        this.view = new View(todo_root, filters_root,_this);
        this.todo_root = todo_root

        input.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                _this.dispatchTodo(input.value)
                form.reset()
            }
        })

        let form = document.querySelector(".todo__form")
        form.addEventListener("submit", function (event) {
            event.preventDefault()
        })
    }

    dispatchTodo(todo){

        this.model.addTodo(todo, "active")

        let index = this.model.todoos.length - 1

        this.view.renderTodo({
            index: index,
            text: todo
        })
    }

    dispatchChangeState(child, state){
        let index = findChildIndex(child)

        this.model.changeState(index, state)
    }

    dispatchDelete(child){
        let index = findChildIndex(child)
        this.model.removeTodo(index)

        this.todo_root.removeChild(this.todo_root.childNodes[index]);
    }
}

export default Controller