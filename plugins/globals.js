import Vue from 'vue';
import VueMarkdown from 'vue-markdown';
import Element from 'element-ui';
import locale from 'element-ui/lib/locale/lang/ua';

import DateFilter from '@/common/date.filter';

Vue.use(Element, { locale });
Vue.component('VueMarkdown', VueMarkdown);
Vue.filter('date', DateFilter);
