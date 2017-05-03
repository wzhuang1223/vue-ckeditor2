var vueckeditor = {
    name: 'VueCkeditor',
    props: {
        value: {
            type: String
        },
        id: {
            type: String,
            default: function _default() {
                return 'editor_' + (new Date().getTime() + Math.random());
            }
        },
        types: {
            type: String,
            default: function _default() {
                return 'classic';
            }
        },
        config: {
            type: Object,
            default: function _default() { }
        }
    },
    template:
        '<textarea :id="id" :value="value" :types="types" :config="config"></textarea>',
    data: function data() {
        return {
            count: 0
        };
    },
    computed: {
        instance: function instance() {
            return CKEDITOR.instances[this.id];
        }
    },
    beforeUpdate: function beforeUpdate() {
        if (this.value !== this.instance.getData()) {
            this.instance.setData(this.value);
        }
    },
    mounted: function mounted() {
        var _this = this;
        if (typeof CKEDITOR === 'undefined') {
            var errorMessage = 'CKEDITOR is missing (http://ckeditor.com/)'
            console.log(errorMessage);
            throw errorMessage;
        } else {
            if (CKEDITOR.instances[this.id]) {
                delete CKEDITOR.instances[this.id];
            }
            if (this.types === 'inline') {
                CKEDITOR.inline(this.id, this.config);
            } else {
                CKEDITOR.replace(this.id, this.config);
            }
            this.instance.on('change', function () {
                var html = _this.instance.getData();
                if (html !== _this.value) {
                    _this.$emit('input', html);
                }
            });
        }
    },
    destroyed: function beforeDestroy() {
        var id = this.id;
        if (CKEDITOR.instances[id]) {
            delete CKEDITOR.instances[id];
        }
    }
};