# vue-ckeditor
- It was forked from https://github.com/dangvanthanh/vue-ckeditor2 and change to run under ES5 enviroment like PC browser.

## Install
- Your must have vue2 and ckeditor4 first, then download vueckeditor.js file to your web folder

## Usage
````
<script src="vue.js"></script>
<script src="vueckeditor.js"></script>

<vueckeditor v-model="Value" v-bind:config="ckeditorConfig"></vueckeditor>

var vum = new Vue({
    ..
    ..
    components: {
        "vueckeditor": vueckeditor
    },
    data: {
        ckeditorConfig: {
            language: "en",
            height: 300, width: 650
        }
    },
    ..
    ..
````
