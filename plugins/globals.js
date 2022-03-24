import Vue from 'vue';
import VueMarkdown from 'vue-markdown';
import Element from 'element-ui';
import locale from 'element-ui/lib/locale/lang/ua';

Vue.use(Element, { locale });
Vue.component('vue-markdown', VueMarkdown);
