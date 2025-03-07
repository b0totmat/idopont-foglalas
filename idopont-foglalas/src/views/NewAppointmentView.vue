<template>
  <div class="row">
    <div class="col">
      <form>
        <div class="mb-3 form-floating">
          <input type="email" class="form-control" id="email" placeholder="E-mail cím" v-model="newAppointment.email">
          <label for="email" class="form-label">E-mail cím</label>
        </div>
        <div class="mb-3 form-floating">
          <input type="text" class="form-control" id="name" placeholder="Név" v-model="newAppointment.name">
          <label for="name" class="form-label">Név</label>
        </div>
        <div class="mb-3">
          <input type="date" class="form-control" id="date" v-on:change="getAvailableTimes" v-model="newAppointment.date">
          <select class="form-select mt-3" v-model="newAppointment.time">
            <option v-for="t in availableTimes" :value="t">{{ t }}</option>
          </select>
        </div>
        <button class="btn btn-primary">Foglalás</button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useAppointmentStore } from '@/stores/appointments.js'

const appointmentStore = useAppointmentStore()
const newAppointment = ref({
  email: '',
  name: '',
  date: '',
  time: ''
})
const availableTimes = ref(['8:00:00', '9:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00', '16:00:00'])

onMounted(async () => {
  await appointmentStore.getAppointments()
})

async function getAvailableTimes() {
  availableTimes.value = ['08:00:00', '09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00', '16:00:00']

  for(const a of appointmentStore.appointments) {

    if(a.date === newAppointment.value.date) {
      const timeToRemoveIdx = availableTimes.value.findIndex(t => t === a.time && a.date == newAppointment.value.date)
      
      if(timeToRemoveIdx >= 0)
        availableTimes.value.splice(timeToRemoveIdx, 1)
    }
  }
}
</script>