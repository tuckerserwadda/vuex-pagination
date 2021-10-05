<template>
<div><h2>The Good time events </h2></div>
	<div>
        <DataTable :value="events" :paginator="true" :rows="10" ref="dt"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[1,2,3]" responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
            dataKey="id" v-model:filters="eventFilters" filterDisplay="menu" :loading="loading1"
                :globalFilterFields="['title','category','organizer','description']">
                <!-- add the global filter -->
                <template #header>
                    <!-- add an export button -->
                    <div style="text-align: left">
                    <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" />
                </div>
                <!-- add a clear button.. to clear the input text -->
                    <div class="p-d-flex p-jc-between">
                        <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined" @click="clearEventFilters()"/>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="eventFilters['global'].value" placeholder="Keyword Search" />
                        </span>
                    </div>
                    <!-- template to display if no event contains  -->
                </template>
                            <template #empty>
                    No customers found.
                </template>
                <template #loading>
                    Loading customers data. Please wait.
                </template>
            <Column field="title" header="Title" :sortable="true"></Column>
            <Column field="category" header="Category" :sortable="true"></Column>
            <Column field="description" header="description" :sortable="true"></Column>
            <Column field="date" header="Date" :sortable="true"></Column>
            <Column field="time" header="Time" :sortable="true"></Column>
            <Column field="organizer" header="Organizer" :sortable="true"></Column>
            <template #paginatorLeft>
                <Button type="button" icon="pi pi-refresh" class="p-button-text" />
            </template>
            <template #paginatorRight>
                <Button type="button" icon="pi pi-cloud" class="p-button-text" />
            </template>
        </DataTable>    
	</div>
</template>
<script>
import {FilterMatchMode} from 'primevue/api';
export default {
    name:"EventDisplay",
    props:['events'],
      data(){
    return{
       eventFilters: null,
       loading1: true,
    }
  },
  created(){
  this.initEventFilters();
},
mounted(){
  this.loading1 = false;

},
methods: {
    clearEventFilters() {
            this.initEventFilters();
        },
        initEventFilters() {
            this.eventFilters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS}
            }
        } ,
        // export data
        exportCSV() {
            this.$refs.dt.exportCSV();
        } 
},
}
</script>