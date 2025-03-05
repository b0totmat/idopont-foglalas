<script setup>
import { ref, onMounted } from 'vue'
import { useAppointmentStore } from '@/stores/appointments.js'

const appointmentStore = useAppointmentStore()

onMounted(async () => {
  await appointmentStore.getAppointments()
})

</script>

<template>
  <h2>Már lefoglalt időpontok:</h2>
  <span class="fst-italic ms-2">Ezeket az időpontokat már nem foglalhatja le.</span>
  <ul class="list-group mt-3">
    <li class="list-group-item" v-for="a in appointmentStore.appointments" :key="a.id">{{ a.date }}/{{ a.time }}</li>
  </ul>
</template>
<style scoped>
  .list-group-item:nth-child(even) { background-color: #eee }
</style>