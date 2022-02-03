Vue.component('vue-nav',{
    props: ['link'],
    template : '<li><a class="dropdown-item" :href="link.url">{{link.name}}</a></li>'
});

var app = new Vue({
    el : "#app",
    data : {
        navLinks: [
            {id : 0, url: "/index.html", name: "Home"},
            {id : 1, url: "/test.html", name: "Test"},
        ]
    }
})


