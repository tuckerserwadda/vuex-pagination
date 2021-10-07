<template>
<div><h2>The Good time events
     </h2></div>
	<div>
        <div class="card">
            <Toolbar class="p-mb-4">
                <template #left>
                    <!-- add a new event button  -->
                    <Button label="New" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" />
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
            <Column v-for="(col, index) of selectedColumns " :key="index" :field="col.field" :header= "col.header" :sortable="sortable"></Column> 
            <!-- add the delete icon  -->
            <Column :exportable="false" style="min-width:8rem">
             <template #body="slotProps">
                 <Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="editEvent(slotProps.data)" />
                <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteEvent(slotProps.data)" />
                 </template>
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
    <!-- Add an add and edit dialog box -->
    <Dialog v-model:visible="eventDialog" :style="{width: '450px'}" header="Event Details" :modal="true" class="p-fluid">
            
            <div class="p-field">
                <label for="title">Title</label>
                <InputText id="title" v-model.trim="event.title" required="true" autofocus :class="{'p-invalid': submitted && !event.title}" />
                <small class="p-error" v-if="submitted && !event.title">Title is required.</small>
            </div>
            <div class="p-field">
                <label for="description">Description</label>
                <Textarea id="description" v-model="event.description" required="true" rows="3" cols="20" />
            </div>

            <div class="p-field">
                <label class="p-mb-3">Category</label>
                <div class="p-formgrid p-grid">
                    <div class="p-field-radiobutton p-col-6">
                        <RadioButton id="category1" name="category" value="food" v-model="event.category" />
                        <label for="category1">food</label>
                    </div>
                    <div class="p-field-radiobutton p-col-6">
                        <RadioButton id="category2" name="category" value="clothing" v-model="event.category" />
                        <label for="category2">Clothing</label>
                    </div>
                    <div class="p-field-radiobutton p-col-6">
                        <RadioButton id="category3" name="category" value="electronics" v-model="event.category" />
                        <label for="category3">Electronics</label>
                    </div>
                </div>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
                <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveEvent" />
            </template>
        </Dialog>



    <!-- Add a delete dialog box for multi selection  -->
    <Dialog v-model:visible="deleteEventsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
                <span v-if="event">Are you sure you want to delete the selected Events?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteEventsDialog = false"/>
                <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedEvents" />
            </template>
        </Dialog>

        <!-- add a delete dialog for a single product -->
         <Dialog v-model:visible="deleteEventDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
                <span v-if="event">Are you sure you want to delete <b>{{event.title}}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteEventDialog = false"/>
                <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteEvent(event)" />
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
       deleteEventDialog:false,
       eventDialog:false,
       submitted:false,
       event:{},
       editedEvent:null
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
        // confirm delete single product
        confirmDeleteEvent(event) {
            this.event = event;
            this.deleteEventDialog = true;
        },
        // delete product
        deleteEvent(event) {
            this.$store.dispatch("deleteEvent",event)
            this.deleteEventDialog = false;
            this.event = {};
            this.$toast.success('you have successfully deleted the events ' + event.title);
               // clear toast
            setTimeout(this.$toast.clear,3000)
        },
        // edit and add product
        hideDialog() {
            this.eventDialog = false;
            this.submitted = false;
        }

        // edit and save event
        ,
        saveEvent() {
            this.submitted = true;
			if (this.event.title.trim()) {
                if (this.event.id) {
                    
                    this.$store.dispatch("editEvent",this.event )
                    this.$toast.success( this.event.title +" was successfully edited ");
                }
                else {
                    this.event.id = this.createId();
                    this.$store.dispatch("addEvent", this.event)
                    this.$toast.success("event sucessfully added");
                }

                this.eventDialog = false;
                this.event = {};
            }
        },
        editEvent(event) {
            this.event = {...event};
            this.eventDialog = true;

        },
        // create new event
        openNew() {
            this.event = {};
            this.submitted = false;
            this.eventDialog = true;
        },
        // create a unique id 
        createId() {
            let id = '';
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for ( var i = 0; i < 5; i++ ) {
                id += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return id;
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