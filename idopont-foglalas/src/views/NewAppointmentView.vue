<template>
  <div class="row">
    <div class="col">
      <form>
        <div class="mb-3 form-floating">
          <input type="email" class="form-control" id="email" placeholder="E-mail cím">
          <label for="email" class="form-label">E-mail cím</label>
        </div>
        <div class="mb-3 form-floating">
          <input type="text" class="form-control" id="name" placeholder="Név">
          <label for="name" class="form-label">Név</label>
        </div>
        <div class="mb-3">
          <input type="date" class="form-control" id="date" v-on:change="getAvailableTimes">
          <select class="form-select mt-3">
            <option selected>Válasszon időpontot!</option>
          </select>
        </div>
        <button class="btn btn-primary">Foglalás</button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useAppointmentStore } from '@/stores/appointments.js'

const appointmentStore = useAppointmentStore()

onMounted(async () => {
  await appointmentStore.getAppointments()
})

async function getAvailableTimes() {
  
}
</script>