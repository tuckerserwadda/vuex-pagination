import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import PrimeVue from 'primevue/config';
import Paginator from 'primevue/paginator';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import "primevue/resources/themes/saga-blue/theme.css" 
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css" 
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup'; 

createApp(App)
.use(store)
.use(router)
.use(PrimeVue)
.component('Paginator', Paginator)
.component('Button', Button)
.component('DataTable', DataTable)
.component('Column', Column)
.component('ColumnGroup', ColumnGroup)
.mount("#app");
