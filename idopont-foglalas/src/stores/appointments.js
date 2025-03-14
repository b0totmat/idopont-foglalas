import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

import AppointmentService from '@/services/AppointmentService'

const toast = useToast()

export const useAppointmentStore = defineStore('appointment', () => {
  const appointments = ref([])
  const errors = ref([])

  async function getAppointments() {
    try {
      appointments.value = (await AppointmentService.index()).data
    } catch(e) {
      console.log(e)
    }
  }

  async function saveNewAppointment(appointment) {
    errors.value = []
    let isValid = true
  
    if(appointment.mobile === '') {
      errors.value.push('A telefonszám mező kitöltése kötelező!')
      isValid = false
    }
    if(appointment.name === '') {
      errors.value.push('A név mező kitöltése kötelező!')
      isValid = false
    }
    if(appointment.date === '') {
      errors.value.push('Adjon meg érvényes dátumot!')
      isValid = false
    }
    if(appointment.time === '') {
      errors.value.push('Adjon meg időpontot!')
      isValid = false
    }
  
    if(errors.value.length === 0 && isValid) {
      toast.info('Sikeresen lefoglalta az időpontot!', {
        position: "top-right",
        timeout: 2970,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: false,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false
      })
  
      try {
      await AppointmentService.insert(appointment)
    } catch(e) {
      console.log(e)
    }
    } else {
      for(const e of errors.value) {
        toast.error(e, {
          position: "top-right",
          timeout: 2970,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: false,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
          rtl: false
        })
      }
    }
  }

  return { appointments, getAppointments, saveNewAppointment, errors }
})
