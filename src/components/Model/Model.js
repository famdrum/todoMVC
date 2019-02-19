function remove(array, element) {
    return array.filter(el => el !== element);
}

class Model{
    constructor(){
        this.todoos = []
    }

    removeTodo(index){
        this.todoos = remove(this.todoos, this.todoos[index])
    }

    addTodo(todo, state){
        this.todoos.push({todo: todo, state: state})
    }

    changeState(index, state){
        if(this.todoos[index]){
            this.todoos[index].state = state
        }
    }
}

export default Model