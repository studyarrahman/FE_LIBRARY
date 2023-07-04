<template>
    <div class="searchBar">
        <!-- Filter Search -->
        <div class="input-group mb-5">
            <input type="search" class="form-control" v-model='searchQuery' placeholder="search here..."
                aria-label="search here..." aria-describedby="button-addon2">
        </div>
    </div>
    
    <table id="tableComponent" class="table table-striped table-hover">

        <thead>
            <tr>
                <th>#</th>
                <!-- loop through each value of the fields to get the table header -->
                <th v-for="field in fields" :key='field'>
                    {{ field.label }}
                    <!-- <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i> -->
                </th>
                <th class="text-center">Action</th>
            </tr>
        </thead>
        <tbody>
            <!-- if paginatedDataRows is empty return a message -->
            <tr v-if="paginatedDataRows.length === 0">
                <!-- colspan based on fields length -->
                <td :colspan="fields.length" class="text-center">No Data Found</td>
            </tr>
            <!-- Loop through the list get the each student data -->
            <tr v-for="(item, index) in paginatedDataRows" :key='item'>
                <td scope="row">{{ index + 1 }}</td>
                <td v-for="field in fields" :key='field'>{{ item[field.key] }}</td>
                <td class="text-center">
                    <!-- Loop through the action buttons -->
                    <button v-for="actionButton in actionButtons" :key='actionButton.label'
                       :class="actionButton.class" class="ms-1" @click="actionButton.onClick(item)">
                       <i :class="actionButton.icon"></i>
                        <span v-if="actionButton.label">{{ actionButton.label }}</span>
                    </button>
                    
                </td>
            </tr>
        </tbody>
    </table>
    <!-- Pagination controls -->
    <div class="text-center">
        <button class="btn btn-link" @click="goToPreviousPage" :disabled="currentPage === 1">Previous</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <span> | Total Data: {{ dataRow.length }}</span>
        <button class="btn btn-link" @click="goToNextPage"
            :disabled="currentPage === totalPages || paginatedDataRows.length === 0">Next</button>
    </div>
</template>
<script>

export default {
    name: 'TableComponent',
    props: {
        dataRow: {
            type: Array,
        },
        fields: {
            type: Array,
        },
        actionButtons: {
            type: Array,
        },
    },
    computed: {
        paginatedDataRows() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            if (this.searchQuery) {
                return this.dataRow.filter((item) => {
                    return Object.keys(item).some((key) => {
                        return String(item[key]).toLowerCase().includes(this.searchQuery.toLowerCase());
                    });
                }).slice(start, end);
            }
            return this.dataRow.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.dataRow.length / this.itemsPerPage);
        },
    },
    data() {
        return {
            currentPage: 1, // the start page
            itemsPerPage: 5, // the number of items per page
            searchQuery: '',
        }
    },
    methods: {
        goToPreviousPage() {
            this.currentPage--;
        },
        goToNextPage() {
            this.currentPage++;
        },
    },

}
</script>
<style scoped>
table th:hover {
    background: #f2f2f2;
}

</style>