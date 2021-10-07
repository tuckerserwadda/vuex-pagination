import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Toaster from '@meforma/vue-toaster';
import PrimeVue from 'primevue/config';
import Paginator from 'primevue/paginator';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import "primevue/resources/themes/saga-blue/theme.css" 
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css" 
import Column from 'primevue/column';
import MultiSelect from 'primevue/multiselect';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Toolbar from 'primevue/toolbar';
import Dialog from 'primevue/dialog';
import RadioButton from 'primevue/radiobutton';
import ColumnGroup from 'primevue/columngroup'; 

createApp(App)
.use(store)
.use(router)
.use(PrimeVue)
.use(Toaster)
.component('Paginator', Paginator)
.component('Button', Button)
.component('DataTable', DataTable)
.component('Column', Column)
.component('ColumnGroup', ColumnGroup)
.component('InputText', InputText)
.component('Textarea', Textarea)
.component('MultiSelect', MultiSelect)
.component('Toolbar', Toolbar)
.component('Dialog', Dialog)
.component('RadioButton', RadioButton)
.mount("#app");
