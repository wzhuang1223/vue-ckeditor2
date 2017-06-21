var vueckeditor = {
    name: 'VueCkeditor',
    props: {
        id: {
            type: String,
            default: function () {
                return 'editor_' + new Date().valueOf() + '_' + Math.floor((1 + Math.random()) * 0x10000).toString(16);
            }
        },
        value: {
            type: String
        },
        types: {
            type: String,
            default: function () {
                return 'classic';
            }
        },
        config: {
            type: Object,
            default: function () { }
        },
        readonly: {
            type: Boolean,
            default: function () {
                return false;
            }
        }
    },
    template:
        '<textarea :id="id" :value="value" :types="types" :config="config" :readonly="readonly"></textarea>',
    data: function () {
        return {
            count: 0
        };
    },
    computed: {
        instance: function () {
            return CKEDITOR.instances[this.id];
        }
    },
    beforeUpdate: function () {
        if (this.value !== this.instance.getData()) {
            this.instance.setData(this.value);
        }
    },
    mounted: function () {
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
            CKFinder.setupCKEditor(CKEDITOR.instances[this.id], './ckfinder/');

            this.instance.on('change', function () {
                var html = _this.instance.getData();
                if (html !== _this.value) {
                    _this.$emit('input', html);
                }
            });
        }
    },
    beforeDestroyed: function () {
        var id = this.id;
        if (CKEDITOR.instances[id]) {
            delete CKEDITOR.instances[id];
        }
    }
};