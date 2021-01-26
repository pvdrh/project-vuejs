<template>
  <AdminLayout>
    <template #main>
      <div class="main-header">Main Header</div>
      <div class="main-content"></div>
    </template>
  </AdminLayout>
</template>

<script>
import AdminLayout from "@/layouts/AdminLayout";

export default {
  name: "Admin",
  components: {
    AdminLayout,
  },
};
</script>

<style scoped lang="scss">
.main-header {
  height: 100px;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>