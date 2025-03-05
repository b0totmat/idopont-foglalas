<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="container">
    <header class="mb-3">
      <Navbar />
    </header>
    <RouterView />
  </div>
</template>