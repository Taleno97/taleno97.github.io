// example vue code 


Vue.component('todo-list', {
    props: ['todo'],
    template: '<li>{{todo.text}} </li>'
});

var app = new Vue({
    el: "#app",
    data: {
        message : 'Hallo',
        seen : true,
        todos: [
            {id: 0, text: 'Build Vue App'},
            {id: 1, text: 'Get Rich'},
            {id: 2, text: 'Buy Drugs'}
        ]
    },
    methods: {
        outputCurrentTime: function(){
            this.message = 'You loaded this on ' + new Date().toLocaleString();
        },
    }
});




