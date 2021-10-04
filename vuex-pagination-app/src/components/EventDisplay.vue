<template>
	<div>
        <DataTable :value="events" :paginator="true" :rows="10"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[1,2,3]" responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
            <Column field="id" header="id"></Column>
            <Column field="title" header="title"></Column>
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
export default {
    props:['events']
}
</script>