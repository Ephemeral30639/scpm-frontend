<template>
    <!-- Catalog button -->
    <el-tooltip class="item" effect="dark" content="Open your Generation's Catalog" placement="top">
        <el-button type="info" icon="el-icon-document" circle @click="goToCatalog" style="margin-right:10px;"></el-button>
    </el-tooltip>

</template>

<script>
import { defineComponent } from 'vue'
export default  defineComponent({
    data() {
      return {
        catalogLink: "https://muic.mahidol.ac.th/eng/wp-content/downloads/catalog/muic_catalog_2017.pdf"
      };
    },
    methods: {
        //function for catalog button
        goToCatalog(){
            window.open(this.catalogLink);
        },
    },
})
</script>

<style>

</style>