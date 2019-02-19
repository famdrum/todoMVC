import "./base.scss"
import "./todo.scss"

class View{
    constructor(todo_root, filters_root, controller, ){
        this.todo_root = todo_root
        this.controller = controller

        function renderFilters(){
            let _this = this

            let filters = ["all", "active", "completed"]

            for(let i=0;i<filters.length;i++){
                let link = document.createElement("li")

                if(i==0){
                    link.style.border = '1px solid #bbbbbb'
                }

                link.innerHTML = `<a href="${filters[i]}">${filters[i]}</a>`
                link.addEventListener("click", function (ev) {
                    ev.preventDefault()

                    link.parentElement.childNodes.forEach(function(item){
                        item.style.border = 'none'
                    })

                    link.style.border = '1px solid #bbbbbb'

                    filterTodo(filters[i])
                })

                filters_root.appendChild(link)
            }
        }

        function filterTodo(filter){
            let todo_states = controller.model.todoos.slice()
            let i = 0

            todo_root.childNodes.forEach(function (item) {
                if(filter == "all"){
                    item.style.display = "flex"
                }else{
                    if(todo_states[i].state == filter){
                        item.style.display = "flex"
                    }else{
                        item.style.display = "none"
                    }
                }
                i++
            })
        }

        renderFilters()

    }

    renderTodo(task) {
        let _this = this

        let todo = document.createElement("li")
        todo.innerHTML = `${task.text}`
        todo.addEventListener("click", function () {
            if(todo.style.textDecoration == "line-through"){
                todo.style.textDecoration = "none"
                _this.controller.dispatchChangeState(todo, "active")
            }else{
                todo.style.textDecoration = "line-through"
                _this.controller.dispatchChangeState(todo, "completed")
            }
        })

        let removeButton = document.createElement("button")
        removeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="black"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>`
        removeButton.addEventListener("click", function(){
            _this.controller.dispatchDelete(todo)
        })
        todo.appendChild(removeButton)
        this.todo_root.appendChild(todo)
    }
}
export default View