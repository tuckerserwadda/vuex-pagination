<template>
<div><h2>The Good time events
     </h2></div>
	<div>
        <div class="card">
            <Toolbar class="p-mb-4">
                <template #left>
                    <!-- add a delete button -->
                    <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedEvents || !selectedEvents.length" />
                    <span style="min-width:12rem"></span>
                    <!-- add a clear and filter input  -->
                        <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined" @click="clearEventFilters()"/>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="eventFilters['global'].value" placeholder="Keyword Search" />
                        </span>
                </template>
                <template #right>
                      <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" />
                        <MultiSelect :modelValue="selectedColumns" :options="columns" optionLabel="header" @update:modelValue="onToggle"
                        placeholder="Select Columns" style="width: 20em"/>
                </template>
            </Toolbar>
        <DataTable :value="events" :paginator="true" :rows="10" ref="dt" v-model:selection="selectedEvents"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[1,2,3]" responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
            dataKey="id" v-model:filters="eventFilters" filterDisplay="menu" :loading="loading1"
                :globalFilterFields="['title','category','organizer','description']">
                            <template #empty>
                    No customers found.
                </template>
                <template #loading>
                    Loading customers data. Please wait.
                </template>
                <!-- add select box -->
                 <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
            <Column field="title" header="Title" :sortable="true"></Column>
            <Column v-for="(col, index) of selectedColumns " :key="index" :field="col.field" :header= "col.header" :sortable="sortable">
             
            </Column>   
            <template #paginatorLeft>
                <Button type="button" icon="pi pi-refresh" class="p-button-text" />
            </template>
            <template #paginatorRight>
                <Button type="button" icon="pi pi-cloud" class="p-button-text" />
            </template>
        </DataTable>
        </div>    
	</div>
    <!-- Add a delete dialog box -->
    <Dialog v-model:visible="deleteEventsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
                <span v-if="selectedEvents">Are you sure you want to delete the selected Events?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteEventsDialog = false"/>
                <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedEvents" />
            </template>
        </Dialog>
</template>
<script>
import {FilterMatchMode} from 'primevue/api';
export default {
    name:"EventDisplay",

      data(){
    return{
       eventFilters: null,
       loading1: true,
       columns:null,
       selectedColumns:null,
       sortable:false,
       selectedEvents:null,
       deleteEventsDialog:false,
    }
  },
  created(){
  this.$store.dispatch("fetchEvents")
  this.initEventFilters();
  this.columns=[
      { field:'category', header:'Category'},
      { field:'description', header:'Description'},
      { field:'date', header:'Date'},
      { field:'time', header:'Time'},
      { field:'organizer', header:'Organizer'}
  ], 
  this.sortable = true
  this.selectedColumns = this.columns;

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
        },
        // column toggle
        onToggle(value) {
            this.selectedColumns = this.columns.filter(col => value.includes(col));
        },
        // comfirm delete

        confirmDeleteSelected() {
            this.deleteEventsDialog = true;
        }, 
        //delete selected events
        deleteSelectedEvents() {
            // this.events = this.events.filter(val => !this.selectedEvents.includes(val));
            this.deleteEventsDialog = false;
            this.selectedEvents = null;
            this.$toast.success('you have successfully deleted the events ');
            // clear toast
            setTimeout(this.$toast.clear,3000)
        },
},
computed:{
    events(){
    return this.$store.state.events
  },

}
}
</script>
<style scoped>
.confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}
@media screen and (max-width: 960px) {
	::v-deep(.p-toolbar) {
		flex-wrap: wrap;
    }
		.p-button {
            margin-bottom: 0.25rem;
        }
	}

</style>