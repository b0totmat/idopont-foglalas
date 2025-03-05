import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import AppointmentService from '@/services/AppointmentService'

export const useAppointmentStore = defineStore('appointment', () => {
  const appointments = ref([])

  async function getAppointments() {
    try {
      appointments.value = (await AppointmentService.index()).data
    } catch(e) {
      console.log(e)
    }
  }

  async function saveNewAppointment(appointment) {
    try {
      await AppointmentService.insert(appointment)
    } catch(e) {
      console.log(e)
    }
  }

  return { appointments, getAppointments, saveNewAppointment }
})
